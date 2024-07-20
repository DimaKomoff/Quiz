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

  const initialState = globalState ? JSON.parse(globalState) : INITIAL_DEFAULT_GLOBAL_STATE;

  store.dispatch(new GlobalActions.SetInitialState(initialState));

  return () => of(initialState);
};
