import { iLeaderboard } from '../interfaces/iLeaderboard';

export default (team: iLeaderboard[]): iLeaderboard[] => team.sort((a, b) => {
  if (b.totalPoints - a.totalPoints !== 0) {
    return b.totalPoints - a.totalPoints;
  }
  if (b.totalVictories - a.totalVictories !== 0) {
    return b.totalVictories - a.totalVictories;
  }
  if (b.goalsBalance - a.goalsBalance !== 0) {
    return b.goalsBalance - a.goalsBalance;
  }
  return b.goalsFavor - a.goalsFavor;
});
