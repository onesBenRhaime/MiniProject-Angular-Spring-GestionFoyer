import { Component } from '@angular/core';



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {


  username: string | null = null;
  role:string | null=null;
  email:string |null=null;
  gender:string |null=null;

  constructor() {
    // Retrieve data from sessionStorage
    const storedUsername = sessionStorage.getItem('username');
    const storedEmail = sessionStorage.getItem('email');
    const storedGender = sessionStorage.getItem('gender');
    let storedRole="";
    const encodedRole = sessionStorage.getItem('token');
    if (encodedRole) {
      let decodedRole = atob(encodedRole);
    storedRole = decodedRole.toString();
    }

    if (storedUsername && storedEmail && storedRole && storedGender) {
      this.username = storedUsername;
      this.role=storedRole;
      this.email=storedEmail;
      this.gender=storedGender;


    }
  }

}
