import { QuestionComplexity } from './app/enums/trick-state.enum';
import { IFifthTenthRoundTask } from './app/interfaces/fifth-tenth.interface';
import { ITrickRoundTask } from './app/interfaces/trick.interface';

const QUESTIONS = {
  round2: {
    team1: {
      q1: {
        cost: 4,
        comment: 'some comment',
        options: [
          {
            name: 'name1',
            isCorrect: true
          },
          {
            name: 'name2',
            isCorrect: false
          },
          {
            name: 'name3',
            isCorrect: false
          },
          {
            name: 'name4',
            isCorrect: false
          }
        ]
      },
      q2: {
        cost: 3,
        comment: 'some comment',
        options: [
          {
            name: 'name1',
            isCorrect: true
          },
          {
            name: 'name2',
            isCorrect: false
          },
          {
            name: 'name3',
            isCorrect: false
          },
          {
            name: 'name4',
            isCorrect: false
          }
        ]
      },
      q3: {
        cost: 2,
        comment: 'some comment',
        options: [
          {
            name: 'name1',
            isCorrect: true
          },
          {
            name: 'name2',
            isCorrect: false
          },
          {
            name: 'name3',
            isCorrect: false
          },
          {
            name: 'name4',
            isCorrect: false
          }
        ]
      },
    },
    team2: {
      q1: {
        cost: 4,
        comment: 'some comment',
        options: [
          {
            name: 'name1',
            isCorrect: true
          },
          {
            name: 'name2',
            isCorrect: false
          },
          {
            name: 'name3',
            isCorrect: false
          },
          {
            name: 'name4',
            isCorrect: false
          }
        ]
      },
      q2: {
        cost: 3,
        comment: 'some comment',
        options: [
          {
            name: 'name1',
            isCorrect: true
          },
          {
            name: 'name2',
            isCorrect: false
          },
          {
            name: 'name3',
            isCorrect: false
          },
          {
            name: 'name4',
            isCorrect: false
          }
        ]
      },
      q3: {
        cost: 2,
        comment: 'some comment',
        options: [
          {
            name: 'name1',
            isCorrect: true
          },
          {
            name: 'name2',
            isCorrect: false
          },
          {
            name: 'name3',
            isCorrect: false
          },
          {
            name: 'name4',
            isCorrect: false
          }
        ]
      },
    },
  }
}

export const TRICK_ROUND_TASK: ITrickRoundTask = {
  categories: [
    {
      name: 'name1',
      questions: {
        [QuestionComplexity.Simple]: {
          question: 'question',
          answer: 'answer',
        },
        [QuestionComplexity.Complicated]: {
          question: 'question',
          answer: 'answer',
        },
      }
    },
    {
      name: 'name2',
      questions: {
        [QuestionComplexity.Simple]: {
          question: 'question',
          answer: 'answer',
        },
        [QuestionComplexity.Complicated]: {
          question: 'question',
          answer: 'answer',
        },
      }
    },
    {
      name: 'name3',
      questions: {
        [QuestionComplexity.Simple]: {
          question: 'question',
          answer: 'answer',
        },
        [QuestionComplexity.Complicated]: {
          question: 'question',
          answer: 'answer',
        },
      }
    },
    {
      name: 'name4',
      questions: {
        [QuestionComplexity.Simple]: {
          question: 'question',
          answer: 'answer',
        },
        [QuestionComplexity.Complicated]: {
          question: 'question',
          answer: 'answer',
        },
      }
    },
    {
      name: 'name5',
      questions: {
        [QuestionComplexity.Simple]: {
          question: 'question',
          answer: 'answer',
        },
        [QuestionComplexity.Complicated]: {
          question: 'question',
          answer: 'answer',
        },
      }
    },
    {
      name: 'name6',
      questions: {
        [QuestionComplexity.Simple]: {
          question: 'question',
          answer: 'answer',
        },
        [QuestionComplexity.Complicated]: {
          question: 'question',
          answer: 'answer',
        },
      }
    },
  ]
}

export const FIFTH_TENTH_TASK: IFifthTenthRoundTask = {
  questions: ['question1', 'question2', 'question3', 'question4', 'question5', 'question6'].map(question => ({
    text: question,
    isPlayed: false
  })),
}
