import { arLocale } from './../../services/date-picker/arLocale';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
} from '@angular/core';
import { defineLocale, enGbLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { StorageService } from '../../services/storage/storage.service';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
})
export class DateRangePickerComponent implements OnInit {
  bsConfig = {
    dateInputFormat: 'YYYY-MM-DD',
    showWeekNumbers: false,
    preventChangeToNextMonth: true,
  };
  initDate: Date = new Date();
  secondDate: Date = new Date();
  rangeDate: Date[];
  @Input() checkin!: Date;
  @Input() checkout!: Date;
  @Output() dateChange = new EventEmitter<any>();
  constructor(
    private localeService: BsLocaleService,
    public storage: StorageService,
    private translationService: TranslationService
  ) {
    defineLocale('ar-tn', arLocale);
    this.initDate.setDate(this.secondDate.getDate() + 1);
    this.secondDate.setDate(this.secondDate.getDate() + 2);
    this.rangeDate = [this.initDate, this.secondDate];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['checkin'].currentValue) {
      this.checkin = changes['checkin'].currentValue;
      this.rangeDate = [this.checkin, this.checkout];
    }

    if (changes['checkout'].currentValue) {
      this.checkout = changes['checkout'].currentValue;
      this.rangeDate = [this.checkin, this.checkout];
    }
  }

  ngOnInit(): void {
    if (this.translationService.getLanguage() === 'ar') {
      this.localeService.use('ar-tn');
    } else {
      this.localeService.use('en');
    }

    if (this.checkin && this.checkout) {
      this.rangeDate = [new Date(this.checkin), new Date(this.checkout)];
    } else {
      this.rangeDate = [this.initDate, this.secondDate];
    }
  }
  onValueChange(data: any) {
    this.rangeDate = data;
    this.dateChange.emit({ checkIn: data[0], checkOut: data[1] });
  }
}
