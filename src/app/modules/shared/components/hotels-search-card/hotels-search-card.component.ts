import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'sharedServices';

@Component({
  selector: 'app-hotels-search-card',
  templateUrl: './hotels-search-card.component.html',
  styleUrls: ['./hotels-search-card.component.scss'],
})
export class HotelsSearchCardComponent implements OnInit {
  queries: any = {};

  @Input() hotel: any = {};
  @Input() searchObject: any = {};
  @Input() trackToken = '';
  constructor(
    private router: Router,
    private storageService: StorageService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((queries) => {
      this.queries = { ...queries };
    });
  }

  goToDetails() {
    this.storageService.hotel_search_item = this.hotel;
    this.router.navigate(['/pages/hotels/details', this.hotel.Slug], {
      queryParams: { ...this.queries },
    });
  }

  getLowestPrice(rooms: any) {
    var prices = rooms.map((x: any) => {
      return Number(x.PriceToPay);
    });
    return Math.min.apply(Math, prices);
  }
  getNights(rooms: any) {
    return rooms[0]?.NbrNights;
  }
}
