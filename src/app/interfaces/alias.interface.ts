import { AliasLap, WordsList } from '../enums/alias.enum';
import { Team } from '../enums/global-state.enum';

export interface IAliasWord {
  text: string;
  isPlayed: boolean;
}

export type AliasWords = [
  IAliasWord,
  IAliasWord,
  IAliasWord,
  IAliasWord,
  IAliasWord,
  IAliasWord,
  IAliasWord,
  IAliasWord,
  IAliasWord,
  IAliasWord,
  IAliasWord,
  IAliasWord,
  IAliasWord,
  IAliasWord,
  IAliasWord,
];

export type AliasTeamTask = {
  [key in WordsList]: AliasWords;
}

export type AliasTasks = {
  [key in Team]: AliasTeamTask;
}

export interface IAliasState {
  currentLap: AliasLap;
  currentList: WordsList;
  tasks: AliasTasks;
}
