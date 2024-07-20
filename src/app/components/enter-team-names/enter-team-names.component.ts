import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { GlobalActions } from '../../store/global/global.actions';

const isNamesUnique = (group: FormGroup): ValidationErrors | null => {
  const name1 = group.controls['team1'].value;
  const name2 = group.controls['team2'].value;
  if (name1 === name2) {
    return {
      sameNames: true
    }
  }

  return null;
}

@Component({
  selector: 'app-enter-team-names',
  templateUrl: './enter-team-names.component.html',
  styleUrls: ['./enter-team-names.component.scss']
})
export class EnterTeamNamesComponent {
  private readonly fb = inject(FormBuilder);

  private readonly store = inject(Store);

  team1NameFC = new FormControl('', Validators.required);

  team2NameFC = new FormControl('', Validators.required);

  form: FormGroup = this.fb.group({
    team1: this.team1NameFC,
    team2: this.team2NameFC
  }, {
    validators: [isNamesUnique]
  });

  enterTeamNames(): void {
    this.store.dispatch(new GlobalActions.StartGame(
      this.team1NameFC.value as string,
      this.team2NameFC.value as string,
    ))
  }
}
