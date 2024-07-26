import { QuestionComplexity, TrickRoundStatus } from '../enums/trick-state.enum';

export type ITrickState = & {
  roundStatus: TrickRoundStatus;
  playedCategories: string[];
  categoryInAction: string | null;
  questionComplexityInAction: QuestionComplexity | null;
  roundTask: ITrickRoundTask;
};

export interface ITrickCategoryQuestion {
  question: string;
  answer: string;
}

export interface ITrickCategory {
  name: string;
  topic: string;
  questions: Record<QuestionComplexity, ITrickCategoryQuestion>;
}

export interface ITrickRoundTask {
  categories: [ITrickCategory, ITrickCategory, ITrickCategory, ITrickCategory, ITrickCategory, ITrickCategory];
}
