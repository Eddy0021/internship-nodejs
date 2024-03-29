import { validateInput, shortenPublicHoliday } from '../../src/helpers';
import { SUPPORTED_COUNTRIES } from '../../src/config';
import { PublicHoliday, PublicHolidayShort } from '../../src/types';

describe('validateInput', () => {
  it('throws an error if the provided country is not supported', () => {
    const invalidCountry = 'InvalidCountry';

    expect(() => {
      validateInput({ country: invalidCountry });
    }).toThrow(`Country provided is not supported, received: ${invalidCountry}`);
  });

  it('throws an error if the provided year is not the current year', () => {
    const invalidYear = 2020;

    expect(() => {
      validateInput({ year: invalidYear });
    }).toThrow(`Year provided not the current, received: ${invalidYear}`);
  });

  it('returns true if input is valid', () => {
    const validInput = { year: new Date().getFullYear(), country: SUPPORTED_COUNTRIES[0] };

    const result = validateInput(validInput);

    expect(result).toBe(true);
  });
});

describe('shortenPublicHoliday', () => {
  it('returns a shortened version of the public holiday', () => {
    const holiday: PublicHoliday = {
        name: 'Christmas Day',
        localName: 'Christmas Day',
        date: '2024-12-25',
        countryCode: 'NL',
        fixed: false,
        global: false,
        counties: null,
        launchYear: null,
        types: ["Public"]
    };

    const expectedShortenedHoliday: PublicHolidayShort = {
      name: 'Christmas Day',
      localName: 'Christmas Day',
      date: '2024-12-25',
    };

    const result = shortenPublicHoliday(holiday);

    expect(result).toEqual(expectedShortenedHoliday);
  });
});
