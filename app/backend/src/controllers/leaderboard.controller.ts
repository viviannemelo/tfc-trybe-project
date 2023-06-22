import { Response, Request } from 'express';
import LeaderboardService from '../service/leaderboard.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService,
  ) { }

  async getAll(_req: Request, res: Response) {
    const allLeaderboard = await this.leaderboardService.getAll();
    return res.status(mapStatusHTTP(allLeaderboard.status)).json(allLeaderboard.data);
  }
}
