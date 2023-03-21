import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Endpoints } from 'sharedConstants';
import { BaseGetService, StorageService } from 'sharedServices';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  httpService: BaseGetService;
  modalError = { isShown: false, text: '', type: 'error' };

  @Input() queries: any;
  directions = [
    { text: 'مكّة المكرمة', value: 1 },
    { text: 'جدّة', value: 2 },
    { text: 'المدينة المنورة', value: 3 },
  ];

  currentDirection?: { text: string; value: number };

  currentCheckIn?: string;
  currentCheckOut?: string;
  currentPromocode: string = '';

  constructor(
    private storage: StorageService,
    private router: Router,
    private datePipe: DatePipe,
    private translate: TranslateService,
    private httpclient: HttpClient
  ) {
    this.httpService = new BaseGetService(httpclient);
  }

  ngOnInit(): void {
    if (this.queries?.city) {
      this.currentDirection = this.directions.filter(
        (d) => d.value == this.queries.city
      )[0];
    }
    this.httpService.get(Endpoints.available_hotels_get);
  }

  goToSearch() {
    if (!this.currentDirection?.text) {
      this.modalError = {
        isShown: true,
        text: this.translate.instant('VALIDATION.FILL_FIRST_DESTINATION'),
        type: 'error',
      };
      return;
    }

    let searchObject: any = {};
    if (this.currentDirection?.value) {
      searchObject['city'] = this.currentDirection?.value;
    }
    if (this.currentPromocode) {
      searchObject['promocode'] = this.currentPromocode;
    }

    if (this.currentCheckIn) {
      searchObject['checkin'] = this.currentCheckIn;
    }

    if (this.currentCheckOut) {
      searchObject['checkout'] = this.currentCheckOut;
    }

    this.router.navigate(['/pages/hotels/search'], {
      queryParams: searchObject,
    });
  }

  addLocation(item: any) {
    this.currentDirection = item;
  }
  addDate(dates: { checkIn: string; checkOut: string }) {
    this.currentCheckIn = this.datePipe.transform(dates.checkIn, 'yyyy-MM-dd')!;
    this.currentCheckOut = this.datePipe.transform(
      dates.checkOut,
      'yyyy-MM-dd'
    )!;
  }

  goToDetails(hotel: any) {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const date_from = this.datePipe.transform(now, 'yyyy-MM-dd');
    const date_to = this.datePipe.transform(tomorrow, 'yyyy-MM-dd');
    this.router.navigateByUrl(
      '/pages/hotels/details/' +
        hotel.Slug +
        '?date_from=' +
        date_from +
        '&date_to=' +
        date_to
    );
  }

  closeErrorModal() {
    this.modalError.isShown = false;
  }

  onCouponChange(event: any) {
    this.currentPromocode = event;
  }

  ngOnDestroy(): void {
    this.httpService.destroy();
  }
}
