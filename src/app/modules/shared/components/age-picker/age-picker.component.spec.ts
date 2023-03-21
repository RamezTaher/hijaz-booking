import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgePickerComponent } from './age-picker.component';

describe('AgePickerComponent', () => {
  let component: AgePickerComponent;
  let fixture: ComponentFixture<AgePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
