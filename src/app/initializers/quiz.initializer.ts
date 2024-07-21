import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { GLOBAL_STORE_CONSTANT, INITIAL_DEFAULT_GLOBAL_STATE } from '../constants/global-store.constant';
import { LocalStorageService } from '../services/local-storage.service';
import { GlobalActions } from '../store/global/global.actions';
import { COMMENTS_ROUND_STORE_CONSTANT, INITIAL_DEFAULT_COMMENTS_STATE } from '../constants/comments-store.constant';
import { CommentsRoundActions } from '../store/comments/comments.actions';

export const quizInitializer = () => {
  const localStorage = inject(LocalStorageService);
  const store = inject(Store);

  const globalState = localStorage.getItem(GLOBAL_STORE_CONSTANT.localStorageKey);
  const commentsRoundState = localStorage.getItem(COMMENTS_ROUND_STORE_CONSTANT.localStorageKey);

  const initialGlobalState = globalState ? JSON.parse(globalState) : INITIAL_DEFAULT_GLOBAL_STATE;
  const initialCommentsRoundState = commentsRoundState ? JSON.parse(commentsRoundState) : INITIAL_DEFAULT_COMMENTS_STATE;

  store.dispatch(new GlobalActions.SetInitialState(initialGlobalState));
  store.dispatch(new CommentsRoundActions.SetInitialState(initialCommentsRoundState));

  return () => of([ initialGlobalState, initialCommentsRoundState ]);
};
