import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import {
  ALIAS_ROUND_LAPS_NUMBER,
  ALIAS_STORE_CONSTANT, ALIAS_WORD_COST,
  INITIAL_DEFAULT_ALIAS_STATE
} from '../../constants/alias.constant';
import { Team } from '../../enums/global-state.enum';
import { AliasTasks, AliasWords, IAliasState } from '../../interfaces/alias.interface';
import { IFifthTenthRoundQuestion, IFifthTenthState } from '../../interfaces/fifth-tenth.interface';
import { GlobalActions } from '../global/global.actions';
import { GlobalState } from '../global/global.state';
import { StateBase } from '../state.base';
import { AliasActions } from './alias.actions';

const ALIAS_STATE_TOKEN = new StateToken<IAliasState>('ALIAS_STATE_TOKEN');

@State<IAliasState>({
  name: ALIAS_STATE_TOKEN,
  defaults: INITIAL_DEFAULT_ALIAS_STATE
})
@Injectable()
export class AliasState extends StateBase<IAliasState> {
  constructor() {
    super(ALIAS_STORE_CONSTANT.localStorageKey, INITIAL_DEFAULT_ALIAS_STATE);
  }


  @Action(AliasActions.SetInitialState)
  setInitialState(ctx: StateContext<IAliasState>, action: AliasActions.SetInitialState) {
    ctx.setState(action.state);
  }

  @Action(AliasActions.WordGuessed)
  wordGuessed(ctx: StateContext<IAliasState>, action: AliasActions.WordGuessed) {
    const state = ctx.getState();
    const currentTeamInAction = this.store.selectSnapshot(GlobalState.getTeamInActionIndex);

    this.patchState(ctx, {
      tasks: {
        ...state.tasks,
        [currentTeamInAction]: this.playWord(state, currentTeamInAction, action),
      },
    });

    this.store.dispatch(new GlobalActions.UpdateCurrentTeamScore(ALIAS_WORD_COST));
  }

  @Action(AliasActions.WordSkipped)
  wordSkipped(ctx: StateContext<IAliasState>, action: AliasActions.WordGuessed) {
    const state = ctx.getState();
    const currentTeamInAction = this.store.selectSnapshot(GlobalState.getTeamInActionIndex);

    const cost = -ALIAS_WORD_COST;

    this.patchState(ctx, {
      tasks: {
        ...state.tasks,
        [currentTeamInAction]: this.playWord(state, currentTeamInAction, action),
      },
    });

    this.store.dispatch(new GlobalActions.UpdateCurrentTeamScore(cost));
  }

  @Action(AliasActions.FinishHalfLap)
  finishHalfLap(ctx: StateContext<IAliasState>) {
    const state = ctx.getState();
    const halfLapPlayedNumber = state.halfLapPlayedNumber + 1;

    this.audioService.playCorrectBeatOff();

    if (halfLapPlayedNumber === ALIAS_ROUND_LAPS_NUMBER * 2) {
      // TODO add functionality to ask about additional alias lap

      this.store.dispatch(new GlobalActions.FinishGame());
      this.dropState(ctx);

      return;
    }

    this.patchState(ctx, {
      halfLapPlayedNumber
    });

    this.store.dispatch(new GlobalActions.ChangeTeamInAction());
  }

  @Selector()
  static questions(state: IFifthTenthState): IFifthTenthRoundQuestion[] {
    return state.roundTask.questions;
  }

  @Selector()
  static aliasTask(state: IAliasState): AliasTasks {
    return state.tasks
  }

  private playWord(state: IAliasState, currentTeam: Team, action: AliasActions.WordGuessed): AliasWords[] {
    return state.tasks[currentTeam].map(((list, listIndex) => {
      if (listIndex === action.listIndex) {
        return list.map((word, wordIndex) => {
          if (wordIndex === action.wordIndex) {
            return {
              ...word,
              isPlayed: true
            };
          }

          return word;
        });
      }

      return list;
    }));
  }
}
