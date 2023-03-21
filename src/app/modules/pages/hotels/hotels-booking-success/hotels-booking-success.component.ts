import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'sharedServices';

@Component({
  selector: 'app-hotels-booking-success',
  templateUrl: './hotels-booking-success.component.html',
  styleUrls: ['./hotels-booking-success.component.scss'],
})
export class HotelsBookingSuccessComponent implements OnInit, OnDestroy {
  prices: any = { base: 0, total_vat: 0, total_price: 0 };

  total_price = 0;
  total_vat = 0;
  total_without_vat = 0;

  url_share_booking = '';
  payment_type = 'transfer';
  payment_verified = true;
  rooms: any = [];
  hotel: any;
  constructor(
    private activeRoute: ActivatedRoute,
    public storageService: StorageService,
    public translate: TranslateService
  ) {
    this.activeRoute.queryParams.subscribe((params) => {
      this.url_share_booking = params['url'] ?? this.url_share_booking;
      this.payment_type = params['payment_type'] ?? this.payment_type;
      this.payment_verified = params['payment_verified']
        ? params['payment_verified'] === 'A'
        : this.payment_verified;
    });
  }

  ngOnInit(): void {
    this.rooms = this.storageService.selectedRooms;
    this.hotel = this.storageService.hotel;

    this.rooms.forEach((room: any) => {
      this.total_price = this.total_price + room.PriceToPay * room.Quantity;
    });
    this.total_vat = this.total_price * 0.15;
    this.total_without_vat = this.total_price - this.total_vat;
  }

  getRoomsNumbers() {
    let number = 0;
    this.rooms.forEach((x: any) => {
      number = number + x.Quantity;
    });
    return number;
  }
  ngOnDestroy() {
    this.storageService.clearReservationData();
  }
}
