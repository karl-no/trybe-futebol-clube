import matchModel from '../database/models/match.model';
import teamModel from '../database/models/team.model';

export default class MatchService {
  public getMatches = async (inProgres?: string): Promise<matchModel[]> => {
    const matches = await matchModel.findAll({
      include: [
        { model: teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (inProgres === undefined) return matches;
    return matches.filter((match) => match.inProgress.toString() === inProgres);
  };

  public getMatch = async (id: number) => {
    const match = await matchModel.findByPk(id);
    return match;
  };
}
