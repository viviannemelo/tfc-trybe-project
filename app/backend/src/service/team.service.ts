import ITeams from '../Interfaces/teams/ITeams';
import TeamsModelInterface from '../Interfaces/teams/TeamsModelInterface';
import TeamsModel from '../model/team.model';
// import TeamsModel from '../database/models/TeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

class TeamService {
  constructor(
    private teamsModel: TeamsModelInterface = new TeamsModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamsById(id: number): Promise<ServiceResponse<ITeams | null>> {
    const team = await this.teamsModel.findById(id);
    if (!team) {
      return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    }
    return { status: 'SUCCESSFUL', data: team };
  }
}

export default TeamService;
