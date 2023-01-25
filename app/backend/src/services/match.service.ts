import matchModel from '../database/models/match.model';
import teamModel from '../database/models/team.model';
import iMatch from '../interfaces/iMatch';

export default class MatchService {
  public getMatches = async (inProgres: string | undefined): Promise<matchModel[]> => {
    const matches = await matchModel.findAll({
      include: [
        { model: teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    const filterMatches = matches.filter((match) => inProgres === undefined
      || match.inProgress.toString() === inProgres);
    return filterMatches;
  };

  public finishMatch = async (id: number) => {
    await matchModel.update({ inProgress: false }, { where: { id } });
  };

  public updateMatch = async (id: number, match: iMatch) => {
    await matchModel.update({ ...match }, { where: { id } });
  };

  public saveMatch = async (match: iMatch) => {
    const newMatch = await matchModel.create({ ...match, inProgress: true });
    return newMatch;
  };
}
