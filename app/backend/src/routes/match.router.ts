import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import validateToken from '../middleware/validateToken';

const matchRouter = Router();

matchRouter.get('/', MatchController.getTeams);
matchRouter.patch('/:id/finish', validateToken, MatchController.finishMatch);

export default matchRouter;
