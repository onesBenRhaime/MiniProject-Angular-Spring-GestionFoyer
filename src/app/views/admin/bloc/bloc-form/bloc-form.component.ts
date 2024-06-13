import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Bloc } from 'src/app/Model/Bloc';
import { Chambre } from 'src/app/Model/Chambre';
import { Foyer } from 'src/app/Model/Foyer';
import { BlocService } from 'src/app/service/bloc/bloc.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bloc-form',
  templateUrl: './bloc-form.component.html',
  styleUrls: ['./bloc-form.component.css']
})
export class BlocFormComponent implements OnInit {
  @Input() action?: string;
  blocToAdd: Bloc = new class implements Bloc {
    capaciteBloc: number = 0;
    nomBloc: string = "";
    chambres: Chambre[] = [];
  };
  idFoyer: number = 0;
  @Input() bloc?: Bloc;
  dataToSend?: any;
  chambres?: Chambre[];
  foyers?: Foyer[];
  foyer?: Foyer;
  dataToAdd?: any;
  myForm!: FormGroup;

  receivedEvent: boolean = false;

  constructor(private dialogRef: MatDialogRef<BlocFormComponent>, @Inject(MAT_DIALOG_DATA) public data: { action: string, bloc: Bloc }, private blocService: BlocService,private fb: FormBuilder) {
    this.action = data.action;
    this.bloc = data.bloc;
    this.myForm = this.fb.group({
      nomBloc: ['', Validators.required],
      capaciteBloc: [0, [Validators.required,Validators.min(1)]],
    });
  }

  formIsValid(): boolean {
    return (
      this.blocToAdd.nomBloc != ''
    );
  }

  ngOnInit() {
    this.dataToSend = {
      bloc : this.bloc,
      dialogRef : this.dialogRef
    }
    if (this.data.action == "show" && undefined != this.data.bloc.chambres && this.data.bloc.chambres.length > 0) {
      this.chambres = this.data.bloc.chambres;
    }
    if (this.data.action == "add" || this.data.action == "update") {
      this.blocService.getFoyers().subscribe(data => {
        this.foyers = data;
      })
    }
  }

  onUpdate(): void {
    if (this.idFoyer != undefined && this.idFoyer > 0) {
      this.blocService.getFoyerById(this.idFoyer).forEach(val => {
          this.bloc.foyers = val;
          this.dialogRef.close(this.bloc);
        }
      );
    }else if (this.idFoyer == 0){
      this.bloc.foyers = null;
      this.dialogRef.close(this.bloc);
    }
  }

  onCancel(): void {
    console.log(this.bloc);
    this.dialogRef.close();
  }

  onInsert(): void {
    if (this.idFoyer != undefined && this.idFoyer > 0) {
      this.blocService.getFoyerById(this.idFoyer).forEach(val => {
          this.foyer = val;
          this.dataToAdd = {
            bloc: this.blocToAdd,
            foyers: this.foyer
          }
          console.log("dataToAdd from form :", this.dataToAdd);
          this.dialogRef.close(this.dataToAdd);
        }
      );
    }else if (this.idFoyer == 0){
      this.dataToAdd = {
        bloc: this.blocToAdd,
        foyers: this.foyer
      }
      this.dialogRef.close(this.dataToAdd);
    }
  }

  desaffecter(chambre: Chambre, bloc: Bloc) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will affect the bloc!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, desaffecter!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        bloc.chambres?.splice(this.bloc?.chambres?.indexOf(chambre), 1);
        bloc.capaciteBloc -= chambre.capaciteChambre;
        console.log("mezelou ? : ", bloc);
        this.blocService.updateBloc(bloc).subscribe((blocUpdated) => {
          console.log(blocUpdated);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Chambre desaffectée avec succès',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.dialogRef.close();
            this.blocService.refreshPage();
          });
        });
      } else {
        console.log('Desaffectation canceled');
      }
    });
  }

  handleEvent(event:boolean) {
    this.receivedEvent = event;
    if(this.receivedEvent){
      this.dialogRef.close();
      this.blocService.refreshPage();
    }
  }
}
