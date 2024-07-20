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

    ctx.dispatch(new CommentsRoundActions.SetStateToLocalStorage());
  }

  @Action(CommentsRoundActions.RemoveCommentOptionAndDecreaseScore)
  removeOption(ctx: StateContext<ICommentsRoundState>, action: CommentsRoundActions.RemoveCommentOptionAndDecreaseScore) {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      [action.team]: {
        ...state[action.team],
        [action.question]: {
          comment: 'new Comment',
          score: state[action.team].question1.score - 1,
          options: state[action.team].question1.options.filter(item => item.videoName !== action.videoName)
        }
      }
    });

    ctx.dispatch(new CommentsRoundActions.SetStateToLocalStorage());
  }

  @Action(CommentsRoundActions.SetStateToLocalStorage)
  private setCommentsRoundStateToLocalStorage(ctx: StateContext<ICommentsRoundState>) {
    this.localStorage.setItem(COMMENTS_ROUND_STORE_CONSTANT.localStorageKey, JSON.stringify(ctx.getState()))
  }
}
