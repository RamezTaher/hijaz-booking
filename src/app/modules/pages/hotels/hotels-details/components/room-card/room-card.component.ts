import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent implements OnInit {
  number: number = 0;
  @Input() room: any;
  @Output() onSelectRoom = new EventEmitter<any>();
  @Input() picture: any;

  constructor() {}

  ngOnInit(): void {
    console.log(this.room.Data);
  }

  inc(choice: any) {
    choice.Quantity = parseInt(choice.Quantity) + 1;
    this.onSelectRoom.emit();
  }

  dec(choice: any) {
    if (!choice.Quantity) {
      choice.Quantity = 0;
    } else {
      choice.Quantity = parseInt(choice.Quantity) - 1;
    }
    this.onSelectRoom.emit();
  }

  selectChoice(choice: any) {
    choice.selected = true;
    choice.Quantity = 1;
    this.onSelectRoom.emit();
  }
}
