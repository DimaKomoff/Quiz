import { Team } from '../enums/global-state.enum';

export type ICommentsRoundState = {
  [key in Team]: {
    question1: ICommentQuestion
  };
};

export interface ICommentQuestion {
  comment: string;
  score: number;
  options: ICommentOption[];
}

export interface ICommentOption {
  videoName: string;
  isCorrect: boolean;
}
