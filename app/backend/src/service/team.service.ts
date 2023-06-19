import ITeams from '../Interfaces/teams/ITeams';
// import TeamsModelInterface from '../Interfaces/teams/TeamsModelInterface';
import TeamsModel from '../database/models/TeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

class TeamService {
  constructor(private _teamsModel = TeamsModel) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this._teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamsById(id: number): Promise<ServiceResponse<ITeams | null>> {
    const team = await this._teamsModel.findOne({ where: { id } });
    if (!team) {
      return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    }
    return { status: 'SUCCESSFUL', data: team };
  }
}

export default TeamService;
