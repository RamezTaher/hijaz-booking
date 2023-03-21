import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { MyBookingsUmrahDetailsComponent } from './my-bookings-umrah-details/my-bookings-umrah-details.component';
const routes: Routes = [
  {
    path: '',
    component: MyBookingsComponent,
  },
  {
    path: 'umrah-details',
    component: MyBookingsUmrahDetailsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingsRoutingModule {}
