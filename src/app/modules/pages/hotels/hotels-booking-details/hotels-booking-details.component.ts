import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Endpoints } from 'sharedConstants';
import {
  BaseGetService,
  BasePostPatchDeleteService,
  StorageService,
} from 'sharedServices';

import { Location } from '@angular/common';

@Component({
  selector: 'app-hotels-booking-details',
  templateUrl: './hotels-booking-details.component.html',
  styleUrls: ['./hotels-booking-details.component.scss'],
})
export class HotelsBookingDetailsComponent implements OnInit {
  payment_method = 'transfer';
  rooms: any = [];
  total_price = 0;
  total_vat = 0;
  total_without_vat = 0;
  submitted = false;

  isVisaSelected: boolean = false;
  isBankSelected: boolean = false;

  bank_form = new FormGroup({
    bank: new FormControl('', Validators.required),
  });
  roomsService: BaseGetService;
  httpsService: BaseGetService;
  bookingService: BasePostPatchDeleteService;
  constructor(
    private router: Router,
    private location: Location,
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {
    this.roomsService = new BaseGetService(httpClient);
    this.httpsService = new BaseGetService(httpClient);
    this.bookingService = new BasePostPatchDeleteService(httpClient);
  }

  ngOnInit(): void {
    console.log(this.storageService.guest);
    this.rooms = this.storageService.selectedRooms;
    if (!this.rooms) {
      this.router.navigateByUrl('/');
    }
    this.rooms.forEach((x: any) => {
      this.total_price = this.total_price + x.PriceToPay * x.Quantity;
    });
    this.total_vat = this.total_price * 0.15;
    this.total_without_vat = this.total_price - this.total_vat;

    this.roomsService.get(
      Endpoints.hotels_details_get + this.rooms[0].HotelId,
      {}
    );

    this.httpsService.get(Endpoints.banks_accounts_get);

    this.bookingService.state$.subscribe((x) => {
      if (x.success) {
        this.router.navigateByUrl(
          '/pages/hotels/hotel-booking-success?url=' +
            encodeURIComponent(x.data?.shareUrlBooking)
        );

        this.storageService.lastBooking = x.data.booking;
      }
    });
  }

  confirmPaiement() {
    this.submitted = true;
    this.bank_form.markAllAsTouched();
    if (this.bank_form.valid) {
      this.book();
    }
  }

  goBack() {
    this.location.back();
  }

  getRoomsNumbers() {
    let number = 0;
    this.rooms.forEach((x: any) => {
      number = number + x.Quantity;
    });
    return number;
  }

  book() {
    let booking = {
      HotelId: this.rooms[0].HotelId,
      Bookings: this.rooms,
      User: this.storageService.guest,
    };
    booking.User.GuestName =
      this.storageService.guest.FirstName +
      ' ' +
      this.storageService.guest.LastName;
    this.bookingService.post(Endpoints.bookings_multi_rooms_post, booking);
  }

  selectVisa() {
    this.isBankSelected = false;
    this.isVisaSelected = true;
  }

  selectBank() {
    this.isVisaSelected = false;
    this.isBankSelected = true;
  }

  ngOnDestroy() {
    this.httpsService.destroy();
    this.bookingService.destroy();
    this.roomsService.destroy();
  }
}
