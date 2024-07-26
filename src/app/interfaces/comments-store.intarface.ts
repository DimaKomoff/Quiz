import { Team } from '../enums/global-state.enum';
import { Question } from '../enums/comments.enum';

type Questions = {
  [key in Question]: ICommentQuestion
};

interface IQuestionsExtended extends Questions {
  currentQuestion: Question;
}

export type ICommentsRoundState = {
  [key in Team]: IQuestionsExtended;
};

export interface ICommentQuestion {
  comments: string[];
  score: number;
  step: number;
  options: ICommentOption[];
}

export interface ICommentOption {
  videoName: string;
  isCorrect: boolean;
}
