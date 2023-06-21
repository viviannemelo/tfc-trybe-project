import { Router } from 'express';
import teamsRouter from './team.router';
import userRouter from './user.router';
import matchRouter from './match.router';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);

export default router;
