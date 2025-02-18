import { Router } from 'express';
import TrialsController from './trials.controller';

const router = Router();

router.get('/', TrialsController.getOngoingTrials);

export default router;