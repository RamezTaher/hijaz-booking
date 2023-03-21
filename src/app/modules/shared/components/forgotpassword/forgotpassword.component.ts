import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit {
  @Output() close = new EventEmitter();
  date: Date = new Date();
  user_form = new FormGroup({
    email: new FormControl('', Validators.required),
  });
  constructor() {}

  ngOnInit(): void {}
}
