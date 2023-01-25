import { Router } from 'express';
import MatchService from '../services/match.service';
import MatchController from '../controllers/match.controller';
import matchValidation from '../middlewares/matchValidation';
import { tokenValidation } from '../middlewares/loginValidation';

const matchService = new MatchService();

const matchController = new MatchController(matchService);

const matchRouter = Router();

matchRouter.get('/', matchController.getMatches);
matchRouter.post('/', tokenValidation, matchValidation, matchController.saveMatch);
matchRouter.patch('/:id/finish', matchController.finishMatch);
matchRouter.patch('/:id', matchController.updateMatch);

export default matchRouter;
