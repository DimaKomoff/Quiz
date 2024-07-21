import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { GLOBAL_STORE_CONSTANT } from '../../constants/global-store.constant';
import { RoundName, Team } from '../../enums/global-state.enum';
import { IGlobalState, ITeam } from '../../interfaces/global-store.interface';
import { LocalStorageService } from '../../services/local-storage.service';
import { GlobalActions } from './global.actions';

const GLOBAL_STATE_TOKEN = new StateToken<IGlobalState>('GLOBAL_STATE_TOKEN');

@State<IGlobalState>({
  name: GLOBAL_STATE_TOKEN
})
@Injectable()
export class GlobalState {
  private readonly localStorage = inject(LocalStorageService);

  @Action(GlobalActions.SetInitialState)
  setInitialState(ctx: StateContext<IGlobalState>, action: GlobalActions.SetInitialState) {
    ctx.setState(action.state);
  }

  @Action(GlobalActions.SetRound)
  setRound(ctx: StateContext<IGlobalState>, action: GlobalActions.SetRound) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      round: action.round
    });

    ctx.dispatch(new GlobalActions.SetStateToLocalStorage());
  }

  @Action(GlobalActions.StartGame)
  startGame(ctx: StateContext<IGlobalState>, action: GlobalActions.StartGame) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      round: RoundName.Trick,
      teams: {
        [Team.Team1]: {
          ...state.teams[Team.Team1],
          name: action.team1Name
        },
        [Team.Team2]: {
          ...state.teams[Team.Team2],
          name: action.team2Name
        },
      },
      teamInAction: action.startingTeam
    });

    ctx.dispatch(new GlobalActions.SetStateToLocalStorage());
  }

  @Action(GlobalActions.UpdateTeamScore)
  updateTeamScore(ctx: StateContext<IGlobalState>, action: GlobalActions.UpdateTeamScore) {
    const state = ctx.getState();
    const { team } = action;

    ctx.setState({
      ...state,
      teams: {
        ...state.teams,
        [team]: {
          ...state.teams[team],
          score: state.teams[team].score + action.score
        }
      }
    });

    ctx.dispatch(new GlobalActions.SetStateToLocalStorage());
  }

  @Action(GlobalActions.ChangeTeamInAction)
  changeTeamInAction(ctx: StateContext<IGlobalState>) {
    const state = ctx.getState();

    const teams = Object.values(Team).filter(t => typeof t === 'number');

    const currentIndex = teams.findIndex(t => t === state.teamInAction);

    const nextIndex = (currentIndex + 1) % teams.length;

    ctx.setState({
      ...state,
      teamInAction: teams[nextIndex] as Team
    });

    ctx.dispatch(new GlobalActions.SetStateToLocalStorage());
  }

  @Selector()
  static getRound(state: IGlobalState): RoundName | null {
    return state.round;
  }

  @Selector()
  static getTeam1(state: IGlobalState): ITeam {
    return state.teams[Team.Team1];
  }

  @Selector()
  static getTeam2(state: IGlobalState): ITeam {
    return state.teams[Team.Team2];
  }

  @Selector()
  static getTeamInAction(state: IGlobalState): ITeam {
    return state.teams[state.teamInAction as Team];
  }

  @Selector()
  static getIndexTeamInAction(state: IGlobalState): Team {
    return state.teamInAction as Team;
  }

  @Action(GlobalActions.SetStateToLocalStorage)
  private setGlobalStateToLocalStorage(ctx: StateContext<IGlobalState>) {
    this.localStorage.setItem(GLOBAL_STORE_CONSTANT.localStorageKey, JSON.stringify(ctx.getState()));
  }
}
