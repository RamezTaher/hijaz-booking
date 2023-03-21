import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortByDropComponent } from './sort-by-drop.component';

describe('SortByDropComponent', () => {
  let component: SortByDropComponent;
  let fixture: ComponentFixture<SortByDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortByDropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortByDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
