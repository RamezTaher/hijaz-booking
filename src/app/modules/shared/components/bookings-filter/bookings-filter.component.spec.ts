import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsFilterComponent } from './bookings-filter.component';

describe('BookingsFilterComponent', () => {
  let component: BookingsFilterComponent;
  let fixture: ComponentFixture<BookingsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
