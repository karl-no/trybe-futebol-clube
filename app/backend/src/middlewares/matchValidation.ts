import { Request, Response, NextFunction } from 'express';
import HTTPCodes from '../utils/HTTPCodes';
import teamModel from '../database/models/team.model';

export default async (req: Request, res: Response, next: NextFunction) => {
  const match = req.body;

  if (match.homeTeamId === match.awayTeamId) {
    return res.status(HTTPCodes.unprocessableEntity)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const homeTeam = await teamModel.findByPk(match.homeTeamId);
  const awayTeam = await teamModel.findByPk(match.awayTeamId);

  if (!homeTeam || !awayTeam) {
    return res.status(HTTPCodes.notFound)
      .json({ message: 'There is no team with such id!' });
  }
  next();
};
