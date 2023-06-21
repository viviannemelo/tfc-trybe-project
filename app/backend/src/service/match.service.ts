import Matches from '../database/models/MatchModel';
import Teams from '../database/models/TeamsModel';
import { IMatch } from '../Interfaces/matches/IMatch';

const getAllTeams = async () => {
  const getAll = await Matches.findAll({
    include: [
      { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ] });
  return getAll;
};

const getTeamByItemId = async (inProgress: boolean) => {
  const getTeam = await Matches.findAll({
    where: { inProgress },
    include: [
      { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ] });
  return getTeam;
};

const finishMatch = async (id: number) => {
  const finishedMatch = await Matches.findByPk(id);
  if (!finishedMatch) {
    throw new Error('Match not found');
  }
  finishedMatch.inProgress = false;
  await finishedMatch.save();
  return finishedMatch;
};

const updateMatch = async (id: number, home: number, away: number) => {
  const match = await Matches.update(
    { homeTeamGoals: home, awayTeamGoals: away },
    { where: { id } },
  );
  return match;
};

const createMatch = async (data: IMatch) => {
  const { homeTeamId, awayTeamId } = data;
  const homeTeamExists = await Teams.findOne({ where: { id: homeTeamId } });
  const awayTeamExists = await Teams.findOne({ where: { id: awayTeamId } });

  if (!homeTeamExists || !awayTeamExists) {
    return { code: 404, result: { message: 'There is no team with such id!' },
    };
  }
  if (homeTeamId === awayTeamId) {
    return { code: 401,
      result: { message: 'It is not possible to create a match with two equal teams' },
    };
  }
  const match = await Matches.create({ ...data, inProgress: true });
  return { code: 201, result: match };
};

export default {
  getAllTeams,
  getTeamByItemId,
  finishMatch,
  updateMatch,
  createMatch,
};
