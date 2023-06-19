import { Request, Response } from 'express';
import TeamService from '../service/team.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAllTeams();
    res.status(200).json(serviceResponse.data);
  }

  public async getTeamsById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.teamService.getTeamsById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }
}

export default TeamController;
