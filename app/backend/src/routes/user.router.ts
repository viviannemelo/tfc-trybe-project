import { Request, Response, Router } from 'express';
import UserController from '../controllers/user.controller';
import UserService from '../service/user.service';
import validationLogin from '../middleware/validateLogin';
import validationToken from '../middleware/validateToken';

const user = new UserService();

const userController = new UserController(user);

const userRouter = Router();

userRouter.post(
  '/',
  validationLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

userRouter.get(
  '/role',
  validationToken,
  (req: Request, res: Response) => userController.getRole(req, res),
);

export default userRouter;
