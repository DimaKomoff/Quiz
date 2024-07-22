import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { FIFTH_TENTH_STORE_CONSTANT, INITIAL_DEFAULT_FIFTH_TENTH_STATE } from '../../constants/fifth-tenth.constant';
import { RoundName } from '../../enums/global-state.enum';
import { IFifthTenthRoundQuestion, IFifthTenthState } from '../../interfaces/fifth-tenth.interface';
import { GlobalActions } from '../global/global.actions';
import { StateBase } from '../state.base';
import { FifthTenthActions } from './fifth-tenth.actions';

const FIFTH_TENTH_STATE_TOKEN = new StateToken<IFifthTenthState>('FIFTH_TENTH_STATE_TOKEN');

@State<IFifthTenthState>({
  name: FIFTH_TENTH_STATE_TOKEN,
  defaults: INITIAL_DEFAULT_FIFTH_TENTH_STATE
})
@Injectable()
export class FifthTenthState extends StateBase {
  localStorageKey = FIFTH_TENTH_STORE_CONSTANT.localStorageKey;

  @Action(FifthTenthActions.SetInitialState)
  setInitialState(ctx: StateContext<IFifthTenthState>, action: FifthTenthActions.SetInitialState) {
    ctx.setState(action.state);
  }

  @Action(FifthTenthActions.QuestionPlayed)
  questionPlayed(ctx: StateContext<IFifthTenthState>, action: FifthTenthActions.QuestionPlayed) {
    const state = ctx.getState();

    const questions = state.roundTask.questions.map((q, i) => {
      if (q.isPlayed) {
        return q;
      }

      return {
        ...q,
        isPlayed: i === action.questionIndex,
      }
    })

    if (questions.every(question => question.isPlayed)) {
      this.store.dispatch(new GlobalActions.SetRound(RoundName.Alias));

      ctx.setState(INITIAL_DEFAULT_FIFTH_TENTH_STATE);

      this.localStorage.removeItem(this.localStorageKey);

      return;
    }

    ctx.setState({
      ...state,
      roundTask: {
        ...state.roundTask,
        questions
      }
    });

    if (action.isCorrectAnswer) {
      this.store.dispatch(new GlobalActions.UpdateCurrentTeamScore(1));
    }

    this.store.dispatch(new GlobalActions.ChangeTeamInAction());

    this.setStateToLocalStorage(ctx);
  }

  @Selector()
  static questions(state: IFifthTenthState): IFifthTenthRoundQuestion[] {
    return state.roundTask.questions;
  }
}
