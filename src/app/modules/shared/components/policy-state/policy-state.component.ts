import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-policy-state',
  templateUrl: './policy-state.component.html',
  styleUrls: ['./policy-state.component.scss'],
})
export class PolicyStateComponent implements OnInit {
  type: string = '';
  @Input() isRefundable: boolean = false;
  text=""
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.text=this.getRefundStatus();
  }
  getRefundStatus(){
    if(this.isRefundable===true){
      this.type = 'success';
      return this.translate.instant('BOOKINGS.REFUNDABLE');
    }  else{
      this.type = 'error';
      return this.translate.instant('BOOKINGS.UNREFUNDABLE');
    }
  }
}
