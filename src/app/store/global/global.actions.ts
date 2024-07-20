import { RoundName, Team } from '../../enums/global-state.enum';
import { ITeam } from '../../interfaces/global-store.interface';

const ACTION_SCOPE = '[Global]';

export namespace GlobalActions {
  export class SetRound {
    static readonly type = `${ACTION_SCOPE} Set Round`;

    constructor(public round: RoundName) {}
  }

  export class SetTeamName {
    static readonly type = `${ACTION_SCOPE} Set Team Name`;

    constructor(public team: Team, public name: string) {}
  }

  export class SetTeamScore {
    static readonly type = `${ACTION_SCOPE} Set Team Score`;

    constructor(public team: Team, public score: number) {}
  }

  export class SetStateToLocalStorage {
    static readonly type = `${ACTION_SCOPE} Set State To Local Storage`;
  }
}
