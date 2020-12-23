import 'regenerator-runtime/runtime';
import {
  selectorObject,
  getAllByClassName,
  boards,
  fethcWorldValue,
  fethcValueAllCountries,
  worldValue,
  countriesValue,
  table,
  changerDay,
  changerPeople,
  countryPopulation,
  territory,
  regexpSearchChartParameter,
  drawChartWorld,
  drawChartCountry,
} from './htmlSelectors';


// функция для показа значений для всего мира изначально при запуске страницы
const showTable = async () => {
  if (worldValue.isLoaded === false || countriesValue.isLoaded === false) {
    await Promise.all([fethcWorldValue(), fethcValueAllCountries()]);
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
};

showTable();

// toggle.checked ? за последний день : за всё время
changerDay.addEventListener('click', () => {
  showTable();
});

// на 100.000 тысяч людей или на всё население страны
changerPeople.addEventListener('click', () => {
  showTable();
});

for (let i = 0; i < boards.length; i += 1) {
  const board = boards[i];
  board.addEventListener('click', () => {
    const parameterForChart = board.children[0].innerHTML
      .match(regexpSearchChartParameter)[0].toLowerCase();
    if (territory.textContent === 'World') {
      drawChartWorld(parameterForChart, changerDay.checked, changerPeople.checked);
    } else {
      drawChartCountry(territory.textContent, parameterForChart,
        changerDay.checked, changerPeople.checked, countryPopulation.textContent);
    }
  });
};
drawChartWorld('cases', false, false);
