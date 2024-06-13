
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { TypeChambre } from 'src/app/Model/TypeC';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { ChambreService } from 'src/app/service/chambre/chambre.service';
import { Bloc } from 'src/app/Model/Bloc';
import { Chambres } from 'src/app/Model/Chambres';





@Component({
  selector: 'app-modifier-chambre',
  templateUrl: './modifier-chambre.component.html',
  styleUrls: ['./modifier-chambre.component.css']
})
export class ModifierChambreComponent implements OnInit {
  selectedBloc : Bloc;
  blocs :Bloc[]=[]
  
  chambre: Chambres = {
    idChambre: 0,
    numeroChambre: 0,
    typeChambre: TypeChambre.SIMPLE,
    capaciteChambre:0,
  };
  capaciteAncienne:number=0;
  numericPattern = '^[0-9]*$';
  InvalideMessage:boolean = false;
  constructor(private route: ActivatedRoute,private chambreService: ChambreService,private router: Router) { }

  ngOnInit(): void {
    this.getAllblocs();

    this.route.params.subscribe(params => {
      this.chambre.idChambre = +params['idChambre'];
      this.chambre.numeroChambre = +params['numeroChambre'];
      this.chambre.typeChambre = params['typeChambre'];
      // this.selectedBloc.idBloc =params['idbloc'];
      // this.selectedBloc.nomBloc =params['nomBloc'];
      // this.selectedBloc.idBloc =params['capaciteBloc'];
      if(this.chambre.typeChambre == "SIMPLE"){
        this.capaciteAncienne = 1;
       }else if(this.chambre.typeChambre == "DOUBLE"){
        this.capaciteAncienne = 2;
       }else if(this.chambre.typeChambre == "TRIPLE"){
        this.capaciteAncienne = 3;
       }
      this.chambreService.getBlocByIdChambre(params['idChambre']).subscribe((bloc)=>{
        this.selectedBloc = bloc;
      })
    });
    
    const blocData = localStorage.getItem("blocs");
    if(blocData){
      const blocStorage = JSON.parse(blocData);
      this.selectedBloc=blocStorage;
      console.log("waywa",this.selectedBloc);
    }
  }

  getAllblocs(){
    this.chambreService.getAllBlocs().subscribe((data : Bloc[])=>{
    
      this.blocs = data;
      
      console.log( "salah",this.blocs);


    })
  

}


updateChambre() {
  if(this.chambre.typeChambre == "SIMPLE"){
    this.chambre.capaciteChambre = 1;
   }else if(this.chambre.typeChambre == "DOUBLE"){
    this.chambre.capaciteChambre = 2;
   }else if(this.chambre.typeChambre == "TRIPLE"){
    this.chambre.capaciteChambre = 3;
   }
  console.log(this.chambre);
  
  this.chambreService.getBlocByIdChambre(this.chambre.idChambre).subscribe((bloc)=> {
    this.selectedBloc = bloc;
    this.selectedBloc.capaciteBloc += this.chambre.capaciteChambre;
    this.selectedBloc.capaciteBloc -= this.capaciteAncienne;
    this.chambre.bloc = this.selectedBloc;
    this.chambreService.updateChambres(this.chambre).subscribe(
      (res: any) => {
        localStorage.clear();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Chambre modifiée avec succès',
          showConfirmButton: false,
          timer: 1500,
          iconColor: '#ffd700', // Couleur jaune en code hexadécimal
        });
  
        this.router.navigate(['admin/chambre']);
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de la modification de la chambre:', error);
      }
    );
  })

  
}


returnChambre(){
  this.router.navigate(['admin/chambre']);
}




  /*updateChambre() {
  //  console.log(this.chambre)
 //   this.chambre.bloc=this.selectedBloc;
 //   this.chambreService.updateChambre(this.chambre).subscribe(
   //   (res: Chambre) => {
     //   localStorage.clear();
      //  this.router.navigate(['admin/chambre']);
      //  console.log('etudiant Modifier Avec succées:', res);
        
        // Handle success, update UI, or show a success message to the user
     /* },
      (error) => {
        console.error('Error modifier foyer :', error);
        // Handle error, show an error message to the user
      }
    );
    }*/


  
}
