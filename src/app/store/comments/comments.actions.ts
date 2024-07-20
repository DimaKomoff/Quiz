import { ICommentsRoundState } from '../../interfaces/comments-store.intarface';

const ACTION_SCOPE = '[Comments Round]';

export namespace CommentsRoundActions {
  export class SetInitialState {
    static readonly type = `${ACTION_SCOPE} Set Initial State`;

    constructor(public state: ICommentsRoundState) {}
  }

  export class SetStateToLocalStorage {
    static readonly type = `${ACTION_SCOPE} Set State To Local Storage`;
  }
}
