import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import {
  INITIAL_DEFAULT_TRICK_STATE,
  QUESTION_COMPLEXITY_WEIGHT,
  TRICK_STORE_CONSTANT
} from '../../constants/trick-store.constant';
import { AnswerStatus, RoundName } from '../../enums/global-state.enum';
import { QuestionComplexity, TrickRoundStatus } from '../../enums/trick-state.enum';
import { ITrickCategory, ITrickCategoryQuestion, ITrickState } from '../../interfaces/trick.interface';
import { GlobalActions } from '../global/global.actions';
import { StateBase } from '../state.base';
import { TrickActions } from './trick.actions';

const TRICK_STATE_TOKEN = new StateToken<ITrickState>('TRICK_STATE_TOKEN');

@State<ITrickState>({
  name: TRICK_STATE_TOKEN,
  defaults: INITIAL_DEFAULT_TRICK_STATE,
})
@Injectable()
export class TrickState extends StateBase<ITrickState> {
  constructor() {
    super(TRICK_STORE_CONSTANT.localStorageKey, INITIAL_DEFAULT_TRICK_STATE);
  }

  @Action(TrickActions.SetInitialState)
  setInitialState(ctx: StateContext<ITrickState>, action: TrickActions.SetInitialState) {
    ctx.setState(action.state);
  }

  @Action(TrickActions.SelectQuestion)
  selectQuestion(ctx: StateContext<ITrickState>, action: TrickActions.SelectQuestion) {
    const state = ctx.getState();

    const categoryName = action.category.name;

    this.patchState(ctx, {
      categoryInAction: categoryName,
      playedCategories: [...state.playedCategories, categoryName],
      roundStatus: TrickRoundStatus.Play,
      questionComplexityInAction: action.questionComplexity
    });

    this.store.dispatch(new GlobalActions.ChangeTeamInAction());
  }

  @Action(TrickActions.AnswerQuestion)
  answerQuestion(ctx: StateContext<ITrickState>, action: TrickActions.AnswerQuestion) {
    const state = ctx.getState();
    const isCorrectAnswer = action.answerStatus === AnswerStatus.Correct

    if (isCorrectAnswer) {
      const questionWeight = QUESTION_COMPLEXITY_WEIGHT.get(state.questionComplexityInAction as QuestionComplexity);

      this.store.dispatch(new GlobalActions.UpdateCurrentTeamScore(questionWeight as number));
    }

    this.audioService[isCorrectAnswer ? 'playCorrectBeatOff' : 'playIncorrectBeatOff']();

    this.nextLap(ctx);
  }

  @Selector()
  static getRoundStatus(state: ITrickState): TrickRoundStatus {
    return state.roundStatus;
  }

  @Selector()
  static getRoundCategories(state: ITrickState): ITrickCategory[] {
    return state.roundTask.categories.filter(cat => !state.playedCategories.includes(cat.name));
  }

  @Selector()
  static getQuestionInAction(state: ITrickState): ITrickCategoryQuestion {
    const category = state.roundTask.categories.find(c => c.name === state.categoryInAction);

    return category?.questions[state.questionComplexityInAction as QuestionComplexity] as ITrickCategoryQuestion;
  }

  @Selector()
  static getCategoryInAction(state: ITrickState): string {
    return state.categoryInAction as string;
  }

  private nextLap(ctx: StateContext<ITrickState>) {
    const state = ctx.getState();

    if (state.playedCategories.length === state.roundTask.categories.length) {
      this.store.dispatch(new GlobalActions.SetRound(RoundName.Comments));

      this.dropState(ctx)

      return;
    }

    this.patchState(ctx, {
      roundStatus: TrickRoundStatus.ChoosingQuestion,
      questionComplexityInAction: null,
      categoryInAction: null
    })
  }
}
