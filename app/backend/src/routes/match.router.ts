import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import validateToken from '../middleware/validateToken';

const matchRouter = Router();

matchRouter.get('/', MatchController.getTeams);
matchRouter.post('/', validateToken, MatchController.createMatch);
matchRouter.patch('/:id/finish', validateToken, MatchController.finishMatch);
matchRouter.patch('/:id', validateToken, MatchController.updateMatch);

export default matchRouter;
