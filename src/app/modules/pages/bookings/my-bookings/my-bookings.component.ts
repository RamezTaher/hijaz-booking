import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Endpoints } from 'sharedConstants';
import { HttpClient } from '@angular/common/http';
import {BaseGetService} from 'sharedServices';
@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit, OnDestroy {
  isAllSelected = false;
  public bookingService: BaseGetService;
  currentPage = 1;
  isMobileFilterOpen = false;
  constructor(httpClient: HttpClient, private router: Router) {
    this.bookingService = new BaseGetService(httpClient);
  }

  ngOnInit(): void {
    this.bookingService.get(Endpoints.reservations_list, {page: 1, take: 10});
  }

  goToDetails(id : string){
      this.router.navigateByUrl('/pages/visa/visa-demand?package=' + id);
  }

  goToPage($event: any){
    this.bookingService.get(Endpoints.reservations_list,  {page: $event, take: 10});
    this.currentPage = $event;
  }


  ngOnDestroy(){
    this.bookingService.destroy();
  }


  onSearchClick(data: any){

  }



}
