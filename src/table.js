import 'regenerator-runtime/runtime';

import {
  worldValue,
  countriesValue,
  countryPopulation,
  territory,
} from './htmlSelectors';

import {
  fetchWorldValue,
  fetchValueAllCountries,
} from './fetchFunctions';

import {
  table,
} from './functions';

// функция для показа значений для всего мира изначально при запуске страницы
export default async function showTable() {
  if (worldValue.isLoaded === false || countriesValue.isLoaded === false) {
    await Promise.all([fetchWorldValue(), fetchValueAllCountries()]);
  }
  if (territory.textContent === 'World') {
    countryPopulation.textContent = worldValue.data.population;
    table(worldValue.data, worldValue.data.population);
  } else {
    const countryFromList = countriesValue.data.find(
      (city) => city.country === territory.textContent,
    );
    table(countryFromList, countryPopulation.textContent);
  }
}
