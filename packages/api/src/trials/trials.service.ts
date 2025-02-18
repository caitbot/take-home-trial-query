import { Trial } from './trial.types';
import trials from '../../../../trials.json';

class TrialsService {
    getOngoingTrials(sponsor?: string, country?: string): Trial[] {
        const allTrials = trials as Trial[];
        const today = new Date();

        return allTrials.filter(trial => {
            const isOngoing =
                new Date(trial.start_date) <= today &&
                new Date(trial.end_date) >= today &&
                !trial.canceled;


            const matchesSponsor = sponsor ? trial.sponsor.toLowerCase() === sponsor.toLowerCase() : true;
            const matchesCountry = country ? trial.country.toLowerCase() === country.toLowerCase() : true;

            return isOngoing && matchesSponsor && matchesCountry;
        });
    }
}

export default new TrialsService();