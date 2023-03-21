import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { MyBookingsUmrahDetailsComponent } from './my-bookings-umrah-details/my-bookings-umrah-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BookingsRoutingModule } from './bookings-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [MyBookingsComponent, MyBookingsUmrahDetailsComponent],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ],
})
export class BookingsModule {}
