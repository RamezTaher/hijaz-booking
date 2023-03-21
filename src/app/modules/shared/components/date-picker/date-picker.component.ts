import { TranslationService } from './../../services/translation/translation.service';
import { StorageService } from 'sharedServices';
import { arLocale } from './../../services/date-picker/arLocale';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @Input() checkin = new Date();
  @Output() dateChange = new EventEmitter<any>();
  bsConfig = {
    dateInputFormat: 'YYYY-MM-DD',
    showWeekNumbers: false,
    preventChangeToNextMonth: true,
  };
  resDate: Date = new Date();
  constructor(
    private localeService: BsLocaleService,
    public storage: StorageService,
    private translationService: TranslationService
  ) {
    defineLocale('ar-tn', arLocale);
    this.storage.searchObject = {
      ...this.storage.searchObject,
      resDate: this.resDate,
    };
  }

  ngOnInit(): void {
    if (this.translationService.getLanguage() === 'ar') {
      this.localeService.use('ar-tn');
    } else {
      this.localeService.use('en');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['checkin'].currentValue){
      this.checkin = changes['checkin'].currentValue;
    }
  }

  onValueChange(data: any) {
    this.dateChange.emit(data);
    this.resDate = data;
    this.storage.searchObject = {
      ...this.storage.searchObject,
      resDate: this.resDate,
    };
  }
}
