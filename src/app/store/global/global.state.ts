import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { GLOBAL_STORE_CONSTANT } from '../../constants/global-store.constant';
import { RoundName, Team } from '../../enums/global-state.enum';
import { IGlobalState, ITeam } from '../../interfaces/global-store.interface';
import { LocalStorageService } from '../../services/local-storage.service';
import { GlobalActions } from './global.actions';


const GLOBAL_STATE_TOKEN = new StateToken<IGlobalState>('GLOBAL_STATE_TOKEN');

@State<IGlobalState>({
  name: GLOBAL_STATE_TOKEN,
  defaults: {
    round: RoundName.First,
    [Team.Team1]: {
      score: 0,
      name: undefined
    },
    [Team.Team2]: {
      score: 0,
      name: undefined
    }
  }
})
@Injectable()
export class GlobalState {
  private readonly localStorage = inject(LocalStorageService);

  @Action(GlobalActions.SetRound)
  setRound(ctx: StateContext<IGlobalState>, action: GlobalActions.SetRound) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      round: action.round
    });

    ctx.dispatch(new GlobalActions.SetStateToLocalStorage())
  }

  @Selector()
  static getRound(state: IGlobalState): RoundName {
    return state.round;
  }

  @Selector()
  static getTeam1(state: IGlobalState): ITeam {
    return state[Team.Team1];
  }

  @Selector()
  static getTeam2(state: IGlobalState): ITeam {
    return state[Team.Team2];
  }

  @Action(GlobalActions.SetStateToLocalStorage)
  private setGlobalStateToLocalStorage(ctx: StateContext<IGlobalState>) {
    this.localStorage.setItem(GLOBAL_STORE_CONSTANT.localStorageKey, JSON.stringify(ctx.getState()))
  }
}
