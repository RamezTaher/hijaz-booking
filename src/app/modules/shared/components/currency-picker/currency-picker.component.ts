import { Component, OnInit } from '@angular/core';
import { StorageService } from 'sharedServices';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-currency-picker',
  templateUrl: './currency-picker.component.html',
  styleUrls: ['./currency-picker.component.scss'],
})
export class CurrencyPickerComponent implements OnInit {
  isCurrencyPickerOpen: boolean = false;
  isTextDark = false;

  matchedUrls = [
    '/pages/home',
    '/pages/umrah',
    '/auth/login',
    '/auth/register',
    '/auth/forgotpassword',
    '/auth/resetpassword',
  ];
  constructor(public storageService: StorageService, private router: Router) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && this.matchedUrls.includes(val.url)) {
        this.isTextDark = true;
      } else {
        this.isTextDark = false;
      }
    });
  }

  ngOnInit(): void {}

  toggleCurrencyPicker(): void {
    this.isCurrencyPickerOpen = !this.isCurrencyPickerOpen;
  }
  clickOutside(): void {
    this.isCurrencyPickerOpen = false;
  }
  change(currency: string) {
    this.storageService.currency = currency;
    this.isCurrencyPickerOpen = false;
  }
}
