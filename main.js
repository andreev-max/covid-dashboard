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
   buttonFull = [...document.querySelectorAll('.full-display')],
   
   allPeople = 7827000000, // население планеты из википедии
   calculationPeople = 100000; // по ТЗ из расчета на 100 тысяч населения


   

const regexp = /[a-zA-Z]/g;
let countrySelect = countryForm.parameters;
let selectedOption = countrySelect.options[countrySelect.selectedIndex].innerHTML.match(regexp).join('');
let selectedOptionPopulation = countrySelect.options[countrySelect.selectedIndex].value;
countrySelect.addEventListener("change", changeParameter);


function changeParameter() {
   selectedOption = countrySelect.options[countrySelect.selectedIndex].innerHTML.match(regexp).join('');
   selectedOptionPopulation = countrySelect.options[countrySelect.selectedIndex].value;
   showList(selectedOption, selectedOptionPopulation)
}





//toggle.checked ? за последний день : за всё время
changerDay.addEventListener('click', () => {
   showTable();
})

//toggle.checked ? из расчета на 100.000 тысяч людей планеты/страны : из расчета на всё население планеты/ выбранной страны
changerPeople.addEventListener('click', () => {
   showTable();
})

let error = null;
let searchCovid = '';
let countries = {data: null, isLoaded: false}; // результат апишки откуда берем флаг и население страны плюс там есть alpha2Code для сравнения стран из другого элемента
let covidInfo = {data: null, isLoaded: false}; // JSON объект который приходит с covid19api в нем два объекта: один глобальные значение 6 штук для всего мира и второй это массив 192 стран
let covidCountries = []; // массив из 192 объектов(стран) внутри которых 6 ковидных значений и есть CountryCode который равен alpha2Code
let population; // переменная которая равна населению отображаемой страны (для расчётов)
let globalValues; // из JSON объекта объект с глобальными значениями
let displayedCountry; // страна которую отображаем в таблице


//сортировка массива в листе по убыванию в зависимости от выбранного показателя
function sortArrByField(field) {
   if (selectedOptionPopulation === '100') {
      return (a, b) => (a[field] * calculationPeople / a.population) > (b[field] * calculationPeople / b.population) ? -1 : 1;
   } else {
      return (a, b) => a[field] > b[field] ? -1 : 1;
   }
   
}

// функция для красивого отображения чисел (расставляет запятые через каждые три цифры(как в калькуляторах))
function numberWithCommas(x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// апишка для получения JSON объекта по ковидным значениям
const fetchCovidValue = async () => {
   try {
   const res = await fetch('https://api.covid19api.com/summary');
   covidInfo.data = await res.json();
   covidCountries = covidInfo.data.Countries;
   globalValues = covidInfo.data.Global;
   covidInfo.isLoaded = true;
   } catch(e) {
      error = e;
   }
}

// апишка для получения флагов
const fetchCountries = async () => {
   try {
      const res = await fetch('https://restcountries.eu/rest/v2/all?fields=alpha2Code;population;flag');
      countries.data = await res.json();
      countries.isLoaded = true;
      } catch(e) {
         error = e;
      }
}

// функция для показа значений для всего мира изначально при запуске страницы
const showTable = async () => {
   if (covidInfo.isLoaded === false) await fetchCovidValue();
   displayedCountry = territory.textContent;
   population = countryPopulation.textContent;
   if (displayedCountry === 'Global') {
      table(globalValues, allPeople)
   } else {
      const countryFromList = covidCountries.find(city => city.Country === displayedCountry);
      table(countryFromList, population)
   }
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
      valueConfirmed.textContent = `${(Math.ceil(obj.TotalConfirmed * calculationPeople / countPeople))}`; // делаю не Math.round потому что если отображать данные для страны
      valueDeaths.textContent = `${(Math.ceil(obj.TotalDeaths * calculationPeople / countPeople))}`; // за последний день и на 100 тысяч населения то будет ноль
      valueRecovered.textContent = `${(Math.ceil(obj.TotalRecovered * calculationPeople / countPeople))}`; // как-то некорректно)) поэтому пусть лучше будет 1
   } else {
      valueConfirmed.textContent = `${(Math.ceil(obj.NewConfirmed * calculationPeople / countPeople))}`;
      valueDeaths.textContent = `${(Math.ceil(obj.NewDeaths * calculationPeople / countPeople))}`;
      valueRecovered.textContent = `${(Math.ceil(obj.NewRecovered * calculationPeople / countPeople))}`;
   }
}

// функция для отображения списка стран
const showList = async (parameter, pop) => {
   covidResult.innerHTML = '';

   if (covidInfo.isLoaded === false || countries.isLoaded === false) await Promise.all([fetchCovidValue(), fetchCountries()]);

   const resultArr = covidCountries.map((country) => {
      const countryFlag = Object.values(countries.data).find((flagElem) => flagElem.alpha2Code === country.CountryCode);
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
            countryName = document.createElement('h3'),
            countryInfo = document.createElement('div'),
            countryFlag = document.createElement('img'),
            countryValue = document.createElement('p');

         countryFlag.src = country.flag;
         countryFlag.classList.add('country-item__flag');
         li.classList.add('country-item');
         countryName.classList.add('country-item__name');
         countryInfo.classList.add('country-item__info');
         countryValue.classList.add('country-item__value');

         
         


         countryName.innerText = country.Country;
         if (pop === '100') {
            
            countryValue.innerText = Math.ceil(country[parameter] * calculationPeople / country.population);
            
         } else {
            countryValue.innerText = country[parameter];
         }
         

         // при нажатии на страну в списке меняем содержание таблицы для этой страны
         li.addEventListener('click', () => {
            displayedCountry = covidCountries.find(city => city.Country === li.children[1].textContent);
            population = countries.data.find(city => city.alpha2Code === country.CountryCode).population;
            countryPopulation.textContent = population;
            territory.textContent = displayedCountry.Country;
            table(displayedCountry, population)
         });


         ul.appendChild(li);
         li.appendChild(countryInfo);
         li.appendChild(countryName);
         countryInfo.appendChild(countryFlag);
         countryInfo.appendChild(countryValue);

      })
   covidResult.appendChild(ul);
}


showList(selectedOption, selectedOptionPopulation);
showTable();


// поисковик в списке чтобы при вводе данных показывались только те страны что соответствуют содержимому строки в поисковике
display.addEventListener('input', (e) => {
   searchCovid = e.target.value;
   showList(selectedOption, selectedOptionPopulation);
})

var ctx = document.getElementById('myChart').getContext('2d');

console.log(ctx)


var chart = new Chart(ctx, {
   type: 'line',
   data: {
       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
       datasets: [{
           label: 'My first dataset',
           data: [12, 19, 3, 5, 2, 3],
           backgroundColor: [
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(153, 102, 255, 0.2)',
               'rgba(255, 159, 64, 0.2)'
           ],
           borderColor: [
               'rgba(255, 99, 132, 1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
               'rgba(153, 102, 255, 1)',
               'rgba(255, 159, 64, 1)'
           ],
           borderWidth: 1
       }]
   },
   options: {}
});


// END OF THE CODE nAzdAc