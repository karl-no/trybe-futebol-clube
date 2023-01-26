import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRouter = Router();

leaderboardRouter.get('/', LeaderboardController.getAll);
leaderboardRouter.get('/home', LeaderboardController.getEverythingHome);
leaderboardRouter.get('/away', LeaderboardController.getEverythingAway);

export default leaderboardRouter;
