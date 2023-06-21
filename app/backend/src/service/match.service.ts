import MatcheModel from '../database/models/MatchModel';
import Teams from '../database/models/TeamsModel';

const getAllTeams = async () => {
  const getAll = await MatcheModel.findAll({
    include: [
      { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ] });
  return getAll;
};

const getTeamByItemId = async (inProgress: boolean) => {
  const getTeam = await MatcheModel.findAll({
    where: { inProgress },
    include: [
      { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ] });
  return getTeam;
};

export default {
  getAllTeams,
  getTeamByItemId,
};
