import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { INITIAL_DEFAULT_TRICK_STATE, TRICK_STORE_CONSTANT } from '../../constants/trick-store.constant';
import { RoundName } from '../../enums/global-state.enum';
import { TrickRoundStatus } from '../../enums/trick-state.enum';
import { ITrickRoundTask, ITrickState } from '../../interfaces/trick.interface';
import { StateBase } from '../state.base';
import { TrickActions } from './trick.actions';
import SetInitialState = TrickActions.SetInitialState;

const TRICK_STATE_TOKEN = new StateToken<ITrickState>('TRICK_STATE_TOKEN');

@State<ITrickState>({
  name: TRICK_STATE_TOKEN,
  defaults: INITIAL_DEFAULT_TRICK_STATE,
})
@Injectable()
export class TrickState extends StateBase {
  readonly localStorageKey = TRICK_STORE_CONSTANT.localStorageKey;

  @Action(SetInitialState)
  setInitialState(ctx: StateContext<ITrickState>, action: SetInitialState) {
    ctx.setState(action.state);
  }

  @Selector()
  static getRoundStatus(state: ITrickState): TrickRoundStatus {
    return state.roundStatus;
  }

  @Selector()
  static getRoundTask(state: ITrickState): ITrickRoundTask {
    return state.roundTask;
  }
}
