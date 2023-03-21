import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Endpoints } from 'sharedConstants';
import { HttpClient } from '@angular/common/http';
import {
  BaseGetService,
  BasePostPatchDeleteService,
  StorageService,
} from 'sharedServices';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hotels-details',
  templateUrl: './hotels-details.component.html',
  styleUrls: ['./hotels-details.component.scss'],
})
export class HotelsDetailsComponent implements OnInit, OnDestroy {
  isCarouselOpen: boolean = false;
  detailsObject: any = {};
  roomGroups: any = [];
  currentCheckIn?: string = '';
  currentCheckOut?: string = '';
  currentDirection?: { text: string; value: number };
  currentPromocode?: string = '';
  subpcc = '';
  couponCode = '';
  totalPrice = 0;
  id: any;
  hotelId: any;
  queries: any;
  roomsInfoList: any;
  hotel: any;
  total = 0;
  rooms: any = [];
  hotel_gps: any;
  public hotelsService: BaseGetService;
  public roomsService: BaseGetService;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    private datePipe: DatePipe,
    private activeRoute: ActivatedRoute,
    private storageService: StorageService,
    public translate: TranslateService
  ) {
    this.hotelsService = new BaseGetService(httpClient);
    this.roomsService = new BaseGetService(httpClient);
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.id = params['hotelId'];
      this.hotelsService
        .getNoSubscribe(Endpoints.hotels_details_get_by_slug, {
          slug: params['hotelId'],
        })
        .subscribe((x) => {
          this.hotelId = x.Id;
          this.hotel = x;
          this.hotel_gps = JSON.parse(this.hotel.MapInfo);
          this.roomsService.get(
            Endpoints.hotels_available_rooms_get + x.Id,
            this.getQueriesObject()
          );

          //load rooms pictures
          this.hotelsService
            .getNoSubscribe(Endpoints.hotels_roominfo_get + this.hotelId)
            .subscribe((x) => {
              this.roomsInfoList = x;
            });
        });

      this.activeRoute.queryParams.subscribe((queries) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        this.queries = { ...queries };
        if (!this.queries.date_from) {
          this.queries.date_from = this.datePipe.transform(today, 'yyyy-MM-dd');
        }
        if (!this.queries.date_to) {
          this.queries.date_to = this.datePipe.transform(
            tomorrow,
            'yyyy-MM-dd'
          );
        }
      });
    });

    this.roomsService.state$.subscribe((x) => {
      if (!x.empty) {
        this.rooms = x.data;
      }
    });
  }

  getQueriesObject(): any {
    const queriesObject: any = {};
    const urlQueries = this.activeRoute.snapshot.queryParams;
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

  getRoomPicture(id: any) {
    let room = this.roomsInfoList.filter((a: any) => a.Id === id);
    if (room.length > 0) {
      if (room[0].ImageUrl !== null) {
        return room[0].ImageUrl;
      } else {
        if (this.hotel?.Pictures?.length > 0) {
          return this.hotel?.Pictures[0]?.secure_url;
        }
      }
    }
  }

  onCouponChange(event: any) {
    this.currentPromocode = event;
  }

  addDate(dates: { checkIn: string; checkOut: string }) {
    this.currentCheckIn = this.datePipe.transform(dates.checkIn, 'yyyy-MM-dd')!;
    this.currentCheckOut = this.datePipe.transform(
      dates.checkOut,
      'yyyy-MM-dd'
    )!;
  }

  toggleCarousel(e: boolean) {
    this.isCarouselOpen = e;
  }

  upDateDateCodeInfo() {
    let searchObject: any = {};
    searchObject['city'] = this.queries?.city;
    if (this.currentPromocode) {
      searchObject['promocode'] = this.currentPromocode;
    }

    if (this.currentCheckIn) {
      searchObject['checkin'] = this.currentCheckIn;
    }

    if (this.currentCheckOut) {
      searchObject['checkout'] = this.currentCheckOut;
    }

    this.router.navigate(['/pages/hotels/details', this.id], {
      queryParams: searchObject,
    });

    const params = {
      'data.checkIn': this.datePipe.transform(
        searchObject.checkin,
        'yyyy-MM-dd'
      ),
      'data.checkOut': this.datePipe.transform(
        searchObject.checkout,
        'yyyy-MM-dd'
      ),
    };

    this.roomsService.get(
      Endpoints.hotels_available_rooms_get,
      searchObject,
      this.hotelId
    );
  }

  selectRoom(indexGroup: number, i: number) {
    if (this.detailsObject.provider.toLowerCase() == 'agoda') {
      let cond = false;
      this.roomGroups.every((element: any, index: number) => {
        element.roomChoice.every((choice: any) => {
          if (choice.selected && index != indexGroup) {
            cond = true;
            return false;
          }
          return true;
        });
        if (cond) {
          return false;
        }
        return true;
      });
      if (!cond) {
        this.roomGroups[indexGroup].roomChoice[i].selected =
          !this.roomGroups[indexGroup].roomChoice[i].selected;
      }
    } else {
      this.roomGroups[indexGroup].roomChoice[i].selected =
        !this.roomGroups[indexGroup].roomChoice[i].selected;
    }
  }

  getTotalPrice() {
    let somme = 0;
    let roomGroupsPrice = [...this.roomGroups];

    roomGroupsPrice.forEach((x: any) => {
      x.roomChoice.forEach((d: any, i: any) => {
        if (d.selected) {
          somme = somme + parseFloat(d.price);
        }
      });
    });
    this.totalPrice = somme;
    return somme.toFixed(2);
  }

  searchRooms() {
    this.detailsObject.rooms = this.storageService.searchObject.rooms.map(
      (x: any, index: number) => {
        let paxs = x.childrenAge.map((m: any) => {
          return {
            type: 'CHD',
            age: m,
            quantity: 1,
          };
        });
        paxs.push({
          type: 'ADT',
          quantity: x.capacity,
        });

        return {
          sequence: index,
          paxInfo: paxs,
        };
      }
    );
    this.detailsObject.subpcc = this.storageService.searchObject.subpcc;
  }

  selectRooms() {
    this.total = 0;
    this.rooms.forEach((item: any) => {
      item.Data.forEach((room: any) => {
        if (room.Quantity) {
          this.total = this.total + room.Quantity * room.PriceToPay;
        }
      });
    });
  }

  search(queries: any): void {
    const params = {
      'data.checkIn': queries.date_from,
      'data.checkOut': queries.date_to,
      'data.promoCode': queries.promocode,
    };
    this.roomsService.get(
      Endpoints.hotels_available_rooms_get,
      { ...params },
      this.hotelId
    );
  }

  getChosenRooms() {
    let selectedRooms: any = [];
    this.rooms.forEach((item: any) => {
      item.Data.forEach((room: any) => {
        if (room.Quantity > 0) {
          selectedRooms.push(room);
        }
      });
    });
    return selectedRooms;
  }

  reservation() {
    if (this.total > 0) {
      let rooms = this.getChosenRooms();
      this.storageService.selectedRooms = rooms;
      this.storageService.hotel = this.hotel;
      this.router.navigateByUrl('/pages/hotels/booking');
    }
  }

  goToBooking() {
    this.storageService.roomGroups = this.roomGroups;
  }

  ngOnDestroy() {
    this.hotelsService.destroy();
    this.roomsService.destroy();
  }
}
