import { ALIAS_TASK } from '../../questions';
import { AliasLap, WordsList } from '../enums/alias.enum';
import { IAliasState } from '../interfaces/alias.interface';

export const ALIAS_STORE_CONSTANT = {
  localStorageKey: 'ALIAS_STORE',
}

export const INITIAL_DEFAULT_ALIAS_STATE: IAliasState = {
  currentLap: AliasLap.First,
  currentList: WordsList.First,
  tasks: ALIAS_TASK
};
