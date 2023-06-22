import { LeaderboardParams } from './ILeaderBoard';

export default interface LbModelInterface {
  getAll(): Promise<LeaderboardParams[] | null>;
}
