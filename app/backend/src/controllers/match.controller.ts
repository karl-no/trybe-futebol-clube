import { Request, Response } from 'express';
import HTTPCodes from '../utils/HTTPCodes';
import matchService from '../services/match.service';

export default class MatchController {
  constructor(private matchesService: matchService) {}

  public getMatches = async (req: Request, res: Response): Promise<void> => {
    const { inProgress } = req.query;
    const matches = await this.matchesService.getMatches(inProgress as string | undefined);
    res.status(HTTPCodes.ok).json(matches);
  };

  public createMatch = async (_req: Request, res: Response) => {
    const matches = {};
    return res.status(HTTPCodes.ok).json(matches);
  };
}
