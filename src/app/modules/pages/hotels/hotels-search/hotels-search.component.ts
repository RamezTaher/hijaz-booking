import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Endpoints } from 'sharedConstants';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {
  BaseGetService,
  BasePostPatchDeleteService,
  StorageService,
} from 'sharedServices';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hotels-search',
  templateUrl: './hotels-search.component.html',
  styleUrls: ['./hotels-search.component.scss'],
})
export class HotelsSearchComponent implements OnInit, OnDestroy {
  modalError = { isShown: false, text: '', type: 'error' };

  isMobileSearchOpen: boolean = false;
  isMobileSortByOpen: boolean = false;
  isMobileHotelsFiltersOpen: boolean = false;

  hotelService: BaseGetService;
  public searchObject = {};

  currentCheckIn?: string = '';
  currentCheckOut?: string = '';
  currentDirection?: { text: string; value: number };
  currentPromocode?: string = '';

  queries: any;

  couponCode = '';
  checkin = new Date();
  checkout = new Date();
  original_hotels = [];
  filtred_hotels = [];
  search_query = '';
  paxs = 2;
  constructor(
    private router: Router,
    httpClient: HttpClient,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    public storage: StorageService,
    private translate: TranslateService
  ) {
    this.hotelService = new BaseGetService(httpClient);

    this.checkout.setDate(this.checkin.getDate() + 1);
  }

  ngOnInit(): void {
    this.hotelService.get(
      Endpoints.hotels_availabilities_get,
      this.getQueriesObject()
    );
  }

  getQueriesObject(): any {
    const queriesObject: any = {};
    const urlQueries = this.route.snapshot.queryParams;
    if (urlQueries['city']) {
      queriesObject.city = urlQueries['city'];
    }
    if (urlQueries['checkin']) {
      queriesObject.checkin = urlQueries['checkin'];
      this.currentCheckIn = urlQueries['checkin'];
    }
    if (urlQueries['checkout']) {
      queriesObject.checkout = urlQueries['checkout'];
      this.currentCheckOut = urlQueries['checkout'];
    }
    if (urlQueries['promocode']) {
      queriesObject.promocode = urlQueries['promocode'];
      this.currentPromocode = urlQueries['promocode'];
    }

    this.queries = queriesObject;

    return queriesObject;
  }

  search() {
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

    this.hotelService.get(Endpoints.hotels_availabilities_get, searchObject);

    // this.router
    //   .navigateByUrl('/', { skipLocationChange: true })
    //   .then(() =>
    //     this.router.navigateByUrl(
    //       '/pages/hotels/search?city=' +
    //         searchObject.city +
    //         '&promocode=' +
    //         searchObject.promocode +
    //         '&checkin=' +
    //         searchObject.checkin +
    //         '&checkout=' +
    //         searchObject.checkout
    //     )
    //   );
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

  onCouponChange(event: any) {
    this.currentPromocode = event;
  }

  filterByHotelName($event: any) {
    this.filtred_hotels = this.original_hotels.filter(
      (x: any) => x.name.indexOf($event) > -1
    );
  }

  filterByStars($event: number | null) {
    this.filtred_hotels = this.original_hotels.filter(
      (x: any) => x.rating == $event || $event == null
    );
  }

  closeErrorModal() {
    this.modalError.isShown = false;
  }

  ngOnDestroy() {
    this.hotelService.destroy();
  }
}
