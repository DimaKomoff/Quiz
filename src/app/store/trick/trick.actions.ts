import { AnswerStatus } from '../../enums/global-state.enum';
import { QuestionComplexity } from '../../enums/trick-state.enum';
import { ITrickCategory, ITrickState } from '../../interfaces/trick.interface';

const ACTION_SCOPE = '[Trick]';

export namespace TrickActions {
  export class SetInitialState {
    static readonly type = `${ACTION_SCOPE} Set Initial State`;

    constructor(public state: ITrickState) {}
  }

  export class SelectQuestion {
    static readonly type = `${ACTION_SCOPE} Select Question`;

    constructor(public category: ITrickCategory, public questionComplexity: QuestionComplexity) {}
  }

  export class AnswerQuestion {
    static readonly type = `${ACTION_SCOPE} Answer Question`;

    constructor(public answerStatus: AnswerStatus) {}
  }
}
