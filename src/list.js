import 'regenerator-runtime/runtime';
import {
  selectorObject,
  getByClassName,
  getById,
  fetchCovidValue,
  fetchCountries,
  countries,
  covidInfo,
  calculationPeople,
  table,
  drawChartCountry,
} from './htmlSelectors';

const display = getByClassName(selectorObject.classNames.display);
const countryPopulation = getByClassName(selectorObject.classNames.countryPopulation);
export const changerOption = getByClassName(selectorObject.classNames.changerOption);
const covidResult = getByClassName(selectorObject.classNames.covidResult);
const territory = getByClassName(selectorObject.classNames.territory);
const regexpSearchParam = new RegExp('Confirmed|Deaths|Recovered', '');
export const select = getById(selectorObject.id.select);
export const options = [...document.querySelectorAll('option')];
let selectedOptionPopulation = options[select.selectedIndex].value;

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
  if (covidInfo.isLoaded === false || countries.isLoaded === false) {
    await Promise.all([fetchCovidValue(), fetchCountries()]);
  }
  const covidCountries = covidInfo.data.Countries;
  if (!covidCountries) return;
  const resultArr = covidCountries.map((country) => {
    const countryFlag = Object.values(countries.data).find(
      (flagElem) => flagElem.alpha2Code === country.CountryCode,
    );
    return {
      ...country,
      ...countryFlag,
    };
  });
  resultArr.sort(sortArrByField(parameter));
  const ul = document.createElement('ul');
  ul.classList.add('countries');
  resultArr
    .filter((country) => country.Country.toLowerCase().includes(display.value.toLowerCase()))
    .forEach((country) => {
      const li = document.createElement('li');
      const countryName = document.createElement('h3');
      const countryInfo = document.createElement('div');
      const countryFlag = document.createElement('img');
      const countryValue = document.createElement('p');

      countryFlag.src = country.flag;
      countryFlag.classList.add('country-item__flag');
      li.classList.add('country-item');
      countryName.classList.add('country-item__name');
      countryInfo.classList.add('country-item__info');
      countryValue.classList.add('country-item__value');

      countryName.innerText = country.Country;
      if (check) {
        countryValue.innerText = Math.ceil(
          (country[parameter] * calculationPeople) / country.population,
        );
      } else {
        countryValue.innerText = country[parameter];
      }

      // при нажатии на страну в списке меняем содержание таблицы для этой страны
      li.addEventListener('click', () => {
        const displayedCountry = covidCountries.find(
          (city) => city.Country === li.children[1].textContent,
        );
        const { population } = countries.data.find(
          (city) => city.alpha2Code === country.CountryCode,
        );
        countryPopulation.textContent = population;
        territory.textContent = displayedCountry.Country;
        table(displayedCountry, population);
        drawChartCountry(displayedCountry.Country, param, byDay, check, population);
      });

      ul.appendChild(li);
      li.appendChild(countryInfo);
      li.appendChild(countryName);
      countryInfo.appendChild(countryFlag);
      countryInfo.appendChild(countryValue);
    });
  covidResult.appendChild(ul);
};

function changeParameter() {
  selectedOptionPopulation = options[select.selectedIndex].value;
  showList(selectedOptionPopulation, changerOption.checked);
}

select.addEventListener('change', changeParameter);

// поисковик в списке
display.addEventListener('input', (e) => {
  display.value = e.target.value;
  showList(selectedOptionPopulation, changerOption.checked);
});

changerOption.addEventListener('click', () => {
  changerOption.checked = !changerOption.checked;
  showList(selectedOptionPopulation, changerOption.checked);
});

