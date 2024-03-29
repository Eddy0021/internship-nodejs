import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from '../../src/services/public-holidays.service'; // Adjust the import path as needed
import axios from 'axios';

// Mocking axios get function
jest.mock('axios');

describe('getListOfPublicHolidays', () => {
  it('fetches public holidays for a given year and country', async () => {
    const year = 2024;
    const country = 'GB';
    const mockPublicHolidays = [
      { date: '2024-01-01', name: 'New Year' },
      { date: '2024-07-04', name: 'Independence Day' },
    ];

    // Mocking axios response
    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockPublicHolidays });

    const result = await getListOfPublicHolidays(year, country);

    expect(result).toEqual(expect.arrayContaining(mockPublicHolidays));
  });

  it('returns an empty array if there is an error fetching public holidays', async () => {
    const year = 2024;
    const country = 'GB';

    // Mocking axios error response
    jest.spyOn(axios, 'get').mockRejectedValue(new Error('Failed to fetch public holidays'));

    const result = await getListOfPublicHolidays(year, country);

    expect(result).toEqual([]);
  });

  //--

  it('returns true if today is a public holiday in the given country', async () => {
    const country = 'GB';
    
    // Mocking axios response
    jest.spyOn(axios, 'get').mockResolvedValue({ status: 200 });

    const result = await checkIfTodayIsPublicHoliday(country);

    expect(result).toBe(true);
  });

  it('returns false if today is not a public holiday in the given country', async () => {
    const country = 'GB';

    // Mocking axios response with a non-200 status
    jest.spyOn(axios, 'get').mockResolvedValue({ status: 404 });

    const result = await checkIfTodayIsPublicHoliday(country);

    expect(result).toBe(false);
  });

  it('returns false if there is an error checking if today is a public holiday', async () => {
    const country = 'GB';

    // Mocking axios error response
    jest.spyOn(axios, 'get').mockRejectedValue(new Error('Failed to check if today is a public holiday'));

    const result = await checkIfTodayIsPublicHoliday(country);

    expect(result).toBe(false);
  });
  
  //--

  it('fetches next public holidays for the given country', async () => {
    const country = 'GB';
    const mockPublicHolidays = [
      { date: '2024-05-01', name: 'Labor Day' },
      { date: '2024-07-04', name: 'Independence Day' },
    ];

    // Mocking axios response
    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockPublicHolidays });

    const result = await getNextPublicHolidays(country);

    expect(result).toEqual(expect.arrayContaining(mockPublicHolidays));
  });

  it('returns an empty array if there is an error fetching next public holidays', async () => {
    const country = 'GB';

    // Mocking axios error response
    jest.spyOn(axios, 'get').mockRejectedValue(new Error('Failed to fetch next public holidays'));

    const result = await getNextPublicHolidays(country);

    expect(result).toEqual([]);
  });

  afterEach(() => {
    // clear all mocks to make sure that they won't be passed to any tests out of this file
    jest.clearAllMocks();
  });
});
