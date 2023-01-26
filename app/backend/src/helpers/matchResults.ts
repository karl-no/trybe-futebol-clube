import matchModel from '../database/models/match.model';

const homeSum = (acc: number, curr: matchModel): number => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
  if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
  return acc;
};

const homeVictories = (acc: number, curr: matchModel): number => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
  return acc;
};

const draws = (acc: number, curr: matchModel): number => {
  if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
  return acc;
};

const homeLosses = (acc: number, curr: matchModel): number => {
  if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
  return acc;
};

const homeGoalsFavor = (acc: number, curr: matchModel): number => acc + curr.homeTeamGoals;

const homeGoalsOwn = (acc: number, curr: matchModel): number => acc + curr.awayTeamGoals;

const awaySum = (acc: number, curr: matchModel): number => {
  if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 3;
  if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
  return acc;
};

const awayVictories = (acc: number, curr: matchModel): number => {
  if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
  return acc;
};

const awayLosses = (acc: number, curr: matchModel): number => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
  return acc;
};

const awayGoalsFavor = (acc: number, curr: matchModel): number => acc + curr.awayTeamGoals;

const awayGoalsOwn = (acc: number, curr: matchModel): number => acc + curr.homeTeamGoals;

export {
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
};
