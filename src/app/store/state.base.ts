import { inject } from '@angular/core';
import { StateContext, Store } from '@ngxs/store';
import { AudioService } from '../services/audio.service';
import { LocalStorageService } from '../services/local-storage.service';

export abstract class StateBase<State> {
  private readonly localStorage = inject(LocalStorageService);

  protected readonly store = inject(Store);

  protected audioService = inject(AudioService);

  protected constructor(private localStorageKey: string, private defaultState: State) {}

  protected patchState(ctx: StateContext<State>, newState: Partial<State>) {
    ctx.patchState(newState);

    this.setStateToLocalStorage(ctx.getState());
  }

  protected dropState(ctx: StateContext<State>) {
    ctx.setState(this.defaultState);

    this.localStorage.removeItem(this.localStorageKey);
  }

  private setStateToLocalStorage(state: State) {
    this.localStorage.setItem(this.localStorageKey, JSON.stringify(state))
  }
}
