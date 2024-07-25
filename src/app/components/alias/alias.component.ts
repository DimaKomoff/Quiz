import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { map, mergeMap } from 'rxjs';
import { ALIAS_STORE_CONSTANT } from '../../constants/alias.constant';
import { Team } from '../../enums/global-state.enum';
import { CountdownService } from '../../services/countdown.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { AliasActions } from '../../store/alias/alias.actions';
import { AliasState } from '../../store/alias/alias.state';
import { GlobalState } from '../../store/global/global.state';

@Component({
  selector: 'app-alias',
  templateUrl: './alias.component.html',
  styleUrls: ['./alias.component.scss']
})
export class AliasComponent implements OnInit {
  private readonly localStorage = inject(LocalStorageService);
  private readonly store = inject(Store);
  private readonly countdownService = inject(CountdownService);

  private readonly roundFinished = () => {
    this.timerIsRunning = false;
    this.timerFinished = true;
    this.timer.triggerFn(false);
  }

  private readonly timer = this.countdownService.getCountdown(60, this.roundFinished);
  countdown$ = this.timer.countdown$;

  team = Team;

  timerFinished = false;

  timerIsRunning = false;

  lapInAction = false;

  readonly wordsLists$ = this.store.select(AliasState.aliasTask).pipe(
    mergeMap(tasks => this.store.select(GlobalState.getTeamInActionIndex).pipe(
      map(currentTeam => tasks[currentTeam])
    ))
  );

  ngOnInit() {
    const localStorageState = this.localStorage.getItem(ALIAS_STORE_CONSTANT.localStorageKey);
    if (localStorageState) {
      this.store.dispatch(new AliasActions.SetInitialState(JSON.parse(localStorageState)));
    }
  }

  startTimer(): void {
    this.lapInAction = true;
    this.timerIsRunning = true;
    this.timer.triggerFn(true);
  }

  finishHalfLap() {
    this.timerFinished = false;
    this.lapInAction = false;
    this.store.dispatch(new AliasActions.FinishHalfLap());
  }

  skipped(listIndex: number, wordIndex: number): void {
    this.store.dispatch(new AliasActions.WordSkipped(listIndex, wordIndex));
  }

  correct(listIndex: number, wordIndex: number): void {
    this.store.dispatch(new AliasActions.WordGuessed(listIndex, wordIndex));
  }
}
