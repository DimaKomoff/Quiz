import { IAliasState } from '../../interfaces/alias.interface';

const ACTION_SCOPE = '[Alias]';

export namespace AliasActions {
  export class SetInitialState {
    static readonly type = `${ACTION_SCOPE} Set Initial State`;

    constructor(public state: IAliasState) {}
  }

  export class FinishHalfLap {
    static readonly type = `${ACTION_SCOPE} Finish Half Lap`;
  }

  export class WordGuessed {
    static readonly type = `${ACTION_SCOPE} Word Guessed`;

    constructor(public listIndex: number, public wordIndex: number) {}
  }

  export class WordSkipped {
    static readonly type = `${ACTION_SCOPE} Word Skipped`;

    constructor(public listIndex: number, public wordIndex: number) {}
  }
}
