import iTeam from '../interfaces/iTeam';
import teamModel from '../database/models/team.model';

export default class Teams {
  public getTeams = async (): Promise<iTeam[]> => {
    const teams = await teamModel.findAll();
    return teams;
  };

  public getTeamById = async (id: number): Promise<iTeam> => {
    const team = await teamModel.findByPk(id);
    return team as iTeam;
  };
}
