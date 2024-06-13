import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../service/user/auth.service';
import { etudiantService } from 'src/app/service/etudiant/etudiant.service';
import { Etudiant } from 'src/app/Model/Etudiant';
import { UniversiteService } from 'src/app/service/universite/universite.service';
import { Universite } from 'src/app/Model/Universite';
import { PEtudiant } from './PEtudiant';
// N'oubliez pas d'importer ToastrService si nécessaire

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    //universite Selectionner
    selectedUniv: Universite = null;

  etudiantListe : Etudiant[]=[];
  //listeUniversite
  universites : Universite[]= [];


  etudiant: PEtudiant = { 
    idEtudiant:0,
    nomEt:'',
    prenomEt:'',
    cin:0,
    ecole:'',
    dateNaissance:undefined,
    universite:null
  }

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,private etudiantService: etudiantService
    ,private ServiceUniversite:UniversiteService) {}

  ngOnInit(): void {
    this.getAllEtudiants();
    this.getAllUniversites();
  // Initialize selectedUniv with a default value, e.g., the first item in universites
  if (this.universites && this.universites.length > 0) {
    console.log("kkkkkkkkkk",this.selectedUniv)

  }
  }


  ExistedCin(CinString: String): boolean {
    const cinTAB: string[] = this.etudiantListe.map(etudiantL => etudiantL.cin.toString());
  
    for (let i = 0; i < cinTAB.length; i++) {
      if (CinString.toString() === cinTAB[i]) {
        return true;
      }
    }
    return false;
  }

universiteForm = this.builder.group({
  selectedUniv:this.builder.control('',Validators.required)

})

  registerform = this.builder.group({
 
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control('male'),
    role: this.builder.control('user'),
    cin: this.builder.control('', Validators.compose([
      Validators.pattern('[0-9]+'),
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8)
    ])
    )
    });

  proceedregister() {
    if (this.registerform.valid) {
      if(!this.ExistedCin(this.registerform.value.cin)){
        console.log("registeform value : ",this.registerform.value.cin);
        this.etudiant.cin= parseInt(this.registerform.value.cin);
        console.log(this.etudiant.cin);
        console.log(this.registerform.value.cin);
        this.etudiant.ecole = this.selectedUniv.nomUniversite;
        this.etudiant.universite= this.selectedUniv;
        this.etudiant.prenomEt=this.registerform.value.name;
      this.service.RegisterUser(this.registerform.value).subscribe(result => {
         this.etudiantService.createEtudiant(this.etudiant).subscribe(
           () => {
            console.log("etudiant ajouteé avec succées !")
           });

           return;
        this.showAnimatedAlert('Registered successfully. Please contact admin for enable access.');
        this.router.navigate(['login']);
      });
    }else{
      this.showAnimatedAlerterr('cin existe déja !');
    }
    } else {
      this.showAnimatedAlert('Please enter valid data.');
    }

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

  showAnimatedAlert(message: string) {
    const alertDiv = document.createElement('div');
    alertDiv.textContent = message;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px'; // Ajustez la marge droite selon vos besoins
    alertDiv.style.padding = '15px';
    alertDiv.style.backgroundColor = '#d4edda'; // Utilisez une couleur appropriée
    alertDiv.style.color = '#155724'; // Utilisez une couleur appropriée
    alertDiv.style.border = '1px solid #c3e6cb'; // Utilisez une couleur appropriée
    alertDiv.style.borderRadius = '5px';
    alertDiv.style.opacity = '0';
    alertDiv.style.transition = 'opacity 0.5s ease-in-out';

    document.body.appendChild(alertDiv);

    // Affiche l'alerte avec une animation de fondu
    setTimeout(() => {
      alertDiv.style.opacity = '1';
    }, 10);

    // Disparition après 5 secondes
    setTimeout(() => {
      alertDiv.style.opacity = '0';
    }, 5000);

    // Supprime l'élément après la disparition
    setTimeout(() => {
      document.body.removeChild(alertDiv);
    }, 5500);
  }

  showAnimatedAlerterr(message: string) {
    const alertDiv = document.createElement('div');
    alertDiv.textContent = message;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px'; // Ajustez la marge droite selon vos besoins
    alertDiv.style.padding = '15px';
    alertDiv.style.backgroundColor = 'red'; // Utilisez une couleur appropriée
    alertDiv.style.color = 'white'; // Utilisez une couleur appropriée
    alertDiv.style.border = '1px solid #c3e6cb'; // Utilisez une couleur appropriée
    alertDiv.style.borderRadius = '5px';
    alertDiv.style.opacity = '0';
    alertDiv.style.transition = 'opacity 0.5s ease-in-out';

    document.body.appendChild(alertDiv);

    // Affiche l'alerte avec une animation de fondu
    setTimeout(() => {
      alertDiv.style.opacity = '1';
    }, 10);

    // Disparition après 5 secondes
    setTimeout(() => {
      alertDiv.style.opacity = '0';
    }, 5000);

    // Supprime l'élément après la disparition
    setTimeout(() => {
      document.body.removeChild(alertDiv);
    }, 5500);
  }
}