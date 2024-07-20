import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrickComponent } from './trick.component';

describe('TrickComponent', () => {
  let component: TrickComponent;
  let fixture: ComponentFixture<TrickComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrickComponent]
    });
    fixture = TestBed.createComponent(TrickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
