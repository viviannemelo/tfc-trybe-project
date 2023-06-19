import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/UsersModel';
import JWT from '../utils/JWT';

class UserService {
  constructor(
    private userModel = UserModel,
  ) {}

  public async login(email: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = JWT.sign({ userId: user.id });
    return token;
  }

  public async getRole(id: number): Promise<string> {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }
    return user.role;
  }
}

export default UserService;
