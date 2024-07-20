import { Team } from '../enums/global-state.enum';
import { ICommentsRoundState } from '../interfaces/comments-store.intarface';

export const COMMENTS_ROUND_STORE_CONSTANT = {
  localStorageKey: 'COMMENTS_ROUND_STORE',
}

export const INITIAL_DEFAULT_COMMENTS_STATE: ICommentsRoundState = {
  [Team.Team1]: {
    question1: {
      comment: 'comment team 1',
      score: 4,
      options: [
        {
          videoName: 'video1',
          isCorrect: true
        },
        {
          videoName: 'video2',
          isCorrect: false
        },
        {
          videoName: 'video3',
          isCorrect: false
        },
        {
          videoName: 'video4',
          isCorrect: false
        }
      ]
    }
  },
  [Team.Team2]: {
    question1: {
      comment: 'comment team 2',
      score: 4,
      options: [
        {
          videoName: 'video1',
          isCorrect: true
        },
        {
          videoName: 'video2',
          isCorrect: false
        },
        {
          videoName: 'video3',
          isCorrect: false
        },
        {
          videoName: 'video4',
          isCorrect: false
        }
      ]
    }
  }
};
