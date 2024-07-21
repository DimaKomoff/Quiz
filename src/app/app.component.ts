import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RoundName } from './enums/global-state.enum';
import { GlobalState } from './store/global/global.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly store = inject(Store);
  title = 'Вікторина';

  roundName = RoundName;

  round = this.store.selectSignal(GlobalState.getRound);
  teamInAction = this.store.selectSignal(GlobalState.getTeamInAction);
}
