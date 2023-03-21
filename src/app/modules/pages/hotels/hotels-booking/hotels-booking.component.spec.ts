import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsBookingComponent } from './hotels-booking.component';

describe('HotelsBookingComponent', () => {
  let component: HotelsBookingComponent;
  let fixture: ComponentFixture<HotelsBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelsBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
