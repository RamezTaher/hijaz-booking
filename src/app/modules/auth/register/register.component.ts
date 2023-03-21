import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BasePostPatchDeleteService } from 'sharedServices';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from 'sharedConstants';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoginOpen: boolean = false;
  isForgotOpen: boolean = false;
  isResetOpen: boolean = false;
  date: Date = new Date();
  isPasswordVisible: boolean = false;
  public registerService: BasePostPatchDeleteService;
  user_form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    terms: new FormControl('', Validators.required),
  });
  constructor(
    httpClient: HttpClient,
    private translate: TranslateService,
    private router: Router
  ) {
    this.registerService = new BasePostPatchDeleteService(httpClient);
  }

  ngOnInit(): void {
    this.registerService.state$.subscribe((x) => {
      if (x.success) {
        this.router.navigateByUrl('/pages/hotels');
      } else {
        //  this.register_form.reset();
      }
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  validatePassword() {
    if (
      this.user_form.controls['password'].value !=
      this.user_form.controls['confirmPassword'].value
    ) {
      return false;
    }
    return true;
  }

  register() {
    this.user_form.markAllAsTouched();
    if (this.user_form.valid && this.validatePassword()) {
      this.registerService.post(Endpoints.users_register, {
        ...this.user_form.value,
        isB2B: true,
      });
    }
  }

  ngOnDestroy() {
    this.registerService.destroy();
  }
}
