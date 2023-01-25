import { Router } from 'express';
import MatchService from '../services/match.service';
import MatchController from '../controllers/match.controller';

const matchService = new MatchService();

const matchController = new MatchController(matchService);

const matchRouter = Router();

matchRouter.get('/', matchController.getMatches);

export default matchRouter;
