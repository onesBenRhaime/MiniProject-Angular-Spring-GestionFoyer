import { HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bloc } from 'src/app/Model/Bloc';
import { Chambre } from 'src/app/Model/Chambre';
import { Etudiant } from 'src/app/Model/Etudiant';
import { Foyer } from 'src/app/Model/Foyer';
import { Reservation } from 'src/app/Model/Reservation';
import { Universite } from 'src/app/Model/Universite';
import { ReservationService } from 'src/app/service/reservation/reservation.service';

@Component({
  selector: 'app-show-reservation',
  templateUrl: './show-reservation.component.html',
  styleUrls: ['./show-reservation.component.css']
})
export class ShowReservationComponent {
  @Input() idReservation;
  etudiant: Etudiant = { 
    idEtudiant:.0,
    nomEt:'',
    prenomEt:'',
    cin:0n,
    ecole:'',
    dateNaissance:undefined
  }
  reservation:Reservation={ 
    idReservation:0,
    anneeUniversitaire:0,
    estValide:false,
    numReservation:"Pas Encore",
    cinEtudiant:0n,
    typeChambre:undefined

  };
  chambre: Chambre = { 
    idChambre: 0,
    typeChambre:'',
    numeroChambre:0n,
    capaciteChambre:0,
    blocIdBloc:0n
  }
  universite: Universite = { 
    idUniversite: 0,
    nomUniversite:'',
    adresse:"",
  }
  foyer : Foyer={
    idFoyer:0,
    nomFoyer:"",
    capaciteFoyer:0,
    universite:new Universite()
  }
  bloc:Bloc={
    idBloc:0,
    nomBloc:"",
    capaciteBloc:0
  }
  constructor(private route: ActivatedRoute,  private serviceReservation:ReservationService, private router: Router) { }

 
  ngOnInit(): void {
    console.log(this.idReservation);
    this.route.params.subscribe((params) => {
      const id = params['idReservation'];
      this.reservation.idReservation = id;
      console.log('read from the params: ', id);

      this.getByIdReservation(id).subscribe((data: Reservation) => {
        this.reservation = data;
        // Maintenant, cinEtudiant est disponible ici
        const cinEtudiant = this.reservation.cinEtudiant;
        console.log('read from the params: ', cinEtudiant);

        // Appeler la fonction avec cinEtudiant
        this.getByEtudiantByCin(cinEtudiant);
       this.getInfoByReservation(cinEtudiant);
      });
    });
    const id = this.idReservation;
  }
  getByIdReservation(id:any) {
    return this.serviceReservation.getByIdReservation(id);
  }

  getByEtudiantByCin(cinEtudiant:any){
    this.serviceReservation.getByEtudiantByCin(cinEtudiant).subscribe((data : Etudiant)=>{          
    this.etudiant = data;
    console.log("Object Etudiant ",this.etudiant);
    })
  }

  getInfoByReservation(cinEtudiant:any){
    this.serviceReservation.getInfoByReservation(cinEtudiant).subscribe((data : any)=>{          
    this.foyer = data['foyer'];
    this.bloc=data['bloc'];
    this.chambre=data['chambre'];
    this.universite=data['universite'];
    console.log("Object all info :   getInfoByReservation :  ",data);
  })
  }
}

