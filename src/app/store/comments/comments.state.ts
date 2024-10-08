import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { INITIAL_DEFAULT_COMMENTS_STATE } from '../../../questions';
import { COMMENTS_ROUND_STORE_CONSTANT, } from '../../constants/comments-store.constant';
import { Question } from '../../enums/comments.enum';
import { Team } from '../../enums/global-state.enum';

import { ICommentQuestion, ICommentsRoundState } from '../../interfaces/comments-store.intarface';
import { StateBase } from '../state.base';
import { CommentsRoundActions } from './comments.actions';

const COMMENTS_STATE_TOKEN = new StateToken<ICommentsRoundState>('COMMENTS_STATE_TOKEN');

@State<ICommentsRoundState>({
  name: COMMENTS_STATE_TOKEN,
  defaults: INITIAL_DEFAULT_COMMENTS_STATE
})
@Injectable()
export class CommentsState extends StateBase<ICommentsRoundState> {
  constructor() {
    super(COMMENTS_ROUND_STORE_CONSTANT.localStorageKey, INITIAL_DEFAULT_COMMENTS_STATE);
  }

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
    const {team, question, videoName} = action;
    const step: number = state[team][question].step + 1;

    this.patchState(ctx, {
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
  }

  @Action(CommentsRoundActions.ChangeTeamQuestion)
  changeTeamQuestion(ctx: StateContext<ICommentsRoundState>, action: CommentsRoundActions.ChangeTeamQuestion): void {
    const state = ctx.getState();
    const {team, currentQuestion} = action;
    const questions: Question[] = (Object.values(Question).filter(q => typeof q === 'number')) as Question[];
    const currentQuestionIndex: number = questions.findIndex(q => q === currentQuestion);
    const nextQuestion: Question = questions[currentQuestionIndex + 1];

    this.patchState(ctx, {
      [team]: {
        ...state[team],
        currentQuestion: nextQuestion || null
      }
    });
  }
}
