/* eslint-disable no-use-before-define */
import 'regenerator-runtime/runtime';
import Chart from 'chart.js';

import {
  calculationPeople,
  countriesChart,
  worldValueByDay,
  chartContainer,
} from './htmlSelectors';
import {
  fetchWorldValueByDay,
  fetchChartCountry,
} from './fetchFunctions';

export default async function drawChart(country, parameter, byDay, check, pop) {
  let resultData = [];
  let dates = [];
  let values = [];
  if (country === 'World') {
    await fetchWorldValueByDay();
    dates = Object.keys(worldValueByDay.data.cases);
    values = Object.values(worldValueByDay.data[parameter]);
  } else {
    await fetchChartCountry(country);
    dates = Object.keys(countriesChart.data.timeline.cases);
    values = Object.values(countriesChart.data.timeline[parameter]);
  }
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
  while (chartContainer.firstChild) {
    chartContainer.removeChild(chartContainer.firstChild);
  }
  chartContainer.innerHTML = '<canvas id="myChart" class="chart"></canvas>';
  const ctx = document.getElementById('myChart').getContext('2d');
  Chart.defaults.global.defaultFontColor = 'wheat';
  const chartCovid = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [...dates],
      datasets: [
        {
          label: `${country}: ${period} ${parameter} ${calc}`,
          data: [...resultData],
          backgroundColor: 'red',
          borderColor: 'black',
        },
      ],
    },
    options: {
      legend: {
        labels: {
          fontColor: 'wheat',
        },
      },
    },
  });
}
