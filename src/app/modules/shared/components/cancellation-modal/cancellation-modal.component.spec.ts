import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationModalComponent } from './cancellation-modal.component';

describe('CancellationModalComponent', () => {
  let component: CancellationModalComponent;
  let fixture: ComponentFixture<CancellationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancellationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
