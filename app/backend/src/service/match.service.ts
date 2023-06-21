import Matches from '../database/models/MatchModel';
import Teams from '../database/models/TeamsModel';

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

export default {
  getAllTeams,
  getTeamByItemId,
  finishMatch,
};
