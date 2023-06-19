import { Request, Response } from 'express';
import UserService from '../service/user.service';

export default class UserController {
  constructor(private userService: UserService) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    try {
      const token = await this.userService.login(email, password);
      if (token) {
        return res.status(200).json({ token });
      }
      return res.status(400).json({ message: 'All fields must be filled' });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  }

  public async getRole(req: Request, res: Response) {
    const tokenValid = req.body.validToken;
    try {
      const role = await this.userService.getRole(tokenValid);
      return res.status(200).json({ role });
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
