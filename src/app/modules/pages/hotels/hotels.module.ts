import { RoomCardComponent } from './hotels-details/components/room-card/room-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from '../../shared/shared.module';
import { HotelsHomeComponent } from './hotels-home/hotels-home.component';
import { HotelsRoutingModule } from './hotels-routing.module';
import { HotelsSearchComponent } from './hotels-search/hotels-search.component';
import { HotelsDetailsComponent } from './hotels-details/hotels-details.component';
import { HotelsBookingComponent } from './hotels-booking/hotels-booking.component';
import { HotelsBookingDetailsComponent } from './hotels-booking-details/hotels-booking-details.component';
import { HotelsBookingSuccessComponent } from './hotels-booking-success/hotels-booking-success.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    HotelsHomeComponent,
    HotelsSearchComponent,
    HotelsDetailsComponent,
    HotelsBookingComponent,
    HotelsBookingDetailsComponent,
    RoomCardComponent,
    HotelsBookingSuccessComponent,
  ],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    FormsModule,
    NgxPaginationModule,
  ],
})
export class HotelsModule {}
