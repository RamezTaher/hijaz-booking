import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {

  @Input() type = 'error';
  @Input() isConfirm = false;
  @Input() text = 'فشل إجراء الدفع! الحساب غير موجود أو غير صالح';
  @Output() onClose = new EventEmitter<any>();
  @Output() onSuccess = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  okClick(){
    if(this.type != 'error'){
      this.onSuccess.emit();
    } else {
      this.onClose.emit();
    }
  }

}
