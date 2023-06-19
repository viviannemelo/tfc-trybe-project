import { Router } from 'express';
import teamsRouter from './team.router';

const router = Router();

router.use('/teams', teamsRouter);

export default router;
