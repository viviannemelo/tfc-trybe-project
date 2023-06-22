import Matches from '../database/models/MatchModel';
import Teams from '../database/models/TeamsModel';
import { LeaderboardParams } from '../Interfaces/leaderboard/ILeaderBoard';
import LbModelInterface from '../Interfaces/leaderboard/LbModelInterface';

export default class leaderBoardModel implements LbModelInterface {
  private model = Matches;

  async getAll(): Promise<LeaderboardParams[] | null> {
    const homeTeam = await this.model.findAll(
      { where: { inProgress: false },
        include: [
          {
            model: Teams,
            as: 'homeTeam',
            attributes: { exclude: ['id'] },
          },
          {
            model: Teams,
            as: 'awayTeam',
            attributes: { exclude: ['id'] },
          },
        ],
      },
    );

    if (!homeTeam) return null;

    return homeTeam;
  }
}
