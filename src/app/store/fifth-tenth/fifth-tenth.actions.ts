import { IFifthTenthState } from '../../interfaces/fifth-tenth.interface';

const ACTION_SCOPE = '[Fifth Tenth]]';

export namespace FifthTenthActions {
  export class SetInitialState {
    static readonly type = `${ACTION_SCOPE} Set Initial State`;

    constructor(public state: IFifthTenthState) {}
  }

  export class QuestionPlayed {
    static readonly type = `${ACTION_SCOPE} End Game`;

    constructor(public questionIndex: number, public isCorrectAnswer: boolean) {}
  }
}
