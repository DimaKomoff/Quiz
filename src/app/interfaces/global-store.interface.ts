import { RoundName, Team } from '../enums/global-state.enum';

export interface ITeam {
  name: string | undefined;
  score: number;
}

export type IGlobalState =  & {
  round: RoundName | null;
  teamInAction: Team | null;
  teams: {
    [key in Team]: ITeam
  }
};
