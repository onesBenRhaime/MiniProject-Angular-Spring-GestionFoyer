import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {

  namePage: string;
  username: string;
  role: string;


  constructor(private router: Router, private route: ActivatedRoute) {
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   this.namePage = this.getLastSegment(this.router.url);
    // });

/*
    this.router.events.subscribe((ev) => {
      let r:any= this.route.snapshot.routeConfig.children;

      if (ev instanceof NavigationEnd) {
        r.forEach(element => {
        //  console.log(element._loadedInjector); 
         if(element._loadedInjector != null){
          this.namePage=element.path;
         }
        });
        console.log(this.namePage)
        r=null
  }
})
  */
  }

  ngOnInit() {

    // Use the router events to detect when the route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Get the current activated route
      let currentRoute = this.route;
      
      // Iterate through the child routes and get their names
      while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
        const childRouteName = currentRoute.snapshot.routeConfig?.path;
        console.log('Child Route Name:', childRouteName);
        this.namePage=childRouteName;
        return;
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationError) {
        console.error(event.error);
      }
    });
    
    // // e.g. { id: 'x8klP0' }
    // this.namePage = this.getLastSegment(this.router.url);
    //     // Retrieve data from sessionStorage
        if(sessionStorage.getItem('username')){
          this.username = sessionStorage.getItem('username');
        }
  }

  // getLastSegment(url: string): string {
  //   const segments = url.split('/').filter(Boolean);
  //   return segments[segments.length - 1];
  // }
}
