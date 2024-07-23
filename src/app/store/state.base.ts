import { inject } from '@angular/core';
import { StateContext, Store } from '@ngxs/store';
import { LocalStorageService } from '../services/local-storage.service';

export abstract class StateBase {
  protected readonly localStorage = inject(LocalStorageService);

  protected readonly store = inject(Store);

  abstract readonly localStorageKey: string;

  protected setStateToLocalStorage<T>(ctx: StateContext<T>) {
    this.localStorage.setItem(this.localStorageKey, JSON.stringify(ctx.getState()))
  }
}
