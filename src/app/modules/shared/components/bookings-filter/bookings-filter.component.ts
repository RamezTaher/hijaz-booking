import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bookings-filter',
  templateUrl: './bookings-filter.component.html',
  styleUrls: ['./bookings-filter.component.scss'],
})
export class BookingsFilterComponent implements OnInit {
  public searchForm: FormGroup;

  @Output() onSearch = new EventEmitter<any>();
  bsConfig = {
    dateInputFormat: 'YYYY-MM-DD',
    showWeekNumbers: false,
    preventChangeToNextMonth: true,
  };
  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      brn: '',
      guest:'',
      date:'',
      status: '0',
    });
  }

  ngOnInit(): void {}


  search(){
    this.onSearch.emit(this.searchForm.value);
  }

}
