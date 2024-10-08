import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { take } from 'rxjs';
import { GameIsFinishedPopupComponent } from '../../components/game-is-finished-popup/game-is-finished-popup.component';
import {
  GLOBAL_STORE_CONSTANT,
  INITIAL_DEFAULT_GLOBAL_STATE,
  ROUND_NAMES
} from '../../constants/global-store.constant';
import { RoundName, Team } from '../../enums/global-state.enum';
import { IGlobalState, ITeam } from '../../interfaces/global-store.interface';
import { StateBase } from '../state.base';
import { GlobalActions } from './global.actions';

const GLOBAL_STATE_TOKEN = new StateToken<IGlobalState>('GLOBAL_STATE_TOKEN');

@State<IGlobalState>({
  name: GLOBAL_STATE_TOKEN,
  defaults: INITIAL_DEFAULT_GLOBAL_STATE
})
@Injectable()
export class GlobalState extends StateBase<IGlobalState> {
  private readonly dialog = inject(MatDialog);

  constructor() {
    super(GLOBAL_STORE_CONSTANT.localStorageKey, INITIAL_DEFAULT_GLOBAL_STATE);
  }

  @Action(GlobalActions.SetInitialState)
  setInitialState(ctx: StateContext<IGlobalState>, action: GlobalActions.SetInitialState) {
    ctx.setState(action.state);
  }

  @Action(GlobalActions.SetRound)
  setRound(ctx: StateContext<IGlobalState>, action: GlobalActions.SetRound) {
    const state = ctx.getState();

    const team1Score = state.teams[Team.Team1].score;
    const team2Score = state.teams[Team.Team2].score;
    const teamInAction = team2Score > team1Score ? Team.Team2 : Team.Team1;

    this.patchState(ctx,{
      round: action.round,
      teamInAction
    });
  }

  @Action(GlobalActions.StartGame)
  startGame(ctx: StateContext<IGlobalState>, action: GlobalActions.StartGame) {
    const state = ctx.getState();
    this.patchState(ctx,{
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
  }

  @Action(GlobalActions.UpdateCurrentTeamScore)
  updateCurrentTeamScore(ctx: StateContext<IGlobalState>, action: GlobalActions.UpdateCurrentTeamScore) {
    const state = ctx.getState();
    const teamInAction = state.teamInAction as Team;

    this.patchState(ctx, {
      teams: {
        ...state.teams,
        [teamInAction]: {
          ...state.teams[teamInAction],
          score: state.teams[teamInAction].score + action.score
        }
      }
    });
  }

  @Action(GlobalActions.ChangeTeamInAction)
  changeTeamInAction(ctx: StateContext<IGlobalState>) {
    const state = ctx.getState();

    const teams = Object.values(Team).filter(t => typeof t === 'number');

    const currentIndex = teams.findIndex(t => t === state.teamInAction);

    const nextIndex = (currentIndex + 1) % teams.length;

    this.patchState(ctx,{
      teamInAction: teams[nextIndex] as Team
    });
  }

  @Action(GlobalActions.FinishGame)
  finishGame(ctx: StateContext<IGlobalState>) {
    const state = ctx.getState();

    this.dialog.open(GameIsFinishedPopupComponent, {
      data: state,
      disableClose: true
    }).afterClosed().pipe(take(1)).subscribe(() => {
      this.dropState(ctx);
    });
  }

  @Selector()
  static getRound(state: IGlobalState): RoundName | null {
    return state.round;
  }

  @Selector()
  static getRoundName(state: IGlobalState): string {
    return ROUND_NAMES.get(state.round as RoundName) as string;
  }

  @Selector()
  static getTeamsList(state: IGlobalState): ITeam[] {
    return Object.values(state.teams).map(t => t);
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
  static getTeamInActionIndex(state: IGlobalState): Team {
    return state.teamInAction as Team;
  }
}
