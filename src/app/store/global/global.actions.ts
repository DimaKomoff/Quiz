import { RoundName, Team } from '../../enums/global-state.enum';
import { IGlobalState } from '../../interfaces/global-store.interface';

const ACTION_SCOPE = '[Global]';

export namespace GlobalActions {
  export class SetInitialState {
    static readonly type = `${ACTION_SCOPE} Set Initial State`;

    constructor(public state: IGlobalState) {}
  }

  export class SetRound {
    static readonly type = `${ACTION_SCOPE} Set Round`;

    constructor(public round: RoundName) {}
  }

  export class StartGame {
    static readonly type = `${ACTION_SCOPE} Set Team Name`;

    constructor(public team1Name: string, public team2Name: string, public startingTeam: Team) {}
  }

  export class UpdateCurrentTeamScore {
    static readonly type = `${ACTION_SCOPE} Update Team Score`;

    constructor(public score: number) {}
  }

  export class ChangeTeamInAction {
    static readonly type = `${ACTION_SCOPE} Change team in action`;
  }

  export class FinishGame {
    static readonly type = `${ACTION_SCOPE} Finish game`;
  }
}
