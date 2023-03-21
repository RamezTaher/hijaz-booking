import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from 'sharedServices';

@Component({
  selector: 'app-user-picker',
  templateUrl: './user-picker.component.html',
  styleUrls: ['./user-picker.component.scss'],
})
export class UserPickerComponent implements OnInit {
  isUserPickerOpen: Boolean = false;
  isTextDark: boolean = false;
  user: any = {};
  matchedUrls = ['/pages/home', '/pages/umrah'];
  constructor(private router: Router, private storageService: StorageService) {
    this.user = this.storageService.user;

  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.matchedUrls.includes(val.url)) {
          this.isTextDark = false;
        } else {
          this.isTextDark = true;
        }
      }
    });
  }
  toggleLangPicker(): void {
    this.isUserPickerOpen = !this.isUserPickerOpen;
  }
  clickOutside(): void {
    this.isUserPickerOpen = false;
  }

  logout() {
    const lang = this.storageService.lang;
    this.storageService.clear();
    this.storageService.lang = lang;
    this.router.navigateByUrl('/pages/home');
  }
}
