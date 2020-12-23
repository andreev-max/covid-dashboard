import 'regenerator-runtime/runtime';

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
    chartContainer: '.chart',
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
const countriesChart = { data: null, isLoaded: false };
export const worldValue = { data: null, isLoaded: false };
const worldValueByDay = { data: null, isLoaded: false };
export const covidCountries = [];
export const coordinates = { };
export const borderCoordinates = { };
export const calculationPeople = 100000; // по ТЗ из расчета на 100 тысяч населения
export const regexpSearchChartParameter = new RegExp('cases|deaths|recovered|Cases|Deaths|Recovered', '');
export const boards = [...getAllByClassName(selectorObject.classNames.boards)];
export const select = getById(selectorObject.id.select);
export const options = [...document.querySelectorAll('option')];
export const selectedOptionPopulation = options[select.selectedIndex];
export const display = getByClassName(selectorObject.classNames.display);
export const territory = getByClassName(selectorObject.classNames.territory);
export const countryPopulation = getByClassName(selectorObject.classNames.countryPopulation);
export const changerDay = getByClassName(selectorObject.classNames.changerDay);
export const changerPeople = getByClassName(selectorObject.classNames.changerPeople);
const valueConfirmed = getByClassName(selectorObject.classNames.valueConfirmed);
const valueDeaths = getByClassName(selectorObject.classNames.valueDeaths);
const valueRecovered = getByClassName(selectorObject.classNames.valueRecovered);
const chartContainer = getByClassName(selectorObject.classNames.chartContainer);

export const fetchWorldValueByDay = async () => {
  // для получения данных по всему миру на каждый день
  const res = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=366');
  worldValueByDay.data = await res.json();
  worldValueByDay.isLoaded = true;
};

export const fethcWorldValue = async () => {
  // для получения данных по всему миру на каждый день
  const res = await fetch('https://disease.sh/v3/covid-19/all');
  worldValue.data = await res.json();
  worldValue.isLoaded = true;
};

export const fethcValueAllCountries = async () => {
  // для получения всех данных для каждой страны
  const res = await fetch('https://disease.sh/v3/covid-19/countries');
  const result = await res.json();
  countriesValue.data = result.filter((elem) => elem.population > 15
  && elem.cases > 15
  && elem.recovered > 15);
  countriesValue.isLoaded = true;
};

