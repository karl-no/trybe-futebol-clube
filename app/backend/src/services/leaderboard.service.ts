import matchModel from '../database/models/match.model';
import teamModel from '../database/models/team.model';
import {
  homeSum,
  homeVictories,
  draws,
  homeLosses,
  homeGoalsFavor,
  homeGoalsOwn,
  awaySum,
  awayVictories,
  awayLosses,
  awayGoalsFavor,
  awayGoalsOwn,
} from '../helpers/matchResults';
import { iBoard, iLeaderboard } from '../interfaces/iLeaderboard';

export default class LeaderboardService {
  static async getMatchByTeamHome(id: number): Promise<matchModel[]> {
    const matches = await matchModel.findAll({
      where: { homeTeamId: id, inProgress: false },
      include: [
        { model: teamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: teamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  static async getInfoTeamHome(): Promise<matchModel[][]> {
    const teams = await teamModel.findAll();
    const promises = teams.map((team) => LeaderboardService.getMatchByTeamHome(team.id));
    const matches = await Promise.all(promises);
    return matches;
  }

  static async getEverythingHome(): Promise<iLeaderboard[]> {
    const teams = await teamModel.findAll();
    const data = await LeaderboardService.getInfoTeamHome();
    const newInfo = data.map((team, index) => ({
      name: teams[index].teamName,
      totalPoints: team.reduce(homeSum, 0),
      totalGames: team.length,
      totalVictories: team.reduce(homeVictories, 0),
      totalDraws: team.reduce(draws, 0),
      totalLosses: team.reduce(homeLosses, 0),
      goalsFavor: team.reduce(homeGoalsFavor, 0),
      goalsOwn: team.reduce(homeGoalsOwn, 0),
      goalsBalance: team.reduce(homeGoalsFavor, 0) - team.reduce(homeGoalsOwn, 0),
      efficiency: ((team.reduce(homeSum, 0) / (team.length * 3)) * 100).toFixed(2),
    }));
    return newInfo;
  }

  static async getMatchByTeamAway(id: number): Promise<matchModel[]> {
    const matches = await matchModel.findAll({
      where: { awayTeamId: id, inProgress: false },
      include: [
        { model: teamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: teamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  static async getInfoTeamAway(): Promise<matchModel[][]> {
    const teams = await teamModel.findAll();
    const promises = teams.map((team) => LeaderboardService.getMatchByTeamAway(team.id));
    const matches = await Promise.all(promises);
    return matches;
  }

  static async getEverythingAway(): Promise<iLeaderboard[]> {
    const teams = await teamModel.findAll();
    const data = await LeaderboardService.getInfoTeamAway();
    const newInfo = data.map((team, index) => ({
      name: teams[index].teamName,
      totalPoints: team.reduce(awaySum, 0),
      totalGames: team.length,
      totalVictories: team.reduce(awayVictories, 0),
      totalDraws: team.reduce(draws, 0),
      totalLosses: team.reduce(awayLosses, 0),
      goalsFavor: team.reduce(awayGoalsFavor, 0),
      goalsOwn: team.reduce(awayGoalsOwn, 0),
      goalsBalance: team.reduce(awayGoalsFavor, 0) - team.reduce(awayGoalsOwn, 0),
      efficiency: ((team.reduce(awaySum, 0) / (team.length * 3)) * 100).toFixed(2),
    }));
    return newInfo;
  }

  static async sumAll(): Promise<iBoard[]> {
    const home = await LeaderboardService.getEverythingHome();
    const away = await LeaderboardService.getEverythingAway();
    const totals = home.map((team, index) => ({
      name: team.name,
      totalPoints: team.totalPoints + away[index].totalPoints,
      totalGames: team.totalGames + away[index].totalGames,
      totalVictories: team.totalVictories + away[index].totalVictories,
      totalDraws: team.totalDraws + away[index].totalDraws,
      totalLosses: team.totalLosses + away[index].totalLosses,
      goalsFavor: team.goalsFavor + away[index].goalsFavor,
      goalsOwn: team.goalsOwn + away[index].goalsOwn,
    }));
    return totals;
  }

  static async getAll(): Promise<iLeaderboard[]> {
    const data = await LeaderboardService.sumAll();
    return data.map((team) => ({
      ...team,
      goalsBalance: team.goalsFavor - team.goalsOwn,
      efficiency: ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2),
    }));
  }
}
