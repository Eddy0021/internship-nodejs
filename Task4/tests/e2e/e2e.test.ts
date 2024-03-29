const request = require('supertest');

const PUBLIC_HOLIDAYS_API_URL = 'https://date.nager.at';

describe('API Endpoints', () => {
  it('GET /api/v3/CountryInfo/{countryCode}', async () => {
    const res = await request(PUBLIC_HOLIDAYS_API_URL)
      .get('/api/v3/CountryInfo/GB')
      .expect(200);

    expect(res.body).toHaveProperty('commonName', 'United Kingdom');
    expect(res.body).toHaveProperty('officialName', 'United Kingdom of Great Britain and Northern Ireland');
    expect(res.body).toHaveProperty('countryCode', 'GB');
    expect(res.body).toHaveProperty('region', 'Europe');
    expect(res.body).toHaveProperty('borders');
  });

  it('GET /api/v3/AvailableCountries', async () => {
    const res = await request(PUBLIC_HOLIDAYS_API_URL)
      .get('/api/v3/AvailableCountries')
      .expect(200);

    expect(res.body.length).toBeGreaterThan(2); 
    expect(res.body[0]).toHaveProperty('countryCode');
    expect(res.body[0]).toHaveProperty('name');
  });
});
