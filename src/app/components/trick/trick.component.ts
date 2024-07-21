import { Component, inject, OnInit, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { INITIAL_DEFAULT_TRICK_STATE, TRICK_STORE_CONSTANT } from '../../constants/trick-store.constant';
import { TrickRoundStatus } from '../../enums/trick-state.enum';
import { LocalStorageService } from '../../services/local-storage.service';
import { GlobalActions } from '../../store/global/global.actions';
import { TrickActions } from '../../store/trick/trick.actions';
import { TrickState } from '../../store/trick/trick.state';

@Component({
  selector: 'app-trick',
  templateUrl: './trick.component.html',
  styleUrls: ['./trick.component.scss']
})
export class TrickComponent {
  private readonly localStorage = inject(LocalStorageService);
  private readonly store = inject(Store);

  roundStatusName = TrickRoundStatus;

  roundStatus = this.store.selectSignal(TrickState.getRoundStatus);



  constructor() {
    const localStorageState = this.localStorage.getItem(TRICK_STORE_CONSTANT.localStorageKey);
    if (localStorageState) {
      this.store.dispatch(new TrickActions.SetInitialState(JSON.parse(localStorageState)));
    }
  }

  changeTeam() {
    this.store.dispatch(new GlobalActions.ChangeTeamInAction())
  }
}
