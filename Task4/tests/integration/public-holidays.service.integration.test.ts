import {
    getListOfPublicHolidays,
    checkIfTodayIsPublicHoliday,
    getNextPublicHolidays,
  } from '../../src/services/public-holidays.service';
  
  describe('Public Holiday API Integration Tests', () => {
    it('should return list of public holidays for a given year and country', async () => {
      const year = 2024;
      const country = 'GB';
  
      const publicHolidays = await getListOfPublicHolidays(year, country);
  
      expect(publicHolidays.length).toBeGreaterThan(0);
      expect(publicHolidays[0]).toHaveProperty('date');
      expect(publicHolidays[0]).toHaveProperty('name');
    });
  
    it('should return true if today is a public holiday in the given country', async () => {
      const country = 'GB';
  
      const isTodayPublicHoliday = await checkIfTodayIsPublicHoliday(country);
  
      expect(typeof isTodayPublicHoliday).toBe('boolean');
    });
  
    it('should return list of next public holidays for the given country', async () => {
      const country = 'GB';
  
      const nextPublicHolidays = await getNextPublicHolidays(country);
  
      expect(nextPublicHolidays.length).toBeGreaterThan(0);
      expect(nextPublicHolidays[0]).toHaveProperty('date');
      expect(nextPublicHolidays[0]).toHaveProperty('name');
    });
  });
  