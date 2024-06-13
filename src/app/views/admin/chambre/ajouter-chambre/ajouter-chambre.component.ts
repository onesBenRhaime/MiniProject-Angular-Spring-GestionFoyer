import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Bloc } from 'src/app/Model/Bloc';
import { TypeChambre } from 'src/app/Model/TypeC';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Chambres } from 'src/app/Model/Chambres';
import { ChambreService } from 'src/app/service/chambre/chambre.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ajouter-chambre',
  templateUrl: './ajouter-chambre.component.html',
  styleUrls: ['./ajouter-chambre.component.css']
})
export class AjouterChambreComponent implements OnInit {

  @ViewChild('chambreForm', { static: true }) chambreForm: NgForm; // Reference to the form


  selectedBloc : Bloc=null
  blocs :Bloc[]=[]

  chambre: Chambres = {
    idChambre: 0,
    numeroChambre: 0,
    typeChambre: TypeChambre.SIMPLE, 
    capaciteChambre:0,
    bloc: this.selectedBloc
  };
  numericPattern = '^[0-9]*$';
  InvalideMessage:boolean = false;

  messageNotValide:boolean=false;

  constructor(private chambreService: ChambreService, private router: Router) { }

  ngOnInit(): void {
    // Additional initialization logic if needed
    this.getAllblocs();
  }

  getAllblocs(){
      this.chambreService.getAllBlocs().subscribe((data : Bloc[])=>{
      
        this.blocs = data;
        
        console.log( "salah",this.blocs);
  
  
      })
    
  
  }
  
  
  verifiedChambre(): boolean {
    const numeroChambreControl = this.chambreForm.controls['numeroChambre'];
    const blocControl = this.chambreForm.controls['bloc_id_bloc'];
  
    const isNumeroChambreValid = numeroChambreControl.valid && (numeroChambreControl.dirty);
    const isBlocValid = blocControl.valid && (blocControl.dirty || blocControl.touched);
  
    return isNumeroChambreValid  && isBlocValid;
  }


  saveChambre() {
    if(this.verifiedChambre()){
   
         this.chambre.bloc=this.selectedBloc;
         if(this.chambre.typeChambre == "SIMPLE"){
          this.chambre.capaciteChambre = 1;
         }else if(this.chambre.typeChambre == "DOUBLE"){
          this.chambre.capaciteChambre = 2;
         }else if(this.chambre.typeChambre == "TRIPLE"){
          this.chambre.capaciteChambre = 3;
         }
         this.selectedBloc.capaciteBloc += this.chambre.capaciteChambre;
    this.chambreService.createChambres(this.chambre).subscribe(
          () => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Chambre ajouter avec succées',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['admin/chambre']);
          },
          (error: HttpErrorResponse) => {
            console.error('Error adding foyer:', error);
          }
        );
      
      }
      this.messageNotValide=true;
      console.log("not valide data")
  }

    }
  

 

