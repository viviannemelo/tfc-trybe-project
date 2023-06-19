import UsersModel from '../database/models/UsersModel';
import IUsers from '../Interfaces/users/IUsers';
import { UserModelInterface } from '../Interfaces/users/UserModelInterface';
import { NewEntity } from '../Interfaces';

export default class BookModel implements UserModelInterface {
  private model = UsersModel;

  async create(data: NewEntity<IUsers>): Promise<IUsers> {
    const dbData = await this.model.create(data);

    const { id, username, role, email, password }: IUsers = dbData;
    return { id, username, role, email, password };
  }
}
