import 'regenerator-runtime/runtime';
import {
  selectorObject,
  getByClassName,
  fethcValueAllCountries,
  countriesValue,
  calculationPeople,
  table,
  drawChartCountry,
  countryPopulation,
  territory,
  display,
  select,
  options,
  selectedOptionPopulation,
  regexpSearchChartParameter,
} from './htmlSelectors';

export const changerOption = getByClassName(selectorObject.classNames.changerOption);
const covidResult = getByClassName(selectorObject.classNames.covidResult);

// сортировка массива в листе по убыванию в зависимости от выбранного показателя
function sortArrByField(field) {
  if (changerOption.checked) {
    return (a, b) => ((a[field] * calculationPeople) / a.population
      > (b[field] * calculationPeople) / b.population
      ? -1
      : 1);
  }
  return (a, b) => (a[field] > b[field] ? -1 : 1);
}

// функция для отображения списка стран
export const showList = async (parameter, check) => {
  covidResult.innerHTML = '';
  if (countriesValue.isLoaded === false) {
    await fethcValueAllCountries();
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
        table(country, country.population);
        drawChartCountry(country.country, chartParameter, byDay, check, country.population);
      });

      ul.appendChild(li);
      li.appendChild(countryInfo);
      li.appendChild(countryName);
      countryInfo.appendChild(countryFlag);
      countryInfo.appendChild(countryValue);
    });
  covidResult.appendChild(ul);
};

select.addEventListener('change', () => {
  covidResult.innerHTML = '';
  selectedOptionPopulation.value = options[select.selectedIndex].value;
  showList(selectedOptionPopulation.value, changerOption.checked);
});

// поисковик в списке
display.addEventListener('input', (e) => {
  display.value = e.target.value;
  showList(selectedOptionPopulation.value, changerOption.checked);
});

changerOption.addEventListener('click', () => {
  covidResult.innerHTML = '';
  changerOption.checked = !changerOption.checked;
  showList(selectedOptionPopulation.value, changerOption.checked);
});
