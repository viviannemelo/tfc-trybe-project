import { Request, Response, Router } from 'express';
import LeaderboardModel from '../model/leaderboard.model';
import LeaderboardService from '../service/leaderboard.service';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardModel = new LeaderboardModel();
const leaderboardService = new LeaderboardService(leaderboardModel);
const leaderboardController = new LeaderboardController(leaderboardService);

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getAll(req, res),
);

export default leaderboardRouter;
