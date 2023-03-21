import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancellation-policy',
  templateUrl: './cancellation-policy.component.html',
  styleUrls: ['./cancellation-policy.component.scss']
})
export class CancellationPolicyComponent implements OnInit {
  @Input() cancellationPolicy : any;
  @Input() price : any;
  constructor() { }

  ngOnInit(): void {
  }

  calculateChargeAmount(type: string, totalAmount:any, chargeValue: any){
    if(type.toLowerCase() == 'percentage' && totalAmount == 0){
      return ((chargeValue * this.price) / 100).toFixed(2);
    } else {
      return totalAmount.toFixed(2);
    }
  }

}
