import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cancellation-modal',
  templateUrl: './cancellation-modal.component.html',
  styleUrls: ['./cancellation-modal.component.scss']
})
export class CancellationModalComponent implements OnInit {

  @Input() type = 'warning';
  @Input() isConfirm = false;
  @Input() text = 'فشل إجراء الدفع! الحساب غير موجود أو غير صالح';
  @Input() data : any = {};
  @Output() onClose = new EventEmitter<any>();
  @Output() onSuccess = new EventEmitter<any>();
  cancellationReason = "";
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
