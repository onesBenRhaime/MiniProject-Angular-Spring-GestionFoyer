import { Component, OnInit } from '@angular/core';
import { Etudiant } from './../../../../Model/Etudiant';
import { etudiantService } from '../../../../service/etudiant/etudiant.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UniversiteService } from '../../universite/service/universite.service';
import { Universite } from 'src/app/Model/Universite';


@Component({
  selector: 'app-ajouter-etudiant',
  templateUrl: './ajouter-etudiant.component.html',
  styleUrls: ['./ajouter-etudiant.component.css']
})
export class AjouterEtudiantComponent implements OnInit {
   
    //universite Selectionner
  selectedUniv: Universite = null;

  etudiant: Etudiant = { 
    idEtudiant:0,
    nomEt:'',
    prenomEt:'',
    cin:0n,
    ecole:'',
    dateNaissance:undefined,
    universite:this.selectedUniv
  }
  //listeUniversite
  universites : Universite[]= [];

  
//pour verifier cin
verifierCin = false;

etudiantListe : Etudiant[]=[];

  constructor(private etudiantService: etudiantService ,  private router: Router ,private ServiceUniversite:UniversiteService) { }

  ngOnInit(): void {
    this.getAllUniversites();
    this.getAllEtudiants();
  }

  saveEtudiant() {
    if (this.ExistedCin(this.etudiant.cin)) {
      console.log("existe")
      this.verifierCin = true;
      
      return;
    } else {
      console.log(this.selectedUniv);
      this.etudiant.universite = this.selectedUniv;
      this.etudiant.ecole = this.selectedUniv.nomUniversite;
      this.etudiantService.createEmployee(this.etudiant).subscribe(
        () => {
          this.router.navigate(['admin/etudiant']);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Etudiant ajouté avec succès',
            showConfirmButton: false,
            timer: 1500
          });
        },
        (error: HttpErrorResponse) => {
          console.error('Error adding etudiant:', error);
        }
      );
    }
  }
  

  ExistedCin(CinString: BigInt): boolean {
    const cinTAB: string[] = this.etudiantListe.map(etudiantL => etudiantL.cin.toString());
  
    for (let i = 0; i < cinTAB.length; i++) {
      if (CinString.toString() === cinTAB[i]) {
        return true;
      }
    }
    return false;
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

  

}
