/*
import 'regenerator-runtime/runtime';
import { fetchByCountry, covidByCountries } from './htmlSelectors';
// import chart.js from chart.js;

// eslint-disable-next-line import/prefer-default-export
export const drawChart = async () => {
  let keys = [];
  let values = [];
  await fetchByCountry();
  keys = covidByCountries.data.map((elem) => elem.Date.slice(0, 10));
  values = covidByCountries.data.map((elem) => elem.Confirmed);
  // console.log(covidByCountries);
  console.log(keys);
  // console.log(values);
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: keys,
      datasets: [
        {
          label: 'Belarus',
          data: values,
          backgroundColor: 'red',
          borderColor: 'black',
        },
      ],
    },
    options: {},
  });
};
*/
