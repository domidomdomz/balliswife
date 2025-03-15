import { Router } from 'express';
import { getAllGames } from './GameController';
import { liveScores } from './LiveScoreController';

const router = Router();

router.get('/games', getAllGames);
router.get('/live-scores', liveScores);

export default router;