import { Request, Response } from 'express';
import TrialsService from './trials.service';

class TrialsController {
    static getOngoingTrials(req: Request, res: Response) {
        const { sponsor, country } = req.query;

        if (!sponsor && !country) {
            return res.status(400).json({
                error: 'You must provide either a sponsor or a country query parameter'
            });
        }

        const trials = TrialsService.getOngoingTrials(
            sponsor as string | undefined,
            country as string | undefined
        );

        return res.json(trials);
    }
}

export default TrialsController;