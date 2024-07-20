import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { GlobalActions } from '../../store/global/global.actions';
import ChangeTeamInAction = GlobalActions.ChangeTeamInAction;

@Component({
  selector: 'app-trick',
  templateUrl: './trick.component.html',
  styleUrls: ['./trick.component.scss']
})
export class TrickComponent {
  private readonly store = inject(Store);

  changeTeam() {
    this.store.dispatch(new ChangeTeamInAction())
  }
}
