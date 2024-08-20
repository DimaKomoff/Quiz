import { Question } from './app/enums/comments.enum';
import { Team } from './app/enums/global-state.enum';
import { QuestionComplexity } from './app/enums/trick-state.enum';
import { AliasTasks } from './app/interfaces/alias.interface';
import { ICommentsRoundState } from './app/interfaces/comments-store.intarface';
import { IFifthTenthRoundTask } from './app/interfaces/fifth-tenth.interface';
import { ITrickRoundTask } from './app/interfaces/trick.interface';

export const TRICK_ROUND_TASK: ITrickRoundTask = {
  categories: [
    {
      name: 'Category name 1',
      topic: 'Topic name',
      questions: {
        [QuestionComplexity.Simple]: {
          question: 'Simple question',
          answer: 'Simple answer',
        },
        [QuestionComplexity.Complicated]: {
          question: 'Complicated question',
          answer: 'Complicated answer',
        },
      }
    },
    {
      name: 'Category name 2',
      topic: 'Topic name',
      questions: {
        [QuestionComplexity.Simple]: {
          question: 'Simple question',
          answer: 'Simple answer',
        },
        [QuestionComplexity.Complicated]: {
          question: 'Complicated question',
          answer: 'Complicated answer',
        },
      }
    },
    {
      name: 'Category name 3',
      topic: 'Topic name',
      questions: {
        [QuestionComplexity.Simple]: {
          question: 'Simple question',
          answer: 'Simple answer',
        },
        [QuestionComplexity.Complicated]: {
          question: 'Complicated question',
          answer: 'Complicated answer',
        },
      }
    },
    {
      name: 'Category name 4',
      topic: 'Topic name',
      questions: {
        [QuestionComplexity.Simple]: {
          question: 'Simple question',
          answer: 'Simple answer',
        },
        [QuestionComplexity.Complicated]: {
          question: 'Complicated question',
          answer: 'Complicated answer',
        },
      }
    },
    {
      name: 'Category name 5',
      topic: 'Topic name',
      questions: {
        [QuestionComplexity.Simple]: {
          question: 'Simple question',
          answer: 'Simple answer',
        },
        [QuestionComplexity.Complicated]: {
          question: 'Complicated question',
          answer: 'Complicated answer',
        },
      }
    },
    {
      name: 'Category name 6',
      topic: 'Topic name',
      questions: {
        [QuestionComplexity.Simple]: {
          question: 'Simple question',
          answer: 'Simple answer',
        },
        [QuestionComplexity.Complicated]: {
          question: 'Complicated question',
          answer: 'Complicated answer',
        },
      }
    },
  ]
};

export const INITIAL_DEFAULT_COMMENTS_STATE: ICommentsRoundState = {
  [Team.Team1]: {
    currentQuestion: Question.First,
    [Question.First]: {
      comments: [
        'Comment 1',
        'Comment 2',
        'Comment 3',
      ],
      score: 4,
      step: 0,
      options: [
        {
          videoName: 'Video name',
          isCorrect: true // Pay attention and don't make first video name correct for each question
        },
        {
          videoName: 'Video name',
          isCorrect: false
        },
        {
          videoName: 'Video name',
          isCorrect: false
        },
        {
          videoName: 'Video name',
          isCorrect: false
        }
      ]
    },
    [Question.Second]: {
      comments: [
        'Comment 1',
        'Comment 2',
        'Comment 3',
      ],
      score: 4,
      step: 0,
      options: [
        {
          videoName: 'Video name',
          isCorrect: true // Pay attention and don't make first video name correct for each question
        },
        {
          videoName: 'Video name',
          isCorrect: false
        },
        {
          videoName: 'Video name',
          isCorrect: false
        },
        {
          videoName: 'Video name',
          isCorrect: false
        }
      ]
    },
  },
  [Team.Team2]: {
    currentQuestion: Question.First,
    [Question.First]: {
      comments: [
        'Comment 1',
        'Comment 2',
        'Comment 3',
      ],
      score: 4,
      step: 0,
      options: [
        {
          videoName: 'Video name',
          isCorrect: true // Pay attention and don't make first video name correct for each question
        },
        {
          videoName: 'Video name',
          isCorrect: false
        },
        {
          videoName: 'Video name',
          isCorrect: false
        },
        {
          videoName: 'Video name',
          isCorrect: false
        }
      ]
    },
    [Question.Second]: {
      comments: [
        'Comment 1',
        'Comment 2',
        'Comment 3',
      ],
      score: 4,
      step: 0,
      options: [
        {
          videoName: 'Video name',
          isCorrect: true // Pay attention and don't make first video name correct for each question
        },
        {
          videoName: 'Video name',
          isCorrect: false
        },
        {
          videoName: 'Video name',
          isCorrect: false
        },
        {
          videoName: 'Video name',
          isCorrect: false
        }
      ]
    },
  }
};

export const FIFTH_TENTH_TASK: IFifthTenthRoundTask = {
  questions: [
    'Name 5 something for 10 seconds question',
    'Name 5 something for 10 seconds question',
    'Name 5 something for 10 seconds question',
    'Name 5 something for 10 seconds question',
    'Name 5 something for 10 seconds question',
    'Name 5 something for 10 seconds question',
    'Name 5 something for 10 seconds question',
    'Name 5 something for 10 seconds question',
  ].map(question => ({
    text: question,
    isPlayed: false
  })),
};

export const ALIAS_TASK: AliasTasks = {
  [Team.Team1]: [
    [
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
    ].map(word => ({
      text: word,
      isPlayed: false
    })),
    [
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
    ].map(word => ({
      text: word,
      isPlayed: false
    }))
  ],
  [Team.Team2]: [
    [
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
    ].map(word => ({
      text: word,
      isPlayed: false
    })),
    [
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
      'Alias word',
    ].map(word => ({
      text: word,
      isPlayed: false
    }))
  ]
};
