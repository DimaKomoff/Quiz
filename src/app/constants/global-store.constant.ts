import { RoundName, Team } from '../enums/global-state.enum';
import { IGlobalState } from '../interfaces/global-store.interface';

export const GLOBAL_STORE_CONSTANT = {
  localStorageKey: 'GLOBAL_STORE',
}

export const INITIAL_DEFAULT_GLOBAL_STATE: IGlobalState = {
  round: null,
  teams: {
    [Team.Team1]: {
      score: 0,
      name: undefined
    },
    [Team.Team2]: {
      score: 0,
      name: undefined
    }
  },
  teamInAction: null
}

export const ROUND_NAMES = new Map<RoundName, string>([
  [RoundName.Trick, 'Підстава'],
  [RoundName.Comments, 'Коментарі'],
  [RoundName.FifthTenth, '5/10'],
  [RoundName.Alias, 'Еліас']
]);
