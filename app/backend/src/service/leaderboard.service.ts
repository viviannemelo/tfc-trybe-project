import { LeaderboardParams, ILeaderboard } from '../Interfaces/leaderboard/ILeaderBoard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LeaderboardModel from '../model/leaderboard.model';
import { IMatch } from '../Interfaces/matches/IMatch';

export default class LeaderboardService {
  constructor(
    private leaderboardModel: LeaderboardModel,
  ) { }

  private static constructorLeaderboard(matches: LeaderboardParams[]) {
    const leaderboard: { [teamName: string]: ILeaderboard } = {};

    matches.forEach((match) => {
      const homeTeamName = match.homeTeam?.teamName;

      if (homeTeamName !== undefined && !leaderboard[homeTeamName]) {
        leaderboard[homeTeamName] = LeaderboardService.createLeaderboard(homeTeamName);
      }

      if (homeTeamName && leaderboard[homeTeamName]) {
        this.updateLeaderboardEntry(leaderboard[homeTeamName], match);
      }
    });

    return leaderboard;
  }

  private static updateLeaderboardEntry(data: ILeaderboard, match: LeaderboardParams) {
    const entryData = data;
    entryData.totalGames += 1;
    entryData.goalsFavor += match.homeTeamGoals;
    entryData.goalsOwn += match.awayTeamGoals;
    entryData.goalsBalance += match.homeTeamGoals - match.awayTeamGoals;

    if (LeaderboardService.isVictory(match)) {
      this.updateVictoryStatus(entryData);
    }

    if (LeaderboardService.isDraw(match)) {
      this.updateDrawStatus(entryData);
    }

    if (LeaderboardService.isLoss(match)) {
      entryData.totalLosses += 1;
    }
  }

  private static updateVictoryStatus(data: ILeaderboard) {
    const entryData = data;

    entryData.totalPoints += 3;
    entryData.totalVictories += 1;
  }

  private static updateDrawStatus(data: ILeaderboard) {
    const entryData = data;

    entryData.totalPoints += 1;
    entryData.totalDraws += 1;
  }

  private static isVictory(match: IMatch): boolean {
    return match.homeTeamGoals > match.awayTeamGoals;
  }

  private static isDraw(match: IMatch): boolean {
    return match.homeTeamGoals === match.awayTeamGoals;
  }

  private static isLoss(match: IMatch): boolean {
    return match.homeTeamGoals < match.awayTeamGoals;
  }

  private static createLeaderboard(name: string): ILeaderboard {
    return {
      name,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  }

  private static orderLeaderboard(data: ILeaderboard[]) {
    data.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;

      return 0;
    });
  }

  private static leaderboardEfficiency(data: ILeaderboard[]) {
    data.forEach((team) => {
      const entryData = team;
      entryData.efficiency = +((entryData.totalPoints / (entryData.totalGames * 3)) * 100)
        .toFixed(2);
    });
  }

  public async getAll(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allLeaderboard = await this.leaderboardModel.getAll() as LeaderboardParams[];

    const leaderboard = LeaderboardService.constructorLeaderboard(allLeaderboard);

    const arrayLeaderboard = Object.values(leaderboard);
    LeaderboardService.leaderboardEfficiency(arrayLeaderboard);
    LeaderboardService.orderLeaderboard(arrayLeaderboard);

    return {
      status: 'SUCCESSFUL',
      data: arrayLeaderboard,
    };
  }
}
