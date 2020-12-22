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
  },
  allClassNames: {
    parameters: '.parameter',
    buttonFull: '.full-display',
  },
  id: {
    select: 'covid-parameters',
  },
};

export const allPeopleWorld = 7827000000; // население планеты из википедии
export const calculationPeople = 100000; // по ТЗ из расчета на 100 тысяч населения

export function getByClassName(className) {
  return document.querySelector(className);
}

export function getAllByClassName(className) {
  return document.querySelectorAll(className);
}

export function getById(id) {
  return document.getElementById(id);
}

export const error = null;
export const searchCovid = '';
export const countries = { data: null, isLoaded: false };
export const covidInfo = { data: null, isLoaded: false };
export const covidByCountries = { data: null, isLoaded: false };
const covidByWorld = { data: null, isLoaded: false };
const totalValue = { data: null, isLoaded: false };
export const covidCountries = [];
export const coordinates = { };
export const borderCoordinates = { };
const changerDay = getByClassName(selectorObject.classNames.changerDay);
const changerPeople = getByClassName(selectorObject.classNames.changerPeople);
const valueConfirmed = getByClassName(selectorObject.classNames.valueConfirmed);
const valueDeaths = getByClassName(selectorObject.classNames.valueDeaths);
const valueRecovered = getByClassName(selectorObject.classNames.valueRecovered);

// апишка для получения JSON объекта по ковидным значениям
export const fetchCovidValue = async () => {
  const res = await fetch('https://api.covid19api.com/summary');
  covidInfo.data = await res.json();
  covidInfo.isLoaded = true;
};

// апишка для получения флагов и населения
export const fetchCountries = async () => {
  const res = await fetch(
    'https://restcountries.eu/rest/v2/all?fields=alpha2Code;population;flag',
  );
  countries.data = await res.json();
  countries.isLoaded = true;
};
/*
const fetchTotal = async () => {
  const res = await fetch('https://api.covid19api.com/all');
  totalValue.data = await res.json();
  totalValue.isLoaded = true;
  console.log(totalValue.data);
};
fetchTotal();
*/
export const drawChartCountry = async (country, parameter, byDay, check, pop) => {
  const res = await fetch(`https://api.covid19api.com/total/country/${country}`);
  covidByCountries.data = await res.json();
  let result = [];
  const keys = covidByCountries.data.map((elem) => elem.Date.slice(0, 10));
  const values = covidByCountries.data.map((elem) => elem[parameter]);
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
        return elem - arr[i - 1];
      });
      console.log(test[test.length - 1]);
      result = test.map((elem) => (Math.ceil((elem * 100000) / pop)));
      console.log(result[result.length - 1]);
    } else {
      result = values.map((elem, i, arr) => {
        if (i === 0) {
          return elem;
        }
        return elem - arr[i - 1];
      });

      console.log(result[result.length - 1]);
    }
  } else if (check) {
    console.log(result[result.length - 1]);
    result = values.map((elem) => (Math.ceil((elem * 100000) / pop)));

    console.log(result[result.length - 1]);
  } else {
    result = values;

    console.log(result[result.length - 1]);
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: keys,
      datasets: [
        {
          label: `${country}, ${period} ${parameter} ${calc}`,
          data: result,
          backgroundColor: 'red',
          borderColor: 'black',
        },
      ],
    },
    options: {},
  });
};

const drawChartWorld = async () => {
  const res = await fetch('https://covid19-api.org/api/timeline');
  covidByWorld.data = await res.json();
  console.log(covidByWorld.data);
  const keys = covidByWorld.data.map((elem) => elem.last_update.slice(0, 10)).reverse();
  const values = covidByWorld.data.map((elem) => elem.total_cases).reverse();
  console.log(keys);
  console.log(values);
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: keys,
      datasets: [
        {
          label: 'World',
          data: values,
          backgroundColor: 'red',
          borderColor: 'black',
        },
      ],
    },
    options: {},
  });
};
drawChartWorld();

// функция для отображения данных в таблице в  зависимости от страны
export function table(obj, countPeople) {
  if (!changerDay.checked && !changerPeople.checked) {
    valueConfirmed.textContent = `${obj.TotalConfirmed}`;
    valueDeaths.textContent = `${obj.TotalDeaths}`;
    valueRecovered.textContent = `${obj.TotalRecovered}`;
  } else if (changerDay.checked && !changerPeople.checked) {
    valueConfirmed.textContent = `${obj.NewConfirmed}`;
    valueDeaths.textContent = `${obj.NewDeaths}`;
    valueRecovered.textContent = `${obj.NewRecovered}`;
  } else if (!changerDay.checked && changerPeople.checked) {
    valueConfirmed.textContent = `${Math.ceil(
      (obj.TotalConfirmed * calculationPeople) / countPeople,
    )}`; // делаю не Math.round потому что если отображать данные для страны
    valueDeaths.textContent = `${Math.ceil(
      (obj.TotalDeaths * calculationPeople) / countPeople,
    )}`; // за последний день и на 100 тысяч населения то будет ноль
    valueRecovered.textContent = `${Math.ceil(
      (obj.TotalRecovered * calculationPeople) / countPeople,
    )}`; // как-то некорректно)) поэтому пусть лучше будет 1
  } else {
    valueConfirmed.textContent = `${Math.ceil(
      (obj.NewConfirmed * calculationPeople) / countPeople,
    )}`;
    valueDeaths.textContent = `${Math.ceil(
      (obj.NewDeaths * calculationPeople) / countPeople,
    )}`;
    valueRecovered.textContent = `${Math.ceil(
      (obj.NewRecovered * calculationPeople) / countPeople,
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
