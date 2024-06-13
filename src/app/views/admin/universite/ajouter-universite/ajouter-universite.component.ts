import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Foyer } from '../Model/Foyer';
import { Universite } from '../Model/Universite';
import { UniversiteService } from '../service/universite.service';
import Swal from 'sweetalert2';
import { FoyerService } from 'src/app/service/foyer/foyer.service';

@Component({
  selector: 'app-ajouter-universite',
  templateUrl: './ajouter-universite.component.html',
  styleUrls: ['./ajouter-universite.component.css']
})

export class AjouterUniversiteComponent implements OnInit {

  @Input() action? : string;
  validators : Validators[] = [];
  universiteForm: NgForm;
  Foyers:Foyer[]=[];
  universite:Universite={
    idUniversite:0,
    nomUniversite:'',
    adresse:''
  }
  foyerToU?: Foyer={
    idFoyer:this.idFoyer,
    nomFoyer:'',
    capaciteFoyer:0,
    universite:{
      idUniversite:0,
      nomUniversite:'',
      adresse:'',
  }};

  idFoyer?:number;

  dataToAdd : any;


  constructor(private ServiceUniversite: UniversiteService,private foyerService:FoyerService, private router: Router,public dialogRef: MatDialogRef<AjouterUniversiteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string,universite:Universite }) { 

  }

//   isChecked: boolean = false;

//   toggleCheckbox() {
//     this.isChecked = !this.isChecked;
// alert("monta")
//   }

  ngOnInit(): void {
    this.action = this.data.action;
    if (this.data.universite && this.action === 'update') {
      this.universite = {
        idUniversite: this.data.universite.idUniversite,
        nomUniversite: this.data.universite.nomUniversite || '',
        adresse: this.data.universite.adresse || ''
        
      };
    }

    this.getFoyerNull();
    console.log("edit", this.data);
  }

  //save universite
  saveUniversite(): void {
    if (this.idFoyer == null) {
      this.ServiceUniversite.adduniversite(this.universite).subscribe(data => {
        console.log("ajout avec succès", data);
        this.dialogRef.close(this.universite); 
        this.ServiceUniversite.showToast();
        setTimeout(()=>{
          window.location.reload();   
        },1500)
        });

      } else {
        this.ServiceUniversite.getFoyerByID(this.idFoyer.toString()).subscribe((f) => {
          console.log("foyer to update f: ",f);
          this.foyerToU = f;
          this.dataToAdd = {
            foyerToUpdate : this.foyerToU,
            universiteToAdd : this.universite
          }
          this.dialogRef.close(this.dataToAdd);
          this.ServiceUniversite.showToast();

          setTimeout(()=>{
            window.location.reload();   
          },1500)

        });

      }

    }

getFoyerNull(){
  this.ServiceUniversite.getAllFoyer().subscribe((data:Foyer[]) =>{
    this.Foyers=data;
    console.log("getnull",this.Foyers);
  });

}

//update
onUpdate(): void {
  
  if (this.idFoyer == null) {
    
    } else {

      this.ServiceUniversite.getFoyerByID(this.idFoyer.toString()).subscribe((f) => {
        console.log("foyer to update f: ",f);
        this.foyerToU = f;
        
        console.log("ggg",this.foyerToU)
        this.dataToAdd = 
        {
          foyerToUpdate : this.foyerToU,
          universiteToAdd : this.universite
        }
        Swal.fire({
          
          icon: "success",
          title: "Opération réussie",
          showConfirmButton: false,
          timer: 1500
        });
        this.dialogRef.close(this.dataToAdd);
        
        
      });

    }
}
// bouton annuler 
onAnnulerClick(): void {
  if (this.universiteForm) {
    this.universiteForm.resetForm();
  }
  this.dialogRef.close();
  // window.location.reload();
  this.router.navigate(['admin/universite']);

}


onAnnulerFoyer(){
  // alert(this.universite.idUniversite + '  ' + this.universite.nomUniversite + ' ' + this.universite.adresse)
  this.foyerService.AnnulerFoyer(this.universite).subscribe(data=>{
console.log(data);  
  });
Swal.fire({
    position: "center",
    icon: "success",
    title: "Un foyer a été annulé avec succès!",
    showConfirmButton: false,
    timer: 1500
  });

}

}
