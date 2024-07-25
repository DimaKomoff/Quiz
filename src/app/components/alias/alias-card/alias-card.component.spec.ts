import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AliasCardComponent } from './alias-card.component';

describe('AliasCardComponent', () => {
  let component: AliasCardComponent;
  let fixture: ComponentFixture<AliasCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AliasCardComponent]
    });
    fixture = TestBed.createComponent(AliasCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
