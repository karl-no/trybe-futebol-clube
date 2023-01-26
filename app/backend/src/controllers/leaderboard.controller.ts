import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import sort from '../helpers/sort';
import HTTPCodes from '../utils/HTTPCodes';

export default class LeaderboardController {
  static async getEverythingHome(_req: Request, res: Response): Promise<Response> {
    const result = await LeaderboardService.getEverythingHome();
    const ordered = sort(result);

    return res.status(HTTPCodes.ok).json(ordered);
  }

  static async getEverythingAway(_req: Request, res: Response): Promise<Response> {
    const result = await LeaderboardService.getEverythingAway();
    const ordered = sort(result);

    return res.status(HTTPCodes.ok).json(ordered);
  }

  static async getAll(_req: Request, res: Response): Promise<Response> {
    const result = await LeaderboardService.getAll();
    const ordered = sort(result);

    return res.status(HTTPCodes.ok).json(ordered);
  }
}
