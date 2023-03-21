import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsBookingDetailsComponent } from './hotels-booking-success.component';

describe('HotelsBookingDetailsComponent', () => {
  let component: HotelsBookingDetailsComponent;
  let fixture: ComponentFixture<HotelsBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelsBookingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
