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

    constructor(public team1Name: string, public team2Name: string) {}
  }

  export class SetTeamScore {
    static readonly type = `${ACTION_SCOPE} Set Team Score`;

    constructor(public team: Team, public score: number) {}
  }

  export class SetStateToLocalStorage {
    static readonly type = `${ACTION_SCOPE} Set State To Local Storage`;
  }
}
