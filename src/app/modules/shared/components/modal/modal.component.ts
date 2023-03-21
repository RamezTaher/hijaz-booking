import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Output() handleCloseEvent = new EventEmitter();
  @Input() type: string = '';
  @Input() text: string = '';
  constructor() {}

  ngOnInit(): void {}
}
