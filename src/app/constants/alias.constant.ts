import { ALIAS_TASK } from '../../questions';
import { IAliasState } from '../interfaces/alias.interface';

export const ALIAS_STORE_CONSTANT = {
  localStorageKey: 'ALIAS_STORE',
}

export const INITIAL_DEFAULT_ALIAS_STATE: IAliasState = {
  halfLapPlayedNumber: 0,
  tasks: ALIAS_TASK
};

export const ALIAS_WORD_COST = 1;

export const ALIAS_ROUND_LAPS_NUMBER = 2;
