import { FIFTH_TENTH_TASK } from '../../questions';
import { IFifthTenthState } from '../interfaces/fifth-tenth.interface';

export const FIFTH_TENTH_STORE_CONSTANT = {
  localStorageKey: 'FIFTH_TENTH_STATE',
}

export const INITIAL_DEFAULT_FIFTH_TENTH_STATE: IFifthTenthState = {
  roundTask: FIFTH_TENTH_TASK
};
