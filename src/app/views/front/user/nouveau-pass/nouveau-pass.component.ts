import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { etudiantService } from 'src/app/service/etudiant/etudiant.service';
import { AuthService } from 'src/app/service/user/auth.service';

@Component({
  selector: 'app-nouveau-pass',
  templateUrl: './nouveau-pass.component.html',
  styleUrls: ['./nouveau-pass.component.css']
})
export class NouveauPassComponent{



  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router,
    private EtudiantServ : etudiantService 
  ) {
    this.getAllUsers()
  }
  
  
  ListeUsers:any[]=[]

 
  newPassword:String="xx";
  result: any;
  dialogCode:boolean=false ;
  CodeMessage:String;
  OpenNewMotePasse:boolean=false;
  NoExistedMail:boolean=false;

  UserModifier:any={
    id:'',
    email:'',
    name:'',
    gender:'',
    role:'',
    password:''
  }


getAllUsers(){
  this.service.Getall().subscribe((data:any)=>{
    this.ListeUsers=data;
    console.log(this.ListeUsers)
  })
}

  loginform = this.builder.group({
    email: this.builder.control('', Validators.required),
    code:this.builder.control(''),
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
        }, { validator: this.checkPasswords 
  });

  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : { passwordMismatch: true };
}


rechercheParEmail():boolean{
  this.getAllUsers();
  for(let i=0 ; i<this.ListeUsers.length ; i++){
    if(this.ListeUsers[i]['email'] == this.loginform.value.email){
      this.UserModifier.id=this.ListeUsers[i]['id'].toString();
      this.UserModifier.name=this.ListeUsers[i]['name'];
      this.UserModifier.gender=this.ListeUsers[i]['gender']
      this.UserModifier.email=this.ListeUsers[i]['email'].toString();
      this.UserModifier.role=this.ListeUsers[i]['role'].toString();

console.log("monta",this.UserModifier)
      return true; 
    }
}
return false;
}

verifierCode(){
  if(this.loginform.value.code == this.CodeMessage){
this.OpenNewMotePasse=true;
this.dialogCode=false
  }
}

ReinitialiserPass() {    
if(this.rechercheParEmail()){
    this.EtudiantServ.envoyerMailPass(this.loginform.value.email).subscribe(
      (data) => {
        this.newPassword = data;
        console.log("cxxx", data);
      },
      (error) => {
        console.error("Error status:", error.status);
        console.error("Error message:", error.message);
        console.error("Error text:", error.error.text); // Accessing the text property of error.error
        this.CodeMessage = error.error.text; // Storing the text CODE in a variable
        console.log("code",this.CodeMessage);        
        console.log("data",this.UserModifier);
     
        this.dialogCode = true;
        
      }
      
    );
}
else{
  this.NoExistedMail=true;
}
  }



  changerPassword(){
    this.UserModifier.password=this.loginform.value.password;
    this.service.changerPassword(this.UserModifier).subscribe((data:any)=>{
      alert('mot de passe modifié avec succés');
    })
  }


  showAnimatedAlert(message: string) {
    const alertDiv = document.createElement('div');
    alertDiv.textContent = message;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px'; // Ajustez la marge droite selon vos besoins
    alertDiv.style.padding = '15px';
    alertDiv.style.backgroundColor = '#f8d7da';
    alertDiv.style.color = '#721c24';
    alertDiv.style.border = '1px solid #f5c6cb';
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
