export const selectorObject = {
  classNames: {
    valueConfirmed: '.covid-value-confirmed',
    valueDeaths: '.covid-value-deaths',
    valueRecovered: '.covid-value-recovered',
    display: '.search-covid',
    covidResult: '.covid-results',
    changerDay: '.switch-day',
    changerPeople: '.switch-people',
    changerOption: '.switch-option',
    countryResult: '.results',
    territory: '.object',
    countryPopulation: '.population-value',
    boards: '.covid-data',
    chartContainer: '.chart-wrapper',
  },
  allClassNames: {
    parameters: '.parameter',
    buttonFull: '.full-display',
  },
  id: {
    select: 'covid-parameters',
  },
};

export function getByClassName(className) {
  return document.querySelector(className);
}

export function getAllByClassName(className) {
  return document.querySelectorAll(className);
}

export function getById(id) {
  return document.getElementById(id);
}

export const countriesValue = { data: null, isLoaded: false };
export const countriesChart = { data: null, isLoaded: false };
export const worldValue = { data: null, isLoaded: false };
export const worldValueByDay = { data: null, isLoaded: false };
export const covidCountries = [];
export const coordinates = { };
export const borderCoordinates = { };
export const calculationPeople = 100000; // по ТЗ из расчета на 100 тысяч населения
export const regexpSearchChartParameter = new RegExp('cases|deaths|recovered|Cases|Deaths|Recovered', '');
export const boards = [...getAllByClassName(selectorObject.classNames.boards)];
export const chartContainer = getByClassName(selectorObject.classNames.chartContainer);
export const select = getById(selectorObject.id.select);
export const options = [...document.querySelectorAll('option')];
export const selectedOptionPopulation = options[select.selectedIndex];
export const display = getByClassName(selectorObject.classNames.display);
export const territory = getByClassName(selectorObject.classNames.territory);
export const countryPopulation = getByClassName(selectorObject.classNames.countryPopulation);
export const changerDay = getByClassName(selectorObject.classNames.changerDay);
export const changerPeople = getByClassName(selectorObject.classNames.changerPeople);
export const covidResult = getByClassName(selectorObject.classNames.covidResult);
export const changerOption = getByClassName(selectorObject.classNames.changerOption);
export const valueConfirmed = getByClassName(selectorObject.classNames.valueConfirmed);
export const valueDeaths = getByClassName(selectorObject.classNames.valueDeaths);
export const valueRecovered = getByClassName(selectorObject.classNames.valueRecovered);
