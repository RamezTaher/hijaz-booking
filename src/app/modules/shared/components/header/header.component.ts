import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from 'sharedServices';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMobileNavOpen: boolean = false;
  isLoginOpen: boolean = false;
  isForgotOpen: boolean = false;
  isResetOpen: boolean = false;
  isHeaderWhite: boolean = false;
  isShadowNone: boolean = false;
  matchedUrls = ['/pages/home', '/pages/hotels', '/pages/register'];
  matchedUrlsNoShadow = [
    '/pages/hotels/home',
  ];
  constructor(private router: Router, public storageService: StorageService) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.matchedUrls.includes(val.url)) {
          this.isHeaderWhite = false;
        } else {
          this.isHeaderWhite = true;
        }
        if (this.matchedUrlsNoShadow.includes(val.url)) {
          this.isShadowNone = true;
        } else {
          this.isShadowNone = false;
        }
      }
    });
  }

  ngOnInit(): void {}
}
