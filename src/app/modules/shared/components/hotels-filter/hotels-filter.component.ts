import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hotels-filter',
  templateUrl: './hotels-filter.component.html',
  styleUrls: ['./hotels-filter.component.scss'],
})
export class HotelsFilterComponent implements OnInit {
  @Output() onRateChange = new EventEmitter<number | null>();
  starRateSelected: number | null = 3;
  constructor() {}

  ngOnInit(): void {}
  selectStarRate(rate: number): void {
    if (rate === this.starRateSelected) {
      this.starRateSelected = null;
    } else {
      this.starRateSelected = rate;
    }
    this.onRateChange.emit(this.starRateSelected);
  }
}
