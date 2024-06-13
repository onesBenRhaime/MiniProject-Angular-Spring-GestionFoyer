import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { etudiantService } from '../../../../service/etudiant/etudiant.service';
import { Etudiant } from './../../../../Model/Etudiant';
import { Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog"
import {FormsModule} from "@angular/forms";
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Universite } from "src/app/Model/Universite";
import { UniversiteService } from "../../universite/service/universite.service";
;

@Component({
  selector: 'app-update-etudiant',
  templateUrl: './update-etudiant.component.html',
  styleUrls: ['./update-etudiant.component.css']
})
export class UpdateEtudiantComponent implements OnInit {
  
  selectedUniv: Universite = null;


  etudiant: Etudiant = { 
    idEtudiant:0,
    nomEt:'',
    prenomEt:'',
    cin:0n,
    ecole:'',
    dateNaissance:undefined,
    universite:this.selectedUniv
   };

  //listeUniversite
  universites : Universite[]= [];

  etudiantListe : Etudiant[]=[];

  oldcin:string='';

//pour verifier cin
verifierCin = false;

  constructor(private route: ActivatedRoute, private etudiantService: etudiantService, private router: Router, private ServiceUniversite:UniversiteService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.etudiant.idEtudiant = params['idEtudiant'];
      this.etudiant.nomEt = params['nomEt'];
      this.etudiant.prenomEt = params['prenomEt'];
      this.etudiant.cin = params['cin'];
      this.oldcin=params['cin']
      this.etudiant.ecole = params['ecole'];
      this.etudiant.dateNaissance = params['dateNaissance'];

    });
    this.getAllUniversites();
    this.getAllEtudiants();
}


getAllUniversites(){
  this.ServiceUniversite.getAllUniversite().subscribe((data:Universite[])=>{
this.universites=data;
console.log(this.universites)
  });
}


getAllEtudiants() {
  this.etudiantService.getAllEtudiants().subscribe((data:Etudiant[])=>{
this.etudiantListe=data;
  });
  }


ExistedCin(CinString: BigInt): boolean {
  const cinTAB: string[] = this.etudiantListe.map(etudiantL => etudiantL.cin.toString());

  for (let i = 0; i < cinTAB.length; i++) {
    if (CinString.toString() === cinTAB[i] && !(CinString.toString()==this.oldcin)) {
      return true;
    }
  }
  return false;
}

  ModifierFoyer() {

 if (this.ExistedCin(this.etudiant.cin)) {
      console.log("existe")
      this.verifierCin = true;  
      return;
    } else {
      console.log(JSON.stringify(this.selectedUniv));
      if (JSON.stringify(this.selectedUniv) == '"annuler"') {
        this.etudiant.universite=null;
      }else{
      this.etudiant.universite = this.selectedUniv;
      }
      this.etudiant.ecole = this.selectedUniv.nomUniversite;
    this.etudiantService.ModifierFoyer(this.etudiant).subscribe(
      () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Etudiant modifier avec succées',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['admin/etudiant']);
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding etudiant:', error);
      }
    );
}
}

}