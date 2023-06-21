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

const finishMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const finishedMatch = await MatchesService.finishMatch(+id);

  if (finishedMatch) {
    return res.status(200).json({ message: 'Finished' });
  }
};

const updateMatch = async (req: Request, res: Response) => {
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const { id } = req.params;
  const att = await MatchesService.updateMatch(+id, homeTeamGoals, awayTeamGoals);

  if (att) {
    return res.status(200).json({ message: 'Match updated' });
  }
};

const createMatch = async (req: Request, res: Response) => {
  const { code, result } = await MatchesService.createMatch(req.body);
  return res.status(code).json(result);
};

export default {
  getTeams,
  finishMatch,
  updateMatch,
  createMatch,
};
