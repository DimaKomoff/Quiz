import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterTeamNamesComponent } from './enter-team-names.component';

describe('EnterTeamNamesComponent', () => {
  let component: EnterTeamNamesComponent;
  let fixture: ComponentFixture<EnterTeamNamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnterTeamNamesComponent]
    });
    fixture = TestBed.createComponent(EnterTeamNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
