import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AjouterUniversiteComponent } from '../ajouter-universite/ajouter-universite.component';
import { Foyer } from '../Model/Foyer';
import { Universite } from '../Model/Universite';
import { UniversiteService } from '../service/universite.service';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { SharedService } from 'src/app/service/shared.service';


@Component({
  selector: 'app-universite',
  templateUrl: './universite.component.html',
  styleUrls: ['./universite.component.css']
})
export class UniversiteComponent implements OnInit{
  title = 'Angular Search Using ng2-search-filter';
  searchText="";
    //initialiser une liste de type foyer
    universites: Universite = new Universite();
    universite: Universite[] = [];
    listefoyer:Foyer[]=[];
    //déclaration pagination 
    p:number = 1 ; 
    POSTS: any;
    page: number = 1;
    count: number = 0;
    tableSize: number = 3;
    tableSizes: any = [5, 10, 15, 20];

    @Output() actionCompleted = new EventEmitter<string>();
    constructor(   private sharedService: SharedService,private ServiceUniversite:UniversiteService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.actionCompleted.emit('Liste des universites a été  consulté  '); 
    this.sharedService.emitActionCompleted('Liste des universites a été  consulté  ');
    this.getAllUniversite();
    this.getAllFoyers();
    
  
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
  //Ajout 
  openDialogAjout(): void {
    const dialogRef = this.dialog.open(AjouterUniversiteComponent, {
      width: '50%',
      height: '70%',
      position: {
        left: '30%',
      },

      data : {
        action : 'add'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      ;
      this.ServiceUniversite.adduniversite(result.universiteToAdd).subscribe((addedU) => {
        console.log("Added uni : ",addedU);

        console.log("foyer to update : ",result.foyerToUpdate);
        result.foyerToUpdate.universite = addedU;
        this.ServiceUniversite.updateFoyer(result.foyerToUpdate).subscribe((foyerUpdated) => {

          console.log("last foer updated : ", foyerUpdated);
        
        });
      console.log(`Dialog closed with result:, ${result}`);
      
    });
    
  });
}
  //Pour nom foyer
  hasFoyer(listefoyer: any[], idUniversite: number): boolean {
    return listefoyer.some(listef => listef.universite?.idUniversite === idUniversite);
  }

  //Pour nom foyer
  getFoyerName(listefoyer: any[], idUniversite: number): string {
      const foyer = listefoyer.find(listef => listef.universite?.idUniversite === idUniversite);
      return foyer ? foyer.nomFoyer : '';
    }
  //pour get liste de universite
  getAllUniversite(){
    this.ServiceUniversite.getAllUniversite().subscribe((data : Universite[])=>{
      console.log("all data  ",data);    
      this.universite = data;
      console.log(this.universite);

    })
  }

//delete
deleteUniversite(id:any){
  Swal.fire({
    title: 'Confirmez-vous la suppression?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#5e72e4',
    cancelButtonColor: "#d33",
    confirmButtonText: 'Oui, supprimez-le !',
    cancelButtonText: 'Annuler' 
  }).then((result) => {
  if (result.isConfirmed) {
    this.ServiceUniversite.deleteUniversite(id).subscribe(() => {
      Swal.fire({
        title: 'Supprimé!',
        text: 'Votre opération a été complétée avec succès.',
        icon: 'success'
      }).then(() => {
        window.location.reload();
      });
    });
  }
})
}


  //Pour get all foyers
  getAllFoyers(){
    this.ServiceUniversite.getAllFoyers().subscribe((data : Foyer[])=>{
      this.listefoyer = data;
      console.log("all all foyers  : ",this.listefoyer);
      console.log("ID UNIVERSITTTTTTTT  : ",this.listefoyer[0].universite.idUniversite );
    })

  }
   showlisteuniversite(f:any){
    console.log(f)
    this.universite=f.universtites  
    console.log(this.universite)
    }

    //Update 
    openUniversiteUpdate(universite: Universite): void {
      const dialogRef = this.dialog.open(AjouterUniversiteComponent, {
        width: '50%',
        height: '70%',
        position: {
          left: '30%',
        },
        data: {
          action: 'update',
          universite: universite // Données de l'université à mettre à jour
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Fermeture du dialogue avec le résultat : ${result}`);
        if (result) {
          if (result.universiteToAdd && result.foyerToUpdate) {
            // Mettre à jour l'université
                this.ServiceUniversite.updateUniversite(result.universiteToAdd).subscribe((updatedUniversite) => {
                  result.foyerToUpdate.universite = updatedUniversite;
                  console.log(result.foyerToUpdate.universite);
                  console.log("Fermeture du dialogue avec le résultat :", result);
                  this.ServiceUniversite.updateFoyer(result.foyerToUpdate).subscribe((foyerUpdated) => {
                    console.log("Dernier foyer mis à jour :", foyerUpdated);
                  });
                });
          } 
        
        }
      });
    }
    
    


    //Pagination 
    postList(): void {
      this.ServiceUniversite. getAllUniversite().subscribe((response) => {
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
   
    //Print PDF 
    printSimplePdf() {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: [4, 8]
      });
    
        // Ajouter la date et l'heure en haut du PDF
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  const dateText = `Date: ${currentDate} - Heure: ${currentTime}`;

  doc.setFontSize(10);

  doc.text(dateText, 0.5, 0.5);

      const headers = ['Nom universite', 'Adresse', 'Nom Foyer'];
    
      const data = this.universite.map(universite => {
        const foyer = this.listefoyer.find(f => f.universite?.idUniversite === universite.idUniversite);
        const nomFoyer = foyer ? foyer.nomFoyer : 'Non affectée'; // Get the nomFoyer if available, otherwise set it to 'non assignée'
        return [
          universite.nomUniversite,
          universite.adresse,
          nomFoyer
        ];
      });
    
      (doc as any).autoTable({
        head: [headers],
        body: data
      });
    
      doc.save('Liste des universités.pdf');
    }

    //excel
    exportToExcel(): void {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.universite);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Universite');
      XLSX.writeFile(wb, 'Liste des universités.xlsx');
    }
    
  }






