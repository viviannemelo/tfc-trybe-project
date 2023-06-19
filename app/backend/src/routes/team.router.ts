import { Request, Response, Router } from 'express';
import TeamsController from '../controllers/team.controller';

const teamController = new TeamsController();

const teamRouter = Router();

teamRouter.get('/', (req: Request, res: Response) => teamController.getAllTeams(req, res));
teamRouter.get('/:id', (req: Request, res: Response) => teamController.getTeamsById(req, res));

export default teamRouter;
