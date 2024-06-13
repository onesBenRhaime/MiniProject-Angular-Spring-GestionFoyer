import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Chambre } from 'src/app/Model/Chambre';
import { BlocService } from 'src/app/service/bloc/bloc.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-affectation-chambre',
  templateUrl: './affectation-chambre.component.html',
  styleUrls: ['./affectation-chambre.component.css'],
})
export class AffectationChambreComponent implements OnInit  {

  @Input() blocFromParent?: any;
  chambres!: Chambre[];
  selectedChambres!: Chambre[];
  @Output() myEvent = new EventEmitter<boolean>();
  constructor(private blocService:BlocService) {

  }


  ngOnInit() {
    console.log(this.blocFromParent);
    this.blocService.getAllUnassignedChambres().subscribe((chambres) =>{
      this.chambres=chambres;
  });
}

  affecter() {
    // console.log("Chambres a affecter : ",this.selectedChambres);
    let nouvelleCapacite = 0;
    this.myEvent.emit(true);
    if(this.blocFromParent){
      this.selectedChambres.forEach((c)=>{
        nouvelleCapacite += c.capaciteChambre;
      })
      this.blocFromParent.capaciteBloc += nouvelleCapacite;
      this.selectedChambres.forEach((chambre)=> {
        this.blocFromParent.chambres.push(chambre);
      })
      console.log("affectation du front : ",this.blocFromParent.chambres);
      this.blocService.updateBloc(this.blocFromParent).subscribe((updatedBloc) => {
        console.log(updatedBloc);
        this.blocService.refreshPage();
        // Displaying SweetAlert message for bloc addition
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'chambres affected successfully',
          showConfirmButton: false,
          timer: 1500
        });
      })
    }
  }
}
