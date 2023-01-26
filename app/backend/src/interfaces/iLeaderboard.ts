export interface iBoard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number;
  goalsOwn: number;
}

export interface iLeaderboard extends iBoard {
  goalsBalance: number;
  efficiency: string;
}
