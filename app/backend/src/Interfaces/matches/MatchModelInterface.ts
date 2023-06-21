import { IMatch } from './IMatch';

export interface MatchModelInterface {
  getAllTeams(): Promise<IMatch[]>;
  getTeamByItemId(id: number): Promise<IMatch | null>;
}
