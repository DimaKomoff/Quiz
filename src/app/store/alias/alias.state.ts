import { Injectable } from '@angular/core';
import { State, StateToken } from '@ngxs/store';
import { ALIAS_STORE_CONSTANT, INITIAL_DEFAULT_ALIAS_STATE } from '../../constants/alias.constant';
import { IAliasState } from '../../interfaces/alias.interface';
import { StateBase } from '../state.base';

const ALIAS_STATE_TOKEN = new StateToken<IAliasState>('ALIAS_STATE_TOKEN');

@State<IAliasState>({
  name: ALIAS_STATE_TOKEN,
  defaults: INITIAL_DEFAULT_ALIAS_STATE
})
@Injectable()
export class AliasState extends StateBase {
  readonly localStorageKey: string = ALIAS_STORE_CONSTANT.localStorageKey;
}
