import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-age-picker',
  templateUrl: './age-picker.component.html',
  styleUrls: ['./age-picker.component.scss'],
})
export class AgePickerComponent implements OnInit {
  @Output() selectAge = new EventEmitter<number>();
  isAgeDropOpen: boolean = false;
  @Input() ageSelected: number = 6;
  constructor() {}

  ngOnInit(): void {}
  toggleAgeDrop(): void {
    this.isAgeDropOpen = !this.isAgeDropOpen;
  }
  clickOutside(): void {
    this.isAgeDropOpen = false;
  }
  clickAge(item: number, event: any): void {
    this.ageSelected = item;
    this.selectAge.emit(this.ageSelected);
    this.isAgeDropOpen = false;
    event.stopPropagation();
  }
}
