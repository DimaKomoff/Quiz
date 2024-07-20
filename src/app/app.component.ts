import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RoundName } from './enums/global-state.enum';
import { GlobalState } from './store/global/global.state';
import { GlobalActions } from './store/global/global.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);
  title = 'quiz';

  roundName = RoundName;

  round = this.store.selectSignal(GlobalState.getRound);
  teamInAction = this.store.selectSignal(GlobalState.getTeamInAction);

  ngOnInit(): void {}

  changeTeam(): void {
    this.store.dispatch(new GlobalActions.ChangeTeamInAction());
  }

  nextRound(): void {
    const nextRound = Object.values(RoundName).find(r => r === this.round() as RoundName + 1);

    if (nextRound !== undefined) {
      this.store.dispatch(new GlobalActions.SetRound(nextRound as RoundName));
    }
  }
}
