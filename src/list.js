import 'regenerator-runtime/runtime';
import {
  countriesValue,
  calculationPeople,
  countryPopulation,
  territory,
  display,
  regexpSearchChartParameter,
  covidResult,
} from './htmlSelectors';

import {
  fetchValueAllCountries,
} from './fetchFunctions';

import {
  table,
  sortArrByField,
} from './functions';

import drawChart from './chart';

// функция для отображения списка стран
export default async function showList(parameter, check) {
  console.log({ parameter });
  console.log({ check });
  covidResult.innerHTML = '';
  if (countriesValue.isLoaded === false) {
    await fetchValueAllCountries();
  }
  if (!countriesValue.data) return;
  countriesValue.data.sort(sortArrByField(parameter));
  const ul = document.createElement('ul');
  ul.classList.add('countries');
  countriesValue.data
    .filter((country) => country.country.toLowerCase().includes(display.value.toLowerCase()))
    .forEach((country) => {
      const li = document.createElement('li');
      const countryName = document.createElement('h3');
      const countryInfo = document.createElement('div');
      const countryFlag = document.createElement('img');
      const countryValue = document.createElement('p');

      countryFlag.src = country.countryInfo.flag;
      countryFlag.classList.add('country-item__flag');
      li.classList.add('country-item');
      countryName.classList.add('country-item__name');
      countryInfo.classList.add('country-item__info');
      countryValue.classList.add('country-item__value');

      countryName.innerText = country.country;
      if (check) {
        countryValue.innerText = Math.ceil(
          (country[parameter] * calculationPeople) / country.population,
        );
      } else {
        countryValue.innerText = country[parameter];
      }

      // при нажатии на страну в списке меняем содержание таблицы для этой страны
      li.addEventListener('click', () => {
        countryPopulation.textContent = country.population;
        territory.textContent = country.country;
        let byDay = false;
        if (parameter.includes('today')) byDay = true;
        const chartParameter = parameter.match(regexpSearchChartParameter)[0].toLowerCase();
        const population = Number(country.population);
        table(country, country.population);
        drawChart(country.country, chartParameter, byDay, check, population);
      });
      ul.appendChild(li);
      li.appendChild(countryInfo);
      li.appendChild(countryName);
      countryInfo.appendChild(countryFlag);
      countryInfo.appendChild(countryValue);
    });
  covidResult.appendChild(ul);
}
