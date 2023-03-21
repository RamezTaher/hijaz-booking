import { Component, OnInit } from '@angular/core';
import { StorageService } from 'sharedServices';
import { TranslationService } from '../../services/translation/translation.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-lang-picker',
  templateUrl: './lang-picker.component.html',
  styleUrls: ['./lang-picker.component.scss'],
})
export class LangPickerComponent implements OnInit {
  isLangPickerOpen: boolean = false;
  isTextDark = false;

  matchedUrls = [
    '/pages/home',
    '/pages/umrah',
    '/auth/login',
    '/auth/register',
    '/auth/forgotpassword',
    '/auth/resetpassword',
  ];
  constructor(
    public translationService: TranslationService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && this.matchedUrls.includes(val.url)) {
        this.isTextDark = false;
      } else {
        this.isTextDark = true;
      }
    });
  }

  ngOnInit(): void {}

  toggleLangPicker(): void {
    this.isLangPickerOpen = !this.isLangPickerOpen;
  }
  clickOutside(): void {
    this.isLangPickerOpen = false;
  }
  change(language: string) {
    if (language != this.storageService.lang) {
      this.translationService.changeLanguage(language);
      this.isLangPickerOpen = false;
      window.location.reload();
    }
  }
}
