import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';

import { Injectable } from '@angular/core';

import { ICommentQuestion, ICommentsRoundState } from '../../interfaces/comments-store.intarface';
import {
  COMMENTS_ROUND_STORE_CONSTANT,
  INITIAL_DEFAULT_COMMENTS_STATE
} from '../../constants/comments-store.constant';
import { CommentsRoundActions } from './comments.actions';
import { Team } from '../../enums/global-state.enum';
import { Question } from '../../enums/comments.enum';
import { StateBase } from '../state.base';

const COMMENTS_STATE_TOKEN = new StateToken<ICommentsRoundState>('COMMENTS_STATE_TOKEN');

@State<ICommentsRoundState>({
  name: COMMENTS_STATE_TOKEN,
  defaults: INITIAL_DEFAULT_COMMENTS_STATE
})
@Injectable()
export class CommentsState extends StateBase {
  readonly localStorageKey = COMMENTS_ROUND_STORE_CONSTANT.localStorageKey;

  @Selector()
  static getTeam1Question(state: ICommentsRoundState): ICommentQuestion {
    return state[Team.Team1][state[Team.Team1].currentQuestion];
  }

  @Selector()
  static getTeam2Question(state: ICommentsRoundState): ICommentQuestion {
    return state[Team.Team2][state[Team.Team2].currentQuestion];
  }

  @Selector()
  static getTeam1CurrentQuestion(state: ICommentsRoundState): Question {
    return state[Team.Team1].currentQuestion;
  }

  @Selector()
  static getTeam2CurrentQuestion(state: ICommentsRoundState): Question {
    return state[Team.Team2].currentQuestion;
  }

  @Action(CommentsRoundActions.SetInitialState)
  setInitialState(ctx: StateContext<ICommentsRoundState>, action: CommentsRoundActions.SetInitialState): void {
    ctx.setState(action.state);
  }

  @Action(CommentsRoundActions.RemoveCommentOptionAndDecreaseScore)
  removeOption(ctx: StateContext<ICommentsRoundState>, action: CommentsRoundActions.RemoveCommentOptionAndDecreaseScore): void {
    const state = ctx.getState();
    const { team, question, videoName } = action;
    const step: number = state[team][question].step + 1;

    ctx.setState({
      ...state,
      [team]: {
        ...state[team],
        [question]: {
          ...state[team][question],
          score: state[team][question].score - 1,
          step,
          options: state[team][question].options.filter(item => item.videoName !== videoName)
        }
      }
    });

    this.setStateToLocalStorage(ctx);
  }

  @Action(CommentsRoundActions.ChangeTeamQuestion)
  changeTeamQuestion(ctx: StateContext<ICommentsRoundState>, action: CommentsRoundActions.ChangeTeamQuestion): void {
    const state = ctx.getState();
    const { team, currentQuestion } = action;
    const questions: Question[] = (Object.values(Question).filter(q => typeof q === 'number')) as Question[];
    const currentQuestionIndex: number = questions.findIndex(q => q === currentQuestion);
    const nextQuestion: Question = questions[currentQuestionIndex + 1];
    console.log('nextQuestion: ', nextQuestion);

    ctx.setState({
      ...state,
      [team]: {
        ...state[team],
        currentQuestion: nextQuestion || null
      }
    });

    this.setStateToLocalStorage(ctx);
  }
}