export const drawChartCountry = async (country, parameter, byDay, check, pop) => {
  const chartConfigCountry = {
    type: 'bar',
    data: {
      labels: [],
      datasets: [
        {
          label: '',
          data: [],
          backgroundColor: 'red',
          borderColor: 'black',
        },
      ],
    },
    options: {},
  };
  console.log(chartConfigCountry.data.datasets[0].data.length);
  console.log(chartConfigCountry.data.labels.length);
  // chartConfigCountry.data.datasets[0].data.length = 0;
  // chartConfigCountry.data.labels.length = 0;
  // для получения данных на каждый день по любой стране
  const res = await fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=366`);
  countriesChart.data = await res.json();
  countriesChart.isLoaded = true;
  let resultData = [];
  const dates = Object.keys(countriesChart.data.timeline.cases);
  const values = Object.values(countriesChart.data.timeline[parameter]);
  let period = 'Total';
  let calc = '';
  if (byDay) period = 'by day';
  if (check) calc = '/ 100.000 people';
  if (byDay) {
    if (check) {
      const test = values.map((elem, i, arr) => {
        if (i === 0) {
          return elem;
        }
        const subtraction = elem - arr[i - 1];
        if (subtraction > 0) {
          return subtraction;
        }
        return 0;
      });
      resultData = test.map((elem) => (Math.ceil((elem * calculationPeople) / pop)));
    } else {
      resultData = values.map((elem, i, arr) => {
        if (i === 0) {
          return elem;
        }
        const subtraction = elem - arr[i - 1];
        if (subtraction > 0) {
          return subtraction;
        }
        return 0;
      });
    }
  } else if (check) {
    resultData = values.map((elem) => (Math.ceil((elem * calculationPeople) / pop)));
  } else {
    resultData = values;
  }
  chartConfigCountry.data.datasets[0].data = [...resultData];
  chartConfigCountry.data.labels = [...dates];
  chartConfigCountry.data.datasets[0].label = `${country}: ${period} ${parameter} ${calc}`;
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, chartConfigCountry);
};

export const drawChartWorld = async (parameter, day, people) => {
  const chartConfigWorld = {
    type: 'bar',
    data: {
      labels: [],
      datasets: [
        {
          label: '',
          data: [],
          backgroundColor: 'red',
          borderColor: 'black',
        },
      ],
    },
    options: {},
  };
  // chartConfigWorld.data.datasets[0].data = [];
  // chartConfigWorld.data.labels = [];
  await fetchWorldValueByDay();
  const dates = Object.keys(worldValueByDay.data.cases);
  const values = Object.values(worldValueByDay.data[parameter]);
  let resultData = [];
  let period = 'Total';
  let calc = '';
  if (day === true) period = 'by day';
  if (people === true) calc = '/ 100.000 people';
  if (day === true) {
    if (people === true) {
      const test = values.map((elem, i, arr) => {
        if (i === 0) {
          return elem;
        }
        const subtraction = elem - arr[i - 1];
        if (subtraction <= 0) {
          return 0;
        }
        return subtraction;
      });
      resultData = test.map((elem) => (Math.ceil((elem * calculationPeople)
      / countryPopulation.textContent)));
    } else {
      resultData = values.map((elem, i, arr) => {
        if (i === 0) {
          return elem;
        }
        const subtraction = elem - arr[i - 1];
        if (subtraction <= 0) {
          return 0;
        }
        return subtraction;
      });
    }
  } else if (people === true) {
    resultData = values.map((elem) => (Math.ceil((elem * calculationPeople)
    / countryPopulation.textContent)));
  } else {
    resultData = values;
  }
  chartConfigWorld.data.datasets[0].data = [...resultData];
  chartConfigWorld.data.labels = [...dates];
  chartConfigWorld.data.datasets[0].label = `World: ${period} ${parameter} ${calc}`;
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, chartConfigWorld);
};
drawChartWorld('cases', false, false);

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
}

// функция для отображения данных в таблице в  зависимости от страны
export function table(obj, countPeople) {
  if (!changerDay.checked && !changerPeople.checked) {
    valueConfirmed.textContent = `${obj.cases}`;
    valueDeaths.textContent = `${obj.deaths}`;
    valueRecovered.textContent = `${obj.recovered}`;
  } else if (changerDay.checked && !changerPeople.checked) {
    valueConfirmed.textContent = `${obj.todayCases}`;
    valueDeaths.textContent = `${obj.todayDeaths}`;
    valueRecovered.textContent = `${obj.todayRecovered}`;
  } else if (!changerDay.checked && changerPeople.checked) {
    valueConfirmed.textContent = `${Math.ceil(
      (obj.cases * calculationPeople) / countPeople,
    )}`;
    valueDeaths.textContent = `${Math.ceil(
      (obj.deaths * calculationPeople) / countPeople,
    )}`;
    valueRecovered.textContent = `${Math.ceil(
      (obj.recovered * calculationPeople) / countPeople,
    )}`;
  } else {
    valueConfirmed.textContent = `${Math.ceil(
      (obj.todayCases * calculationPeople) / countPeople,
    )}`;
    valueDeaths.textContent = `${Math.ceil(
      (obj.todayDeaths * calculationPeople) / countPeople,
    )}`;
    valueRecovered.textContent = `${Math.ceil(
      (obj.todayRecovered * calculationPeople) / countPeople,
    )}`;
  }
}

// апи для получения JSON объекта по долготе и широте
export const fetchCovidByCoordinates = async () => {
  const res = await fetch('https://corona.lmao.ninja/v2/countries');
  coordinates.key = await res.json();
};

// апи для получения JSON объекта для прорисовки границ

export const fetchDrawingBorders = async () => {
  const res = await fetch('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson');
  borderCoordinates.key = await res.json();
};
