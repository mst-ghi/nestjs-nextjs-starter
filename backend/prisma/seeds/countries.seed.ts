import { Logger } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { catchLogger } from './utils';
import { readFileSync } from 'fs';
import { join } from 'path';

const data = JSON.parse(
  readFileSync(join(__dirname, 'json/countries.json'), 'utf-8'),
);

const CityDataSeeder = async (
  prisma: PrismaClient,
  city: Prisma.CityUncheckedCreateInput,
) => {
  try {
    let result = await prisma.city.findFirst({
      where: { province_id: city.province_id, name: city.name },
    });
    if (result) {
      result = await prisma.city.update({
        where: { id: result.id },
        data: city,
      });
      Logger.log(`Updated city with name: ${result.name}`, 'CityDataSeeder');
    } else {
      result = await prisma.city.create({
        data: city,
      });
      Logger.log(`Created city with name: ${result.name}`, 'CityDataSeeder');
    }
    return result;
  } catch (error) {
    catchLogger(error, city.name);
  }
};

const ProvinceDataSeeder = async (
  prisma: PrismaClient,
  province: Prisma.ProvinceUncheckedCreateInput,
) => {
  try {
    let result = await prisma.province.findFirst({
      where: { code: province.code },
    });
    if (result) {
      result = await prisma.province.update({
        where: { id: result.id },
        data: province,
      });
      Logger.log(
        `Updated province with name: ${result.name}`,
        'ProvinceDataSeeder',
      );
    } else {
      result = await prisma.province.create({
        data: province,
      });
      Logger.log(
        `Created province with name: ${result.name}`,
        'ProvinceDataSeeder',
      );
    }
    return result;
  } catch (error) {
    catchLogger(error, province.name);
  }
};

const CountryDataSeeder = async (prisma: PrismaClient) => {
  console.log('');

  for (let index = 0; index < data.length; index++) {
    const country = data[index];
    const countryData = {
      iso2: country.iso2,
      iso3: country.iso3,
      name: country.name,
      numeric_code: country.numeric_code,
      phone_code: country.phone_code,
      capital: country.capital,
      currency: country.currency,
      currency_name: country.currency_name,
      currency_symbol: country.currency_symbol,
      tld: country.tld,
      native: country.native,
      region: country.region,
      subregion: country.subregion,
      timezones: country.timezones,
      translations: country.translations,
      latitude: parseFloat(country.latitude),
      longitude: parseFloat(country.longitude),
      emoji: country.emoji,
      emojiU: country.emojiU,
    };

    try {
      let countryResult = await prisma.country.findFirst({
        where: { iso3: country.iso3 },
      });
      if (countryResult) {
        countryResult = await prisma.country.update({
          where: { iso3: country.iso3 },
          data: countryData,
        });
        Logger.log(
          `Updated country with name: ${countryResult.name}`,
          'CountryDataSeeder',
        );
      } else {
        countryResult = await prisma.country.create({
          data: countryData,
        });
        Logger.log(
          `Created country with name: ${countryResult.name}`,
          'CountryDataSeeder',
        );
      }

      if (country.states && country.states[0]) {
        for (let index = 0; index < country.states.length; index++) {
          const state = country.states[index];
          const stateData: Prisma.ProvinceUncheckedCreateInput = {
            country_id: countryResult.id,
            name: state.name,
            code: state.state_code,
            latitude: parseFloat(state.latitude),
            longitude: parseFloat(state.longitude),
          };
          const rawState = await ProvinceDataSeeder(prisma, stateData);

          if (rawState && state.cities && state.cities[0]) {
            for (let index = 0; index < state.cities.length; index++) {
              const city = state.cities[index];
              const cityData: Prisma.CityUncheckedCreateInput = {
                country_id: countryResult.id,
                province_id: rawState.id,
                name: city.name,
                latitude: parseFloat(city.latitude),
                longitude: parseFloat(city.longitude),
              };
              await CityDataSeeder(prisma, cityData);
            }
          }
        }
      }
    } catch (error) {
      catchLogger(error, country.name);
    }
  }
};

export default CountryDataSeeder;
