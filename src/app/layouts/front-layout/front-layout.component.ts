import { Component } from '@angular/core';

@Component({
  selector: 'app-front-layout',
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.css']
})
export class FrontLayoutComponent {

  username: string | null = null;
  role:string | null=null;
  constructor() {
    // Retrieve data from sessionStorage
    const storedUsername = sessionStorage.getItem('username');
    const storedRole = sessionStorage.getItem('role');

    if (storedUsername && storedRole) {
      this.username = storedUsername;
      this.role=storedRole;
    }

  }

  deconnecter(){
    sessionStorage.clear();
    window.location.reload();
   }
}
