import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Endpoints } from 'sharedConstants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BasePostPatchDeleteService } from 'sharedServices';
import { StorageService } from 'sharedServices';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  date: Date = new Date();
  isPasswordVisible: boolean = false;
  submitted = false;
  @Output() close = new EventEmitter();
  @Output() openForgot = new EventEmitter();
  user_form = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public httpService: BasePostPatchDeleteService;
  constructor(
    private router: Router,
    private storageService: StorageService,
    private httpClient: HttpClient
  ) {
    this.httpService = new BasePostPatchDeleteService(httpClient);
  }

  ngOnInit(): void {
    this.httpService.state$.subscribe((x) => {

      if (x.success && x.data.success) {
        this.storageService.user = x.data.user;
        this.storageService.token = x.data.token;
        this.close.emit();
      }
    });
  }

  login() {
    this.user_form.markAllAsTouched();
    if (this.user_form.valid) {
      this.submitted = true;
      this.httpService.post(Endpoints.account_login, {
        ...this.user_form.value,
        isB2B: false,
      });
    }
  }

  goTo(url: string) {
    this.router.navigateByUrl(url);
  }

  ngOnDestroy() {
    this.httpService.destroy();
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
