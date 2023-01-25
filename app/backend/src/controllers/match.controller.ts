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

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchesService.finishMatch(Number(id));
    return res.status(HTTPCodes.ok).json({ message: 'Finished' });
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const match = req.body;
    await this.matchesService.updateMatch(Number(id), match);
    return res.status(HTTPCodes.ok).json({ message: 'Updated' });
  };

  public saveMatch = async (req: Request, res: Response) => {
    const credentials = req.body;
    const newMatch = await this.matchesService.saveMatch(credentials);
    return res.status(HTTPCodes.created).json(newMatch);
  };
}
