import { Team } from '../enums/global-state.enum';
import { ICommentsRoundState } from '../interfaces/comments-store.intarface';
import { Question } from '../enums/comments.enum';

export const COMMENTS_ROUND_STORE_CONSTANT = {
  localStorageKey: 'COMMENTS_ROUND_STORE',
}

export const INITIAL_DEFAULT_COMMENTS_STATE: ICommentsRoundState = {
  [Team.Team1]: {
    currentQuestion: Question.First,
    [Question.First]: {
      comments: [ 'Q1: comment 1', 'Q1: comment 2', 'Q1: comment 3' ],
      score: 4,
      step: 0,
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
    },
    [Question.Second]: {
      comments: [ 'Q2: comment 1', 'Q2: comment 2', 'Q2: comment 3' ],
      score: 4,
      step: 0,
      options: [
        {
          videoName: 'video1',
          isCorrect: false
        },
        {
          videoName: 'video2',
          isCorrect: false
        },
        {
          videoName: 'video3',
          isCorrect: true
        },
        {
          videoName: 'video4',
          isCorrect: false
        }
      ]
    },
    [Question.Third]: {
      comments: [ 'Q3: comment 1', 'Q3: comment 2', 'Q3: comment 3' ],
      score: 4,
      step: 0,
      options: [
        {
          videoName: 'video1',
          isCorrect: false
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
          isCorrect: true
        }
      ]
    }
  },
  [Team.Team2]: {
    currentQuestion: Question.First,
    [Question.First]: {
      comments: [ 'Q1: comment 1', 'Q1: comment 2', 'Q1: comment 3' ],
      score: 4,
      step: 0,
      options: [
        {
          videoName: 'video1',
          isCorrect: false
        },
        {
          videoName: 'video2',
          isCorrect: false
        },
        {
          videoName: 'video3',
          isCorrect: true
        },
        {
          videoName: 'video4',
          isCorrect: false
        }
      ]
    },
    [Question.Second]: {
      comments: [ 'Q2: comment 1', 'Q2: comment 2', 'Q2: comment 3' ],
      score: 4,
      step: 0,
      options: [
        {
          videoName: 'video1',
          isCorrect: false
        },
        {
          videoName: 'video2',
          isCorrect: true
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
    },
    [Question.Third]: {
      comments: [ 'Q3: comment 1', 'Q3: comment 2', 'Q3: comment 3' ],
      score: 4,
      step: 0,
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
