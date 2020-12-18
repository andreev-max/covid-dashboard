import 'regenerator-runtime/runtime';
import {
  selectorObject,
  getByClassName,
  allPeopleWorld,
  fetchCovidValue,
  covidInfo,
  table,
} from './htmlSelectors';

const changerDay = getByClassName(selectorObject.classNames.changerDay);
const changerPeople = getByClassName(selectorObject.classNames.changerPeople);
// eslint-disable-next-line import/prefer-default-export
const territory = getByClassName(selectorObject.classNames.territory);
const countryPopulation = getByClassName(selectorObject.classNames.countryPopulation);

// функция для показа значений для всего мира изначально при запуске страницы
const showTable = async () => {
  if (covidInfo.isLoaded === false) await fetchCovidValue();
  const displayedCountry = territory.textContent;
  const population = countryPopulation.textContent;
  const globalValues = covidInfo.data.Global;
  if (displayedCountry === 'Global') {
    table(globalValues, allPeopleWorld);
  } else {
    const covidCountries = covidInfo.data.Countries;
    const countryFromList = covidCountries.find(
      (city) => city.Country === displayedCountry,
    );

    table(countryFromList, population);
  }
};

// toggle.checked ? за последний день : за всё время
changerDay.addEventListener('click', () => {
  showTable();
});

// на 100.000 тысяч людей или на всё население страны
changerPeople.addEventListener('click', () => {
  showTable();
});

showTable();
