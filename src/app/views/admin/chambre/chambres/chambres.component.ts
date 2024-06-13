import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError, tap } from 'rxjs';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ViewChambreComponent } from '../view-chambre/view-chambre.component';
import { MatDialog } from '@angular/material/dialog';
import { PaginationService } from 'ngx-pagination';
import { ChambreService } from 'src/app/service/chambre/chambre.service';
import { Chambres } from 'src/app/Model/Chambres';
import { Bloc } from 'src/app/Model/Bloc';
import Chart from 'chart.js/auto';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-chambres',
  templateUrl: './chambres.component.html',
  styleUrls: ['./chambres.component.css'],
})
export class ChambresComponent implements OnInit {
  observables?: Observable<Chambres[]>;
  chambres?: Chambres[];
  chambreForm: FormGroup;
  private apiServer: String = 'http://localhost:8090/TpEtudeDeCas/chambre/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  @Output() actionCompleted = new EventEmitter<string>();
  statistiquesChambres: any[] = [];
  nombreChambres: number = 0;

  title = 'Angular Search Using ng2-search-filter';
  searchText;
  chambre: Chambres[] = [];

  //déclaration pagination
  p: number = 1;
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [5, 10, 15, 20];
  postList(): void {
    this.serviceChambre.getAllChambress().subscribe((response) => {
      this.POSTS = response;
      console.log(this.POSTS);
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.postList();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.postList();
  }

  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private serviceChambre: ChambreService,
    private _http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private paginationService: PaginationService
  ) {
    this.chambreForm = this.fb.group({
      idChambre: [null, Validators.required],
      numeroChambre: [null, Validators.required],
      typeChambre: [null, Validators.required],
      bloc: [null, Validators.required],
      // Add other form controls as needed
    });
  }
  ngOnInit(): void {
    this.actionCompleted.emit('Liste des chambres a été  consulté  ');
    this.sharedService.emitActionCompleted(
      'Liste des chambres a été  consulté  '
    );

    this.getAllUniversite();
    this.getCountChambre();

    this.getStatistiquesChambres();

    this.subscribeToActionCompleted();
  }

  subscribeToActionCompleted() {
    this.sharedService.actionCompleted$.subscribe(
      (actions: string[]) => {
        console.log('All actions:', actions);
      },
      (error: any) => {
        console.error('Error receiving action completed event:', error);
      },
      () => {
        console.log('Observable completed');
      }
    );
  }
  //pour get liste de foyer
  getAllUniversite() {
    this.serviceChambre.getAllChambress().subscribe((data: Chambres[]) => {
      console.log('all data ', data);

      this.chambres = data;

      console.log(this.chambres);
    });
  }
  getCountChambre() {
    this.serviceChambre.getcountChambres().subscribe((nb: number) => {
      this.nombreChambres = nb;
    });
  }

  deleteChambre(idChambre: number) {
    Swal.fire({
      title: 'Es-tu sûr?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le !',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceChambre.deleteChambres(idChambre).subscribe(() => {
          Swal.fire({
            title: 'Supprimé!',
            text: 'Votre fichier a été supprimé.',
            icon: 'success',
          }).then(() => {
            console.log('Chambre deleted successfully.');
            // Optionally, update the local array of chambres to reflect the changes.
            this.chambres = this.chambres.filter(
              (chambre) => chambre.idChambre !== idChambre
            );
            window.location.reload();
          });
        });
      }
    });
  }

  SaveStorage(bloc) {
    localStorage.setItem('blocs', JSON.stringify(bloc));
  }

  openBlocShowForm(id: number): void {
    this.serviceChambre.getBlocByIdChambre(id).subscribe((bloc) => {
      const dialogRef = this.dialog.open(ViewChambreComponent, {
        width: '45%',
        height: '40%',
        data: {
          bloc: bloc,
        },
      });
    });
  }

  getStatistiquesChambres() {
    this.serviceChambre.getStatistiquesChambres().subscribe(
      (data: any) => {
        if (typeof data === 'object' && data !== null) {
          // Convert the object properties to an array of { TypeChambre, count }
          this.statistiquesChambres = Object.keys(data).map((TypeChambre) => ({
            TypeChambre,
            count: data[TypeChambre],
          }));
          console.log('Statistiques des chambres:', this.statistiquesChambres);
          this.renderChambrePieChart();
        } else {
          console.error(
            'Les données des statistiques des chambres ne sont pas dans le format attendu :',
            data
          );
        }
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des statistiques des chambres:',
          error
        );
      }
    );
  }

  renderChambrePieChart() {
    const ctx = document.getElementById('pieChartChambre') as HTMLCanvasElement;
    const myChambrePieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.statistiquesChambres.map((data) => data.TypeChambre),
        datasets: [
          {
            label: 'Nombre de chambres par type',
            data: this.statistiquesChambres.map((data) => data.count),
            backgroundColor: [
              '#3498db',
              '#2ecc71',
              '#e74c3c',
              // Add more colors as needed
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              // Add more colors if needed
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        // Additional options specific to pie charts if needed
      },
    });
  }
}
