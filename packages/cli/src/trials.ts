import { Trial, Country } from "./trial.types";
import countries from '../../../countries.json';

export async function fetchTrials(countryCode: string) {
    try {
        if (!countryCode) {
            throw new Error("Country code is required");
        }

        const response = await fetch(`http://localhost:8080/api/trials?country=${countryCode}`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const countryName = countries.find((country: Country) => country.code === countryCode.toUpperCase())?.name;
        const trials: Trial[] = await response.json();
        return trials.map(trial => `${trial.name}, ${countryName}`);
    } catch (error) {
        throw new Error(`Failed to fetch trials: ${(error as Error).message}`);
    }
}