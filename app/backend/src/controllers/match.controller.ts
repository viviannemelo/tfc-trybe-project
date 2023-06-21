import { Request, Response } from 'express';
import MatchesService from '../service/match.service';

const getTeams = async (req: Request, res: Response) => {
  const { inProgress } = req.query;

  if (inProgress === 'true') {
    const find = await MatchesService.getTeamByItemId(true);
    return res.status(200).json(find);
  }
  if (inProgress === 'false') {
    const find = await MatchesService.getTeamByItemId(false);
    return res.status(200).json(find);
  }
  if (inProgress === undefined) {
    const all = await MatchesService.getAllTeams();
    return res.status(200).json(all);
  }
};

export default {
  getTeams,
};
