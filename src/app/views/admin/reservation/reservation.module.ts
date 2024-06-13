import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './reservation/reservation.component';
import { FiltrageComponent } from './filtrage/filtrage.component';
import { ShowReservationComponent } from './show-reservation/show-reservation.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TwilioServiceService } from 'src/app/service/twilio-service.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogReservationComponent } from './dialog-reservation/dialog-reservation.component';
import {HighlightReservationDirective} from "./highlight.directive";


@NgModule({
  declarations: [
    ReservationComponent,
    FiltrageComponent,
    ShowReservationComponent,
    DialogReservationComponent,
    HighlightReservationDirective
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  providers: [TwilioServiceService]
})
export class ReservationModule { }
