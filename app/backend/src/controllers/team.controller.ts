import { Request, Response } from 'express';
import HTTPCodes from '../utils/HTTPCodes';
import teamService from '../services/team.service';

export default class UserController {
  constructor(private userService: teamService) {}
  public getTeams = async (_req: Request, res: Response): Promise<void> => {
    const teams = await this.userService.getTeams();
    res.status(HTTPCodes.ok).json(teams);
  };

  public getTeamById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const team = await this.userService.getTeamById(Number(id));
    res.status(HTTPCodes.ok).json(team);
  };
}
