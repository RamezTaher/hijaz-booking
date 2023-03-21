import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSelectSearchComponent } from './custom-select-search.component';

describe('CustomSelectSearchComponent', () => {
  let component: CustomSelectSearchComponent;
  let fixture: ComponentFixture<CustomSelectSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomSelectSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSelectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
