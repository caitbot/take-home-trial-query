/*   
An example of a trial object:
{
    "name": "Olaparib + Sapacitabine in BRCA Mutant Breast Cancer",
    "country": "FR",
    "start_date": "2019-01-01",
    "end_date": "2025-08-01",
    "sponsor": "Sanofi",
    "canceled": false,
    "study_type": "interventional",
    "primary_purpose": "treatment"
  } 
    */

export interface Trial {
    name: string;
    country: string;
    start_date: string;
    end_date: string;
    sponsor: string;
    canceled: boolean;
    study_type: string;
    primary_purpose: string;
}

export interface Country {
  code: string;
  name: string;
}