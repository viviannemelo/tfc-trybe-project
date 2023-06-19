import ITeams from './ITeams';

export default interface TeamsModelInterface {
  // getAllTeams(): Promise<ITeams[]>,
  // getTeamsById(id: ITeams['id']): Promise<ITeams | null>
  findAll(): Promise<ITeams[]>,
  findById(id: ITeams['id']): Promise<ITeams | null>
}
