import { RoundName, Team } from '../enums/global-state.enum';

export interface ITeam {
  name: string | undefined;
  score: number;
}

export type IGlobalState = {
  [key in Team]: ITeam
} & {
  round: RoundName;
};
