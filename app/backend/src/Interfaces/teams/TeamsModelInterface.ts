import ITeams from './ITeams';

export default interface TeamsModelInterface {
  findAll(): Promise<ITeams[]>,
  findById(id: ITeams['id']): Promise<ITeams | null>
}
