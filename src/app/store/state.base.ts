import { inject } from '@angular/core';
import { StateContext } from '@ngxs/store';
import { LocalStorageService } from '../services/local-storage.service';

export abstract class StateBase {
  protected localStorage = inject(LocalStorageService)

  abstract readonly localStorageKey: string;

  protected setStateToLocalStorage<T>(ctx: StateContext<T>) {
    this.localStorage.setItem(this.localStorageKey, JSON.stringify(ctx.getState()))
  }
}
