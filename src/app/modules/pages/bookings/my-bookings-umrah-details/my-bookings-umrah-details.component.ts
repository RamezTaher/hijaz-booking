import { Endpoints } from 'sharedConstants';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseGetService, BasePostPatchDeleteService } from 'sharedServices';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-bookings-umrah-details',
  templateUrl: './my-bookings-umrah-details.component.html',
  styleUrls: ['./my-bookings-umrah-details.component.scss'],
})
export class MyBookingsUmrahDetailsComponent implements OnInit, OnDestroy {
  bookingNo = '';
  provider = '';
  trackToken = '';
  success = false;
  bookingService: BaseGetService;
  cancelService: BasePostPatchDeleteService;
  confirm_cancelService: BasePostPatchDeleteService;
  result: any = {};
  cancel_reservation: any = {};
  isConfirmModal = true;
  modalError = { isShown: false, text: '', type: 'error' };
  modalCancellationError = { isShown: false, text: '', type: 'error' };
  prices: any = { base: 0, tax: 0, total: 0 };
  flight_form = new FormGroup({
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    arrival_airport_code: new FormControl('', Validators.required),
    arrival_flight_code: new FormControl('', Validators.required),
    arrival_date: new FormControl('', Validators.required),
    arrival_time: new FormControl('', Validators.required),
    departure_airport_code: new FormControl('', Validators.required),
    departure_flight_code: new FormControl('', Validators.required),
    departure_date: new FormControl('', Validators.required),
    departure_time: new FormControl('', Validators.required),
  });
  bsConfig = {
    dateInputFormat: 'YYYY-MM-DD',
    showWeekNumbers: false,
    preventChangeToNextMonth: true,
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private translate: TranslateService,
    private router: Router
  ) {
    this.bookingService = new BaseGetService(httpClient);
    this.cancelService = new BasePostPatchDeleteService(httpClient);
    this.confirm_cancelService = new BasePostPatchDeleteService(httpClient);
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.bookingNo = params['bookingNo'];
      this.provider = params['provider'];
      this.success = params['success'];
    });

    this.bookingService.state$.subscribe((x) => {
      if (!x.empty) {
        this.result = { ...x.data };
        this.trackToken = x.data.context.trackToken;
      }
    });

    this.fetchData();

    this.cancelService.state$.subscribe((x) => {
      if (x.success && !x.empty) {
        if (x.data.status.code == '0') {
          this.cancel_reservation = x.data.content;
          this.modalCancellationError = {
            isShown: true,
            text: this.translate.instant('MESSAGES.CANCEL_BOOKING'),
            type: 'warning',
          };
        } else {
          this.modalError = {
            isShown: true,
            text: x.data.status.message,
            type: 'error',
          };
        }
      } else if (x.error) {
        this.modalError = {
          isShown: true,
          text: this.translate.instant('MESSAGES.OPERATION_FAILED_TRY_AGAIN'),
          type: 'error',
        };
      }
    });

    this.confirm_cancelService.state$.subscribe((x) => {
      if (x.success && !x.empty) {
        this.isConfirmModal = false;
        if (x.data.status.code == '0') {
          this.cancel_reservation = x.data.content;
          this.modalError = {
            isShown: true,
            text: this.translate.instant(
              'MESSAGES.BOOKING_CANCELED_SUCCESSFULLY'
            ),
            type: 'success',
          };

          this.success = false;
          this.fetchData();
        } else {
          this.modalError = {
            isShown: true,
            text: x.data.status.message,
            type: 'error',
          };
        }
      }
    });
  }

  fetchData() {
    this.bookingService.get(Endpoints.hotels_viewreservation, {
      reservationCode: this.bookingNo,
      provider: this.provider,
    });
  }

  getHotelImage() {
    let image = null;
    if (this.result?.response?.hotelDetails?.hotel?.hotelImages) {
      image = JSON.parse(
        this.result?.response?.hotelDetails?.hotel?.hotelImages
      )[0].imageUrl;
    }
    return image;
  }

  getNumberOfDays() {
    let date1 = new Date(this.result.response?.hotelDetails.checkInDate);
    let date2 = new Date(this.result.response?.hotelDetails.checkOutDate);
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);
    return diffInDays;
  }

  ngOnDestroy() {
    this.bookingService.destroy();
    this.confirm_cancelService.destroy();
    this.cancelService.destroy();
  }

  cancel() {
    this.cancelService.post(Endpoints.hotels_cancelreservation, {
      provider: this.provider,
      trackToken: this.trackToken,
      bookingReferenceNo: this.bookingNo,
    });
  }

  confirm_cancel(reason: string) {
    this.closeCancellationErrorModal();
    this.confirm_cancelService.post(
      Endpoints.hotels_confirm_cancelreservation,
      {
        provider: this.provider,
        trackToken: this.cancel_reservation.context.trackToken,
        bookingReferenceNo: this.cancel_reservation.response.bookingReferenceNo,
        bookingPaymentAmount:
          this.cancel_reservation.response.bookingPaymentAmount,
        refundAmount: this.cancel_reservation.response.refundAmount,
        supplierRefundAmount:
          this.cancel_reservation.response.supplierRefundAmount,
        otaRefundAmount: this.cancel_reservation.response.otaRefundAmount,
        referenceCode: this.cancel_reservation.response.referenceCode,
        cancellationReason: reason,
        config: this.cancel_reservation.response.config,
      }
    );
  }

  printVoucher() {
    window.open(this.result.response.reservation.reportURL, '_blank')?.focus();
  }

  closeErrorModal() {
    this.modalError.isShown = false;
    this.isConfirmModal = true;
    this.cancelService.reset();
  }

  closeCancellationErrorModal() {
    this.modalCancellationError.isShown = false;
    this.cancelService.reset();
  }

  copyData(text: string) {
    navigator.clipboard.writeText(text);
    let btnCopy = document.getElementById('copy');
    btnCopy?.classList.add('copied');
    var temp = setInterval(function () {
      btnCopy?.classList.remove('copied');
      clearInterval(temp);
    }, 600);
  }
}
