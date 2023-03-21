import { Injectable } from '@angular/core';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class StorageService {
  constructor(private storage: LocalStorageService) {}

  @LocalStorage()
  token!: string | null;

  @LocalStorage()
  user!: any;

  @LocalStorage()
  lang!: string;

  @LocalStorage()
  currency!: string;

  @LocalStorage()
  hotel_search_item!: any;

  @LocalStorage()
  hotel_details!: any;

  @LocalStorage()
  hotel_check_availability!: any;

  @LocalStorage()
  roomGroups!: any;

  @LocalStorage()
  prices!: any;

  @LocalStorage()
  booking_user!: any;

  @LocalStorage()
  transportDetails!: any;

  @LocalStorage()
  transportSearch!: any;

  @LocalStorage()
  transportChoices!: any;

  @LocalStorage()
  hotel: any;

  @LocalStorage()
  guest: any;

  @LocalStorage()
  selectedRooms!: any;

  @LocalStorage()
  lastBooking: any;

  @LocalStorage()
  searchObject!: any;

  @LocalStorage()
  packageSteps!: any;

  @LocalStorage()
  groundServiceDetails!: any;

  isLogged(): boolean {
    return this.token !== null && this.token !== undefined && this.token !== '';
  }

  clearReservationData() {
    this.storage.clear('selectedRooms');
    this.storage.clear('guest');
    this.storage.clear('hotel');
  }

  clear() {
    this.storage.clear();
  }
}
