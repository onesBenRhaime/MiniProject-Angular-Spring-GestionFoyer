import { Component,OnInit ,ViewChild , AfterViewInit, Output, EventEmitter  } from '@angular/core';
import { etudiantService } from '../../../../service/etudiant/etudiant.service';
import { Inject, Input} from '@angular/core';

import { Etudiant } from './../../../../Model/Etudiant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MatDialog } from '@angular/material/dialog';

import { NgxPaginationModule } from 'ngx-pagination'; 

import Swal from 'sweetalert2'; 
import { DetailComponent } from '../detail/detail.component';
import { DetailEtudiantComponent } from '../detail/detail-etudiant/detail-etudiant.component';

import * as XLSX from 'xlsx';
import { SharedService } from 'src/app/service/shared.service';





@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantComponent implements OnInit  {
  title = 'Angular Search Using ng2-search-filter';
  searchText= "";
  etudiant: Etudiant[] = [];


  @Output() actionCompleted = new EventEmitter<string>();

  p:number = 1 ; 

POSTS: any;
page: number = 1;
count: number = 0;
tableSize: number = 4 ;
tableSizes: any = [5, 10, 15, 20];










  constructor( private ServiceEtudiant:etudiantService,private dialog:MatDialog ,  private sharedService: SharedService ) { }


  openBlocShowForm(etudiant:Etudiant): void {
    const dialogRef = this.dialog.open(DetailEtudiantComponent, {
      width: '25%',
      height: '65%',
      data : {
        etudiant: etudiant
      }
    });
    /*dialogRef.afterClosed().subscribe(result => {
      if (result) {
        dialogRef.close();
      }
    })*/
  }




  
  postList(): void {
    this.ServiceEtudiant.getAllEtudiants().subscribe((response) => {
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
   
    

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.etudiant);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reservations');
    XLSX.writeFile(wb, 'reservations.xlsx');
  }

  ngOnInit(): void {
    console.log("all data ");
    this.actionCompleted.emit('Liste des etidoants a été  consulté '); 
    this.sharedService.emitActionCompleted('Liste des etidoants a été  consulté  ');

    this.getAllEtudiants();
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
  printSimplePdf() {
    
    const doc = new jsPDF({

      orientation: 'landscape',
      unit: 'in',
      format: [4, 8]
    }
    
    );

    // En-tête du tableau
    const headers = ['Nom', 'Prénom', 'CIN', 'Ecole', 'Date'];

    // Données des étudiants
    const data = this.etudiant.map(etudiant => [
      etudiant.nomEt,
      etudiant.prenomEt,
      etudiant.cin,
      etudiant.ecole,
      etudiant.dateNaissance
    ]);

    (doc as any).autoTable({

      head: [headers],
      body: data
    });

    doc.save('etudiants.pdf');
  }


//pour get liste de foyer
  getAllEtudiants(){
    this.ServiceEtudiant.getAllEtudiants().subscribe((data : Etudiant[])=>{
      console.log("all data ",data);
    
      this.etudiant = data;
      console.log(this.etudiant);

    })
  }

  //pour supprimer une foyer

  //pour supprimer une foyer
    //pour supprimer une foyer
    deleteEtudiant(id:any): void {
      Swal.fire({
        title: 'Es-tu sûr?',
        text: 'Vous ne pourrez pas revenir en arrière !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimez-le !',
        cancelButtonText: 'Annuler' 
      }).then((result) => {
        if (result.isConfirmed) {
          this.ServiceEtudiant.deleteEtudiants(id).subscribe(() => {
            Swal.fire({
              title: 'Supprimé!',
              text: 'Votre fichier a été supprimé.',
              icon: 'success'
            }).then(() => {
              window.location.reload();
            });
          });
        }
      });
    }
     


        

        
  
  





}
