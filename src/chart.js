import 'regenerator-runtime/runtime';
import {
  calculationPeople,
  countryPopulation,
  countriesChart,
  worldValueByDay,
} from './htmlSelectors';
import {
  fetchWorldValueByDay,
  fetchChartCountry,
} from './fetchFunctions';

export const drawChartCountry = async (country, parameter, byDay, check, pop) => {
  await fetchChartCountry(country);
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
  chart.update();
};

export default async function drawChart(country, parameter, byDay, check, pop) {
  console.log(country);
  console.log(parameter);
  console.log(byDay);
  console.log(check);
  console.log(pop);
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
  const chartConfig = {
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
  console.log({ resultData });
  console.log({ dates });
  chartConfig.data.datasets[0].data = [...resultData];
  chartConfig.data.labels = [...dates];
  chartConfig.data.datasets[0].label = `${country}: ${period} ${parameter} ${calc}`;
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, chartConfig);
}
