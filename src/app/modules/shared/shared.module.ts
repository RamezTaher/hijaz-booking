import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ClickAwayDirective } from './directives/click-away/click-away.directive';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { TagComponent } from './components/tag/tag.component';
import { LangPickerComponent } from './components/lang-picker/lang-picker.component';
import { CurrencyPickerComponent } from './components/currency-picker/currency-picker.component';
import { UserPickerComponent } from './components/user-picker/user-picker.component';
import { HotelsSearchCardComponent } from './components/hotels-search-card/hotels-search-card.component';
import { HotelStarsComponent } from './components/hotel-stars/hotel-stars.component';
import { HotelReviewsComponent } from './components/hotel-reviews/hotel-reviews.component';
import { SortByDropComponent } from './components/sort-by-drop/sort-by-drop.component';
import { HotelsFilterComponent } from './components/hotels-filter/hotels-filter.component';
import { PolicyStateComponent } from './components/policy-state/policy-state.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { PhoneInputComponent } from './components/phone-input/phone-input.component';
import { BookingsFilterComponent } from './components/bookings-filter/bookings-filter.component';
import { ReservationStateComponent } from './components/reservation-state/reservation-state.component';
import { ModalComponent } from './components/modal/modal.component';
import { CodeInputModule } from 'angular-code-input';
import { CancellationModalComponent } from './components/cancellation-modal/cancellation-modal.component';
import { CancellationPolicyComponent } from './components/cancellation-policy/cancellation-policy.component';
import { CardLoadingComponent } from './components/card-loading/card-loading.component';
import { CustomSelectSearchComponent } from './components/custom-select-search/custom-select-search.component';
import { HttpErrorMessageComponent } from './components/http-error-message/http-error-message.component';
import { MaskComponent } from './components/mask/mask.component';
import { MessageModalComponent } from './components/message-modal/message-modal.component';
import { AgePickerComponent } from './components/age-picker/age-picker.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
// import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
// import { LoginComponent } from './components/login/login.component';
// import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { DestinationPickerComponent } from './components/destination-picker/destination-picker.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { LoginComponent } from './components/login/login.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';

@NgModule({
  declarations: [
    ClickAwayDirective,
    HeaderComponent,
    FooterComponent,
    DateRangePickerComponent,
    DatePickerComponent,
    SearchInputComponent,
    TagComponent,
    LangPickerComponent,
    CurrencyPickerComponent,
    UserPickerComponent,
    HotelsSearchCardComponent,
    HotelStarsComponent,
    HotelReviewsComponent,
    SortByDropComponent,
    HotelsFilterComponent,
    PolicyStateComponent,
    CustomSelectComponent,
    PhoneInputComponent,
    BookingsFilterComponent,
    ReservationStateComponent,
    ModalComponent,
    HttpErrorMessageComponent,
    MessageModalComponent,
    MaskComponent,
    CardLoadingComponent,
    CancellationPolicyComponent,
    CustomSelectSearchComponent,
    CancellationModalComponent,
    AgePickerComponent,
    PaginatorComponent,
    LoginComponent,
    ResetpasswordComponent,
    ForgotpasswordComponent,
    DestinationPickerComponent,
    HotelCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    RouterModule,
    BsDatepickerModule.forRoot(),
    CodeInputModule,
  ],
  exports: [
    TranslateModule,
    ClickAwayDirective,
    BsDatepickerModule,
    HeaderComponent,
    FooterComponent,
    DateRangePickerComponent,
    DatePickerComponent,
    SearchInputComponent,
    TagComponent,
    LangPickerComponent,
    CurrencyPickerComponent,
    UserPickerComponent,
    HotelsSearchCardComponent,
    HotelStarsComponent,
    HotelReviewsComponent,
    SortByDropComponent,
    HotelsFilterComponent,
    PolicyStateComponent,
    CustomSelectComponent,
    BookingsFilterComponent,
    ReservationStateComponent,
    PhoneInputComponent,
    ModalComponent,
    HttpErrorMessageComponent,
    MessageModalComponent,
    MaskComponent,
    CardLoadingComponent,
    CancellationPolicyComponent,
    CustomSelectSearchComponent,
    CancellationModalComponent,
    AgePickerComponent,
    PaginatorComponent,
    LoginComponent,
    ResetpasswordComponent,
    ForgotpasswordComponent,
    DestinationPickerComponent,
    HotelCardComponent,
  ],
})
export class SharedModule {}
