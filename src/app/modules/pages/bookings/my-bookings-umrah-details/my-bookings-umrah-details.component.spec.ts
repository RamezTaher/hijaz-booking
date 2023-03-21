import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookingsHotelDetailsComponent } from './my-bookings-umrah-details.component';

describe('MyBookingsHotelDetailsComponent', () => {
  let component: MyBookingsHotelDetailsComponent;
  let fixture: ComponentFixture<MyBookingsHotelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBookingsHotelDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBookingsHotelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
