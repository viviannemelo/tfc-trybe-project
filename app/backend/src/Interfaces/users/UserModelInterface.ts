import IUsers from './IUsers';

export interface UserModelInterface {
  create(data: Partial<IUsers>): Promise<IUsers>,
}
