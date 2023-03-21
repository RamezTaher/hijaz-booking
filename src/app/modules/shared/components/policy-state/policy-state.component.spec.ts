import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyStateComponent } from './policy-state.component';

describe('PolicyStateComponent', () => {
  let component: PolicyStateComponent;
  let fixture: ComponentFixture<PolicyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
