import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() data: any = [];
  chatHistory: any = [];

  screenSize: boolean = false;
  showMore: boolean = false;
  @Output() listenerEvntSidebar = new EventEmitter<string>();
  
  constructor() {
    this.updateScreenSize();
  }

  ngOnInit() {

  }
  ngAfterViewInit(){
    console.log(this.screenSize);
    console.log(this.data);
    
  }

  showMoreChtHistory() {
    this.showMore = !this.showMore;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateScreenSize();
  }

  updateScreenSize(): void {
    const width = window.innerWidth;
    if (width < 800) {
      this.screenSize = true;
    }
    else {
      this.screenSize = false;
    }
  }

  @HostListener('document:click', ['$event'])
  closeSidebar(event: Event) {
    const target = event.target as HTMLElement;
    if ( !target.closest('.card')&& target.closest('.sidebar-overlay')   ) {
      this.listenerEvntSidebar.emit();
    }
  }
}