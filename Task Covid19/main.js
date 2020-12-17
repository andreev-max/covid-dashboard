const valueConfirmed = document.querySelector('.covid-value-confirmed'),
   valueDeaths = document.querySelector('.covid-value-deaths'),
   valueRecovered = document.querySelector('.covid-value-recovered'),
   searchInput = document.querySelector('.search'),
   display = document.querySelector('.search-covid'),
   covidResult = document.querySelector('.covid-results'),
   changerDay = document.querySelector('.switch'),
   changerPeople = document.querySelector('.switch2'),
   results = document.querySelector('.results'),   
   territory = document.querySelector('.object'), // страна для которой отображаются данные в таблице
   countryPopulation = document.querySelector('.population-value'), //население страны ИЗ СПИСКА для которой отображаются данные в таблице   
   parameters = [...document.querySelectorAll('.parameter')],
   allPeople = 7827000000, // население планеты из википедии
   calculationPeople = 100000; // по ТЗ из расчета на 100 тысяч населения




const countrySelect = countryForm.parameters;
const selectedOption = countrySelect.options[countrySelect.selectedIndex].value;

countrySelect.addEventListener("change", changeParameter);


function changeParameter() {
   const selectedOption = countrySelect.options[countrySelect.selectedIndex].value;
   showList(selectedOption)
   console.log(selectedOption)
}

   



//toggle.checked ? за последний день : за всё время
changerDay.addEventListener('click', () => {
   showTable();
})

//toggle.checked ? из расчета на 100.000 тысяч людей планеты/страны : из расчета на всё население планеты/ выбранной страны
changerPeople.addEventListener('click', () => {
   showTable();
})

let searchCovid = '',
   countries,  // результат апишки откуда берем флаг и население страны плюс там есть alpha2Code для сравнения стран из другого элемента
   covid,   // JSON объект который приходит с covid19api в нем два объекта: один глобальные значение 6 штук для всего мира и второй это массив 192 стран
   covidCountries,  // массив из 192 объектов(стран) внутри которых 6 ковидных значений и есть CountryCode который равен alpha2Code
   population, // переменная которая равна населению отображаемой страны (для расчётов)
   globalValues, // из JSON объекта объект с глобальными значениями
   displayedCountry;  // страна которую отображаем в таблице


//сортировка массива в листе по убыванию в зависимости от выбранного показателя
function sortArrByField(field) {
   return (a, b) => a[field] > b[field] ? -1 : 1;
}

// функция для красивого отображения чисел (расставляет запятые через каждые три цифры(как в калькуляторах))
function numberWithCommas(x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// апишка для получения JSON объекта по ковидным значениям
const fetchData = async () => {
   return covid = await fetch('https://api.covid19api.com/summary').then(res => res.json());
}

// апишка для получения флагов
const fetchCountries = async () => {
   return countries = await fetch('https://restcountries.eu/rest/v2/all?fields=alpha2Code;population;flag').then(res => res.json());
}

// функция для показа значений для всего мира изначально при запуске страницы
const showTable = async () => {
   await fetchData().then(function (covid) {
      displayedCountry = territory.textContent;
      covidCountries = covid["Countries"];
      globalValues = covid['Global'];
      population = countryPopulation.textContent;
      if (displayedCountry === 'Global') {
         table(globalValues, allPeople)
      } else {
         const countryFromList = covidCountries.find(city => city.Country === displayedCountry);
         table(countryFromList, population)
      }
   });
};

// функция для отображения данных в таблице в  зависимости от страны
function table(obj, countPeople) {
   if (!changerDay.checked && !changerPeople.checked) {
      valueConfirmed.textContent = `${obj.TotalConfirmed}`;
      valueDeaths.textContent = `${obj.TotalDeaths}`;
      valueRecovered.textContent = `${obj.TotalRecovered}`;
   } else if (changerDay.checked && !changerPeople.checked) {
      valueConfirmed.textContent = `${obj.NewConfirmed}`;
      valueDeaths.textContent = `${obj.NewDeaths}`;
      valueRecovered.textContent = `${obj.NewRecovered}`;
   } else if (!changerDay.checked && changerPeople.checked) {
      valueConfirmed.textContent = `${(Math.ceil(obj.TotalConfirmed * calculationPeople / countPeople))}`;   // делаю не Math.round потому что если отображать данные для страны
      valueDeaths.textContent = `${(Math.ceil(obj.TotalDeaths * calculationPeople / countPeople))}`;        // за последний день и на 100 тысяч населения то будет ноль
      valueRecovered.textContent = `${(Math.ceil(obj.TotalRecovered * calculationPeople / countPeople))}`;  // как-то некорректно)) поэтому пусть лучше будет 1
   } else {
      valueConfirmed.textContent = `${(Math.ceil(obj.NewConfirmed * calculationPeople / countPeople))}`;
      valueDeaths.textContent = `${(Math.ceil(obj.NewDeaths * calculationPeople / countPeople))}`;
      valueRecovered.textContent = `${(Math.ceil(obj.NewRecovered * calculationPeople / countPeople))}`;
   }
}

// функция для отображения списка стран
const showList = async (parameter) => {
   covidResult.innerHTML = '';
   await fetchData();
   await fetchCountries();
   covidCountries = covid["Countries"];
   const resultArr = covidCountries.map((country) => {
      const countryFlag = Object.values(countries).find((flagElem) => flagElem.alpha2Code === country.CountryCode);
      return ({
         ...country,
         ...countryFlag
      })
   })
   
   resultArr.sort(sortArrByField(parameter));

   const ul = document.createElement("ul");
   ul.classList.add('countries');

   resultArr
      .filter(country => country.Country.toLowerCase().includes(searchCovid.toLowerCase()))
      .forEach(country => {

         const li = document.createElement('li'),
            countryFlag = document.createElement('img'),
            countryName = document.createElement('h3'),
            countryValue = document.createElement('p');

         countryFlag.src = country.flag;
         countryFlag.classList.add('country-item__flag');
         li.classList.add('country-item');
         countryName.classList.add('country-item__name');
         countryValue.classList.add('country-item__value');


         countryName.innerText = country.Country;
         countryValue.innerText = country[parameter];

         // при нажатии на страну в списке меняем содержание таблицы для этой страны
         li.addEventListener('click', () => {
            displayedCountry = covidCountries.find(city => city.Country === li.children[1].textContent);
            population = countries.find(city => city.alpha2Code === country.CountryCode).population;
            countryPopulation.textContent = population;
            territory.textContent = displayedCountry.Country;
            table(displayedCountry, population)
         });


         ul.appendChild(li);
         li.appendChild(countryFlag);
         li.appendChild(countryName);
         li.appendChild(countryValue);

      })
   covidResult.appendChild(ul);
}


showList(selectedOption);
showTable();


// поисковик в списке чтобы при вводе данных показывались только те страны что соответствуют содержимому строки в поисковике
display.addEventListener('input', (e) => {
   searchCovid = e.target.value;
   showList(selectedOption);
})