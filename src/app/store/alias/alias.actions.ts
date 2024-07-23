import { IAliasState } from '../../interfaces/alias.interface';

const ACTION_SCOPE = '[Alias]';

export namespace GlobalActions {
  export class SetInitialState {
    static readonly type = `${ACTION_SCOPE} Set Initial State`;

    constructor(public state: IAliasState) {}
  }
}
