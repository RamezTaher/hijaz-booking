import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsSearchCardComponent } from './hotels-search-card.component';

describe('HotelsSearchCardComponent', () => {
  let component: HotelsSearchCardComponent;
  let fixture: ComponentFixture<HotelsSearchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelsSearchCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsSearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
