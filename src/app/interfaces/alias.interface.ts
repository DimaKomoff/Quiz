import { Team } from '../enums/global-state.enum';

export interface IAliasWord {
  text: string;
  isPlayed: boolean;
}

export type AliasWords = IAliasWord[];

export type AliasTasks = {
  [key in Team]: AliasWords[];
}

export interface IAliasState {
  halfLapPlayedNumber: number;
  tasks: AliasTasks;
}
