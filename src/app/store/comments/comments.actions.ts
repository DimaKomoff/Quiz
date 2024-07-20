import { ICommentsRoundState } from '../../interfaces/comments-store.intarface';
import { Team } from '../../enums/global-state.enum';

const ACTION_SCOPE = '[Comments Round]';

export namespace CommentsRoundActions {
  export class SetInitialState {
    static readonly type = `${ACTION_SCOPE} Set Initial State`;

    constructor(public state: ICommentsRoundState) {}
  }

  export class RemoveCommentOptionAndDecreaseScore {
    static readonly type = `${ACTION_SCOPE} Remove Comment Option`;

    constructor(public team: Team, public question: string, public videoName: string) {}
  }

  export class SetStateToLocalStorage {
    static readonly type = `${ACTION_SCOPE} Set State To Local Storage`;
  }
}
