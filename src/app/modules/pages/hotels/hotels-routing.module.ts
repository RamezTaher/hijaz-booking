import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsHomeComponent } from './hotels-home/hotels-home.component';
import { HotelsSearchComponent } from './hotels-search/hotels-search.component';
import { HotelsDetailsComponent } from './hotels-details/hotels-details.component';
import { HotelsBookingComponent } from './hotels-booking/hotels-booking.component';
import { HotelsBookingDetailsComponent } from './hotels-booking-details/hotels-booking-details.component';
import { HotelsBookingSuccessComponent } from './hotels-booking-success/hotels-booking-success.component';

const routes: Routes = [
  {
    path: '',
    component: HotelsHomeComponent,
  },
  {
    path: 'search',
    component: HotelsSearchComponent,
  },
  {
    path: 'details/:hotelId',
    component: HotelsDetailsComponent,
  },
  {
    path: 'booking',
    component: HotelsBookingComponent,
  },
  {
    path: 'hotel-booking-details',
    component: HotelsBookingDetailsComponent,
  },

  {
    path: 'hotel-booking-success',
    component: HotelsBookingSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelsRoutingModule {}
