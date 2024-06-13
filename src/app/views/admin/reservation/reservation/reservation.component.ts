import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Reservation } from '../../../../Model/Reservation';
import { ReservationService } from 'src/app/service/reservation/reservation.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialog } from '@angular/material/dialog';
import { TwilioServiceService } from 'src/app/service/twilio-service.service';
import {Bloc} from "../../../../Model/Bloc";
import {BlocFormComponent} from "../../bloc/bloc-form/bloc-form.component";
import Swal from 'sweetalert2';
import {DialogReservationComponent} from "../dialog-reservation/dialog-reservation.component";
import { SharedService } from 'src/app/service/shared.service';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent {
  
  constructor( private twilioService: TwilioServiceService, private serviceReservation:ReservationService,
    private sharedService: SharedService,private dialog:MatDialog ) { 

  
  }

  @ViewChild('pdfContent') pdfContent!: ElementRef;
  
  @Output() actionCompleted = new EventEmitter<string>();
  
  reservations: Reservation[] = [];message: string ="";

  msgSMS : string ="**** Campus Living Spaces **** - Resulat de votre demande de reservation : -----";

  //déclaration pagination
  p:number = 1 ;
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  ////

  ngOnInit(): void {
    this.actionCompleted.emit('Consulatations de la list des  reservations ');
    this.sharedService.emitActionCompleted('Consulatations de la list des  reservations ');
    console.log("Get List of Reservation ");
    this.getAllReservations();
    this.subscribeToActionCompleted();
    this.getLatestActionValue();
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
  
  getLatestActionValue() {
    // const latestAction = this.sharedService.getLatestAction();
    // latestAction.subscribe((actionName: string) => {
    //   console.log('Latest action in the component:', actionName);
    // });
  }
  
  getAllReservations(){
      this.serviceReservation.getAllReservations().subscribe((data : Reservation[])=>{
      this.reservations = data;
      console.log("Object reservation ",this.reservations);
   
      
    })
  }
  delete(id: any): void {
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
        this.serviceReservation.delete(id).subscribe(() => {
          Swal.fire(
            'Supprimé!',
            'Votre fichier a été supprimé.',
            'success'
          ).then(() => {
            window.location.reload();
          });
        });
      }
    });
    this.actionCompleted.emit('une reservation  a été supprimé. ');
  }
  nonValide(id:any){
  if (confirm("Voulez vous vraiment non valider  ce reservation ?")) {
    this.serviceReservation.nonValide(id).subscribe(() => {
      alert('Modifier effectuée avec succés');
      window.location.reload();
      });
  }}

  ouiValide(id:any){
    if (confirm("Voulez vous vraiment  valider  ce reservation ?")) {
      this.serviceReservation.ouiValide(id).subscribe(() => {
        alert('Modifier effectuée avec succés');
        window.location.reload();
        });
  }}

  estValide(id:any):void{
      this.actionCompleted.emit('une  demande de reservation  a été traité. '); 
      this.sharedService.emitActionCompleted('une  demande de reservation  a été traité. ');

      this.serviceReservation.estValide(id).subscribe((data: any) => {
        console.log('Réponse de l\'API :', data);
        this.message= data['message'];
        if (data['estValide']==true){
         this.msgSMS=this.msgSMS+ " Vous êtes affecté à la chambre   " +data['chambre'] + "Vous pouvez consulter votre espace pour plus d'informations.";
        this.envoyerSMS(this.msgSMS);
        }else if(!data['admin']){
          this.envoyerSMS(this.msgSMS + data['message']+ "----- Vous pouvez demander un autre type dans votre espace.");
         }
      });
    
  }
  
  envoyerSMS(msgSMS:any) {
    const numeroDestinataire = '+21621866975'; // Remplacez par le numéro réel

    this.twilioService.sendSMS(numeroDestinataire, msgSMS).subscribe(
      (response) => {
        console.log('SMS envoyé avec succès', response);
      },
      (error) => {
        console.error('Erreur lors de l\'envoi du SMS', error);
      }
    );

  }
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.reservations);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reservations');
    XLSX.writeFile(wb, 'reservations.xlsx');

    // Émettez l'événement via la propriété de sortie
    this.actionCompleted.emit('Exportationn des donnes da la table reservations ');

    // Ou émettez l'événement via le service partagé
    this.sharedService.emitActionCompleted('Exportationn des donnes da la table reservations');
  }

  generatePDF(): void {
    const title = 'Liste des Réservations';
    const content = this.pdfContent.nativeElement;

    html2canvas(content).then(canvas => {
      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.text(title, 10, 10);
      pdf.addImage(imageData, 'PNG', 10, 20, 180, 0);
     // Add horizontal line
     pdf.setLineWidth(0.5);
     pdf.line(10, pdf.internal.pageSize.height - 20, 200, pdf.internal.pageSize.height - 20);

     // Add contact information
     const contactText = ' BY Campus Living Spaces 2023';
     pdf.setFontSize(15);
     pdf.text(contactText, 10, pdf.internal.pageSize.height - 15);
    pdf.save('reservations.pdf');

    // Émettez l'événement via la propriété de sortie
    this.actionCompleted.emit('Generation  de un fichier pdf pour la table reservation ');

    // Ou émettez l'événement via le service partagé
    this.sharedService.emitActionCompleted('Generation  de un fichier pdf pour la table reservation');

    });
  }
  //Pagination
  postList(): void {
    this.serviceReservation.getAllReservations().subscribe((response) => {
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
  
  openReservationShowForm(idReservation: number): void {
    const dialogRef = this.dialog.open(DialogReservationComponent, {
      width: '50%',
      height: '50%',
      data : {
        idReservation : idReservation
      }
    });
  }




}
