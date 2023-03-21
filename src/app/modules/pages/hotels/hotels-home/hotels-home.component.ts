import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseGetService, StorageService } from 'sharedServices';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Endpoints } from 'sharedConstants';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-hotels-home',
  templateUrl: './hotels-home.component.html',
  styleUrls: ['./hotels-home.component.scss'],
})
export class HotelsHomeComponent implements OnInit {
  public hotelsService: BaseGetService;
  currentPage = 1;
  constructor(
    private httpClient: HttpClient,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.hotelsService = new BaseGetService(httpClient);
  }

  ngOnInit(): void {
    this.hotelsService.get(Endpoints.hotels_get, {});
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

  goToPage($event: any) {
    this.hotelsService.get(Endpoints.hotels_availabilities_get, {
      page: $event,
    });
    this.currentPage = $event;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.hotelsService.destroy();
  }
}
