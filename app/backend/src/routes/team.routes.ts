import { Router } from 'express';
import TeamController from '../controllers/team.controller';
import TeamService from '../services/team.service';

const teamService = new TeamService();
const teamController = new TeamController(teamService);

const teamRouter = Router();

teamRouter.get('/', teamController.getTeams);
teamRouter.get('/:id', teamController.getTeamById);

export default teamRouter;
