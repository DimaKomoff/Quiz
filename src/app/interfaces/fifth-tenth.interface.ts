export interface IFifthTenthState {
  roundTask: IFifthTenthRoundTask;
}

export interface IFifthTenthRoundQuestion {
  text: string;
  isPlayed: boolean;
}

export interface IFifthTenthRoundTask {
  questions: IFifthTenthRoundQuestion[];
}
