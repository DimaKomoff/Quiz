import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';

import { inject, Injectable } from '@angular/core';

import { ICommentQuestion, ICommentsRoundState } from '../../interfaces/comments-store.intarface';
import { LocalStorageService } from '../../services/local-storage.service';
import {
  COMMENTS_ROUND_STORE_CONSTANT,
  INITIAL_DEFAULT_COMMENTS_STATE
} from '../../constants/comments-store.constant';
import { CommentsRoundActions } from './comments.actions';
import { Team } from '../../enums/global-state.enum';

const COMMENTS_STATE_TOKEN = new StateToken<ICommentsRoundState>('COMMENTS_STATE_TOKEN');

@State({
  name: COMMENTS_STATE_TOKEN,
  defaults: INITIAL_DEFAULT_COMMENTS_STATE
})
@Injectable()
export class CommentsState {
  private readonly localStorage = inject(LocalStorageService);

  @Selector()
  static getTeam1Question(state: ICommentsRoundState): ICommentQuestion {
    return state[Team.Team1].question1;
  }

  @Selector()
  static getTeam2Question(state: ICommentsRoundState): ICommentQuestion {
    return state[Team.Team2].question1;
  }

  @Action(CommentsRoundActions.SetInitialState)
  setInitialState(ctx: StateContext<ICommentsRoundState>, action: CommentsRoundActions.SetInitialState) {
    ctx.setState(action.state);
    console.log(action);

    ctx.dispatch(new CommentsRoundActions.SetStateToLocalStorage());
  }

  @Action(CommentsRoundActions.SetStateToLocalStorage)
  private setCommentsRoundStateToLocalStorage(ctx: StateContext<ICommentsRoundState>) {
    this.localStorage.setItem(COMMENTS_ROUND_STORE_CONSTANT.localStorageKey, JSON.stringify(ctx.getState()))
  }
}
