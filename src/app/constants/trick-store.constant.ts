import { TRICK_ROUND_TASK } from '../../questions';
import { TrickRoundStatus } from '../enums/trick-state.enum';
import { ITrickState } from '../interfaces/trick.interface';

export const TRICK_STORE_CONSTANT = {
  localStorageKey: 'TRICK_STORE',
}

export const INITIAL_DEFAULT_TRICK_STATE: ITrickState = {
  categoryInAction: null,
  playedCategories: [],
  roundStatus: TrickRoundStatus.ChoosingQuestion,
  questionComplexityInAction: null,
  roundTask: TRICK_ROUND_TASK
}
