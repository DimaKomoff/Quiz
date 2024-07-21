import { ITrickState } from '../../interfaces/trick.interface';

const ACTION_SCOPE = '[Trick]';

export namespace TrickActions {
  export class SetInitialState {
    static readonly type = `${ACTION_SCOPE} Set Initial State`;

    constructor(public state: ITrickState) {}
  }
}
