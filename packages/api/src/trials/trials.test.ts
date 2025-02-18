import request from 'supertest';
import app from '../app';
import { Trial } from './trial.types';

describe('GET /api/trials', () => {
  it('should filter trials by sponsor', async () => {
    const response = await request(app).get('/api/trials?sponsor=Sanofi');
    expect(response.status).toBe(200);
    expect(response.body.every((trial: Trial) => trial.sponsor.includes('Sanofi'))).toBeTruthy();
    expect(response.body.length).toBe(2);
  });

  it('should filter trials by country', async () => {
    const response = await request(app).get('/api/trials?country=FR');
    expect(response.status).toBe(200);
    expect(response.body.every((trial: Trial) => trial.country.toUpperCase() === 'FR')).toBeTruthy();
    expect(response.body.length).toBe(2);
  });

  it('should return trials matching sponsor and country', async () => {
    const response = await request(app).get('/api/trials?sponsor=AstraZeneca&country=it');
    expect(response.body.every((trial: Trial) => trial.country === 'IT' && trial.sponsor === "AstraZeneca")).toBeTruthy();
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it('should not return trials which are canceled', async () => {
    const response = await request(app).get('/api/trials?sponsor=Sanofi&country=ES');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should return 400 if both sponsor and country are missing', async () => {
    const response = await request(app).get('/api/trials');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should return an empty array if no trials match the filters', async () => {
    const response = await request(app).get('/api/trials?sponsor=NotRealSponsor');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});