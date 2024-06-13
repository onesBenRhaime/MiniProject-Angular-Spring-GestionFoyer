import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { Universite } from 'src/app/Model/Universite';
import { FoyerService } from 'src/app/service/foyer/foyer.service';
import { UniversiteService } from '../../universite/service/universite.service';
import { ChambreService } from 'src/app/service/chambre/chambre.service';
import { etudiantService } from 'src/app/service/etudiant/etudiant.service';
import { Etudiant } from 'src/app/Model/Etudiant';
import { ReservationService } from 'src/app/service/reservation/reservation.service';
import { Reservation } from 'src/app/Model/Reservation';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  functionsList: any[] = [];
  msgSMS :any;
  totalFoyers: number = 0;
  etudiant: any[] = [];
  nbChambre: any[] = [];
  ChambreByType:any[] = [];
  nbUniversite : number=0;
  tableSearchText:string='';
  totalCapacity: number=0;
  totalNumberOfBlocs:number=0;
  nbChambres : number=0;
  nbEtudiant : number=0;
  nbReservations : number=0;
  statistiquesChambres:any[] = [];
  constructor( private sharedService: SharedService , 
               private foyerService: FoyerService,
               private ServiceUniversite:UniversiteService , private serviceReservation:ReservationService,
                private serviceChambre: ChambreService,
                private ServiceEtudiant:etudiantService,
               ) {
   
   }

  ngOnInit(): void {
    this.calculateStatistics();
    this.getNbEtudiantSelonFoyer();
    this.getNbChambreSelonFoyer();
    this.getNbChambreFoyerByType();
    this.getAllUniversite();
    this.getCountChambre();
    this.getAllEtudiants();
    this.getAllReservations();
    this.subscribeToActionCompleted();
    this.getLatestActionValue();
    
this.getStatistiquesChambres();
  
  }

  subscribeToActionCompleted() {
    this.sharedService.actionCompleted$.subscribe(
      (actions: string[]) => {
        console.log('All actions:', actions);
        this.functionsList = actions;
      },
      (error: any) => {
        console.error('Error receiving action completed event:', error);
      },
      () => {
        console.log('Observable completed');
      }
    );
  }
  
  getLatestActionValue() {
    // const latestAction = this.sharedService.getLatestAction();
    // latestAction.subscribe((actionName: string) => {
    //   console.log('Latest action in the component:', actionName);
    //   this.functionsList.push(actionName); 
    // });
  }

  calculateStatistics() {
    // Fetch foyer data from service
    this.foyerService.getAllFoyers().subscribe((foyers) => {
      this.totalFoyers = foyers.length;
  
      // Calculate total capacity for all foyers
  
      foyers.forEach((foyer) => {
        this.totalCapacity += foyer.capaciteFoyer;
      });
         // Calculate total number of blocs for all foyers
    foyers.forEach((foyer) => {
      this.totalNumberOfBlocs += foyer.blocs.length;
    });
    // Assign total number of blocs to a variable
    // (You can use this value in your component or template as needed)
    });
  }
  
  getNbEtudiantSelonFoyer() {
    this.foyerService.getNbEtudiantSelonFoyer().subscribe((data: any) => {
      this.etudiant = data;
      this.renderEtudiantBarChart();
    });
  }

  getNbChambreSelonFoyer() {
    this.foyerService.getNbChambreSelonFoyer().subscribe((data: any) => {
      this.nbChambre = data;
      this.renderChambrePieChart();
    });
  }

  getNbChambreFoyerByType(){
    this.foyerService.getNbChambreFoyerByType().subscribe((data: any) => {
      this.ChambreByType = data;
      console.log(this.ChambreByType)
      
    });
  }

  renderEtudiantBarChart() {
    const ctx = document.getElementById('barChartEtudiant') as HTMLCanvasElement;
    const myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.etudiant.map(data => data[0]),
        datasets: [{
          label: 'Nombre d\'étudiants par foyer',
          data: this.etudiant.map(data => data[1]),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderChambrePieChart() {
    const ctx = document.getElementById('pieChartChambre') as HTMLCanvasElement;
    const myChambrePieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.nbChambre.map(data => data[0]),
        datasets: [{
          label: 'Nombre de chambres par foyer',
          data: this.nbChambre.map(data => data[1]),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(54, 140, 110, 0.5)',
            // Add more colors as needed
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            // Add more colors if needed
          ],
          borderWidth: 1
        }]
      },
      options: {
        // Additional options specific to pie charts if needed
      }
    });
  }

  getAllUniversite(){
    this.ServiceUniversite.getAllUniversite().subscribe((data : Universite[])=>{
      console.log("all data  ",data);    
      this.nbUniversite = data.length;
      console.log(data);

    })
  }
  getCountChambre(){
    this.serviceChambre.getcountChambres().subscribe((nb:number)=>{
    this.nbChambres= nb;
    
    })
  }

  getAllEtudiants(){
    this.ServiceEtudiant.getAllEtudiants().subscribe((data : Etudiant[])=>{   
      this.nbEtudiant = data.length;

    })
  }
  getAllReservations(){
    this.serviceReservation.getAllReservations().subscribe((data : Reservation[])=>{
    this.nbReservations = data.length;
  })
  }
  

 
getStatistiquesChambres() {
  this.serviceChambre.getStatistiquesChambres().subscribe(
    (data: any) => {
      if (typeof data === 'object' && data !== null) {
        // Convert the object properties to an array of { TypeChambre, count }
        this.statistiquesChambres = Object.keys(data).map(TypeChambre => ({ TypeChambre, count: data[TypeChambre] }));
        console.log('Statistiques des chambres:', this.statistiquesChambres);
        this.renderChambrePieChart2();
      } else {
        console.error('Les données des statistiques des chambres ne sont pas dans le format attendu :', data);
      }
    },
    (error) => {
      console.error('Erreur lors de la récupération des statistiques des chambres:', error);
    }
  );
}

renderChambrePieChart2() {
  const ctx = document.getElementById('pieChartChambre2') as HTMLCanvasElement;
  const myChambrePieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: this.statistiquesChambres.map(data => data.TypeChambre),
      datasets: [{
        label: 'Nombre de chambres par type',
        data: this.statistiquesChambres.map(data => data.count),
        backgroundColor: [
          '#3498db',
          '#2ecc71',
          '#e74c3c',
          // Add more colors as needed
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          // Add more colors if needed
        ],
        borderWidth: 1
      }]
    },
    options: {
      // Additional options specific to pie charts if needed
    }
  });
}

}