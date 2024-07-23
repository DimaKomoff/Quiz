import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { GLOBAL_STORE_CONSTANT, INITIAL_DEFAULT_GLOBAL_STATE } from '../constants/global-store.constant';
import { LocalStorageService } from '../services/local-storage.service';
import { GlobalActions } from '../store/global/global.actions';

export const quizInitializer = () => {
  const localStorage = inject(LocalStorageService);
  const store = inject(Store);

  const globalState = localStorage.getItem(GLOBAL_STORE_CONSTANT.localStorageKey);

  if (globalState) {
    store.dispatch(new GlobalActions.SetInitialState(JSON.parse(globalState)));
  }

  return () => of(globalState);
};
