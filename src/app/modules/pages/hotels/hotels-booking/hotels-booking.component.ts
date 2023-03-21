import { Router } from '@angular/router';
import { StorageService, BaseGetService } from 'sharedServices';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Endpoints } from 'sharedConstants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hotels-booking',
  templateUrl: './hotels-booking.component.html',
  styleUrls: ['./hotels-booking.component.scss'],
})
export class HotelsBookingComponent implements OnInit {
  user_form = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.email, Validators.required]),
    phoneNumber: new FormControl('', Validators.required),
    terms: new FormControl('', Validators.required),
    b2BAgentNotes: new FormControl(''),
  });

  rooms: any = [];
  total_price = 0;
  total_vat = 0;
  total_without_vat = 0;

  hotel_details: any = {};
  roomGroups: any = [];
  roomChoices: any = [];
  checkin = new Date();
  checkout = new Date();
  reservationObject: any = {};
  prices: any = { base: 0, tax: 0, total: 0 };
  check_availability: any = {};
  check_availability_groups = {};
  isPayInfoModalOpen = false;
  countries: any = [];
  modalError = { isShown: false, text: '', type: 'error' };

  constructor(
    private router: Router,
    private location: Location,
    public httpsService: BaseGetService,
    private storageService: StorageService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.rooms = this.storageService.selectedRooms;
    console.log(this.rooms);
    if (!this.rooms) {
      this.router.navigateByUrl('/');
    }
    this.rooms.forEach((x: any) => {
      this.total_price = this.total_price + x.PriceToPay * x.Quantity;
    });
    this.total_vat = this.total_price * 0.15;
    this.total_without_vat = this.total_price - this.total_vat;

    this.httpsService.get(
      Endpoints.hotels_details_get + this.rooms[0].HotelId,
      {}
    );
  }

  countryChange(code: any) {
    this.user_form.controls['countryCode'].setValue(code.numericCode);
    this.user_form.controls['country'].setValue(code.alpha2Code);
  }

  goToPaiement() {
    this.user_form.markAllAsTouched();
    if (!this.user_form.valid) {
      this.modalError = {
        isShown: true,
        text: this.translate.instant('VALIDATION.FILL_ALL'),
        type: 'error',
      };
      return;
    } else {
      this.storageService.guest = this.user_form.value;
      this.router.navigateByUrl('/pages/hotels/hotel-booking-details');
    }
  }
  closeErrorModal() {
    this.modalError.isShown = false;
  }

  getRoomsNumbers() {
    let number = 0;
    this.rooms.forEach((x: any) => {
      number = number + x.Quantity;
    });
    return number;
  }
  goBack() {
    this.location.back();
  }
}
