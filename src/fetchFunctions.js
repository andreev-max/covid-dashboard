import 'regenerator-runtime/runtime';
import {
  worldValue,
  worldValueByDay,
  countriesValue,
  coordinates,
  borderCoordinates,
  countriesChart,
} from './htmlSelectors';

export const fetchWorldValue = async () => {
  // для получения данных по всему миру на каждый день
  const res = await fetch('https://disease.sh/v3/covid-19/all');
  worldValue.data = await res.json();
  worldValue.isLoaded = true;
};

export const fetchWorldValueByDay = async () => {
  // для получения данных по всему миру на каждый день
  const res = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=366');
  worldValueByDay.data = await res.json();
  worldValueByDay.isLoaded = true;
};

export const fetchValueAllCountries = async () => {
  // для получения всех данных для каждой страны
  const res = await fetch('https://disease.sh/v3/covid-19/countries');
  const result = await res.json();
  countriesValue.data = result.filter((elem) => elem.population > 15
   && elem.cases > 15
   && elem.recovered > 15);
  countriesValue.isLoaded = true;
};

export const fetchChartCountry = async (country) => {
  // для получения данных на каждый день по любой стране
  const res = await fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=366`);
  countriesChart.data = await res.json();
  countriesChart.isLoaded = true;
};

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
