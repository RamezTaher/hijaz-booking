import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel-stars',
  templateUrl: './hotel-stars.component.html',
  styleUrls: ['./hotel-stars.component.scss'],
})
export class HotelStarsComponent implements OnInit {
  @Input() stars: number = 0;
  constructor() {}

  ngOnInit(): void {}
}
