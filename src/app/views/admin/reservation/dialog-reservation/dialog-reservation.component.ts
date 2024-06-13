import {Component, Inject, Input} from '@angular/core';
import {Etudiant} from "../../../../Model/Etudiant";
import {Reservation} from "../../../../Model/Reservation";
import {Chambre} from "../../../../Model/Chambre";
import {Universite} from "../../../../Model/Universite";
import {Foyer} from "../../../../Model/Foyer";
import {Bloc} from "../../../../Model/Bloc";
import {ActivatedRoute, Router} from "@angular/router";
import {ReservationService} from "../../../../service/reservation/reservation.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-reservation',
  templateUrl: './dialog-reservation.component.html',
  styleUrls: ['./dialog-reservation.component.css']
})
export class DialogReservationComponent {
  @Input() idReservation;
  
  reservation:Reservation={
    idReservation:0,
    anneeUniversitaire:0,
    estValide:false,
    numReservation:"Pas Encore",
    cinEtudiant:0n,
    typeChambre:undefined

  };
  constructor(private route: ActivatedRoute,  private serviceReservation:ReservationService, private router: Router,@Inject(MAT_DIALOG_DATA) public data: { idReservation : Reservation }) {
    this.idReservation = this.data.idReservation;
  }


  ngOnInit(): void {
    console.log(this.idReservation);
      this.getByIdReservation(this.data.idReservation).subscribe((data: Reservation) => {
        this.reservation = data;

      });
  }
  getByIdReservation(id:any) {
    return this.serviceReservation.getByIdReservation(id);
  }

 
}
