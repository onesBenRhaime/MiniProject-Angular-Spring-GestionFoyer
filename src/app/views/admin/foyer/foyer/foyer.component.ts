  import { Component,EventEmitter,Inject,OnInit, Output  } from '@angular/core';

  import Swal from 'sweetalert2'; 
  import pdfMake from 'pdfmake/build/pdfmake';
  import pdfFonts from 'pdfmake/build/vfs_fonts';
  import * as XLSX from 'xlsx';
  import { AfficherFoyerComponent } from '../afficher-foyer/afficher-foyer.component';
  import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
  import { Foyer } from 'src/app/Model/Foyer';
  import { FoyerService } from 'src/app/service/foyer/foyer.service';
  import { Bloc } from 'src/app/Model/Bloc';
import { SharedService } from 'src/app/service/shared.service';


  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  @Component({
    selector: 'app-foyer',
    templateUrl: './foyer.component.html',
    styleUrls: ['./foyer.component.css']
  })
  export class FoyerComponent implements OnInit  {
    //initialiser une liste de type foyer
    foyer: Foyer[] = [];
    //initialiser une liste de type bloc
    bloc:Bloc[]=[]
    searchTable:'';
    searchText = '';
    

    capaciteFoyerSended:number;

    tableSearchText: string = ''; // For table search
    modalSearchText: string = ''; // For modal search

    POSTS: any;

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20]

  @Output() actionCompleted = new EventEmitter<string>();
    constructor(  private sharedService: SharedService, private ServiceFoyer:FoyerService,private dialog:MatDialog) { }

    ngOnInit(): void {
      this.actionCompleted.emit('Liste des foyers  a été  consulté  '); 
      this.sharedService.emitActionCompleted('Liste des foyers a été  consulté  ');
      this.getAllFoyers();

      this.subscribeToActionCompleted();
  localStorage.clear()
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
    ajouter(){
    // Store a value in localStorage
    const valueToStore = 'esmou'; // Replace this with the value you want to store
    localStorage.setItem("chouaib", valueToStore);
    localStorage.setItem("10", valueToStore);
    }
  //pour get liste de foyer
    getAllFoyers(){
      this.ServiceFoyer.getAllFoyers().subscribe((data : Foyer[])=>{
        console.log("all data ",data);
      
        this.foyer = data;
        console.log(this.foyer);

      })
    }

    //pour supprimer une foyer
    deleteFoyer(id): void {
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
          this.ServiceFoyer.deleteFoyer(id).subscribe(() => {
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



    //pour afficher ajouter liste de bloc de foyer en parametre 
    showlistebloc(f:any,capacite:number){
    console.log(f)
    this.bloc=f.blocs  
    console.log(this.bloc)
    this.capaciteFoyerSended = capacite;
    }



    saveDataLocal(universite){
      localStorage.setItem('universite', JSON.stringify(universite));
    }

    postList(): void {
      this.ServiceFoyer.getAllFoyers().subscribe((response) => {
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

    Ajouterpdf() {
      const tableBody = [];
      const headers = ['Nom de foyer', 'Capacite de foyer', 'Nom d\'universite'];
    
      // Push headers as the first row in the table
      tableBody.push(headers);
    
      // Add data rows to the table
      this.foyer.forEach((f) => {
        const row = [
          f.nomFoyer,
          f.capaciteFoyer,
          f.universite ? f.universite.nomUniversite : 'Non affecté',
        ];
        tableBody.push(row);
      });
    
      const documentDefinition = {
        content: [
          {
            table: {
              widths: ['*', '*', '*'], // Define column widths (adjust as needed)
              body: tableBody,
            },
            layout: {
              fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#f3f3f3' : null; // Alternate row background color
              },
              hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1; // Add thicker border to header and footer
              },
              vLineWidth: function (i) {
                return i === 0 ? 2 : 1; // Add thicker border to leftmost column
              },
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? '#000000' : '#bfbfbf'; // Header and footer border color
              },
              vLineColor: function (i) {
                return i === 0 ? '#000000' : '#bfbfbf'; // Leftmost column border color
              },
            },
          },
        ],
      };
    
      const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
      pdfDocGenerator.download('table_data.pdf');
    }
    
    AjouterExcel() {
      const dataForExcel = this.foyer.map((f) => {
        return {
          'Nom de foyer': f.nomFoyer,
          'Capacite de foyer': f.capaciteFoyer,
          'Nom d\'universite': f.universite ? f.universite.nomUniversite : 'Non affecté',
        };
      });
    
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataForExcel);
    
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Foyer_Data');
    
      /* generate XLSX file and trigger a download */
      XLSX.writeFile(wb, 'foyer_data.xlsx');
    }
    openBlocShowForm(foyer: Foyer): void {
      const dialogRef = this.dialog.open(AfficherFoyerComponent, {
        width: '20%',
        height: '25%',       
        data : {
          foyer: foyer
        }
      });
        }

    // openFoyerSHowForm(foyer:Foyer):void {
    //   const dialogRef = this.dialog.open(AfficherFoyerComponent,{
    //     width:'45%',
    //     height:'40%',
    //     data:{
    //       foyer:foyer
    //     }
    //   });

    // }

    
    
  }


