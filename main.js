const valueConfirmed = document.querySelector('.covid-value-confirmed'),
   valueDeaths = document.querySelector('.covid-value-deaths'),
   valueRecovered = document.querySelector('.covid-value-recovered'),
   searchInput = document.querySelector('.search'),
   searchCovidCountry = document.querySelector('.search-covid'),
   covidResult = document.querySelector('.covid-results'),
   changerDay = document.querySelector('.switch'),
   changerPeople = document.querySelector('.switch2'),
   results = document.querySelector('.results');


changerDay.addEventListener('click', () => {
   showTable();
})

changerPeople.addEventListener('click', () => {
   showTable();
})

let searchTerm = '',
   searchCovid = '',
   countries,
   globalValues,
   covidCountries;

function sortArrByField(field) {
   return (a, b) => a[field] > b[field] ? -1 : 1;
}

function numberWithCommas(x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const fetchData = async () => {
   countries = await fetch('https://restcountries.eu/rest/v2/all?fields=alpha2Code;population;flag').then(res => res.json());
   globalValues = await fetch('https://api.covid19api.com/summary').then(res => res.json());
}


const showTable = async () => {
   await fetchData().then(function(globalValues) {
      console.log(globalValues)
   });
   console.log(globalValues)
   if (!changerDay.checked && !changerPeople.checked) {
      valueConfirmed.textContent = `${globalValues.Global.TotalConfirmed}`;
      valueDeaths.textContent = `${globalValues.Global.TotalDeaths}`;
      valueRecovered.textContent = `${globalValues.Global.TotalRecovered}`;
   } else if (changerDay.checked && !changerPeople.checked) {
      valueConfirmed.textContent = `${globalValues.Global.NewConfirmed}`;
      valueDeaths.textContent = `${globalValues.Global.NewDeaths}`;
      valueRecovered.textContent = `${globalValues.Global.NewRecovered}`;
   } else if (!changerDay.checked && changerPeople.checked) {
      valueConfirmed.textContent = `${(Math.round(globalValues.Global.TotalConfirmed * 100000 / 7827000000))}`;
      valueDeaths.textContent = `${(Math.round(globalValues.Global.TotalDeaths * 100000 / 7827000000))}`;
      valueRecovered.textContent = `${(Math.round(globalValues.Global.TotalRecovered * 100000 / 7827000000))}`;
   } else {
      valueConfirmed.textContent = `${(Math.round(globalValues.Global.NewConfirmed * 100000 / 7827000000))}`;
      valueDeaths.textContent = `${(Math.round(globalValues.Global.NewDeaths * 100000 / 7827000000))}`;
      valueRecovered.textContent = `${(Math.round(globalValues.Global.NewRecovered * 100000 / 7827000000))}`;
   }
}

/*
7 827 000 000 население планеты === 69 582 029 общее количество заболеваний
100 000 на сто тысяч людей====  x количество заболеваний
*/


const showList = async () => {
   covidResult.innerHTML = '';
   await fetchData();

   covidCountries = globalValues["Countries"];

   const resultArr = covidCountries.map((country) => {
      const countryFlag = Object.values(countries).find((flagElem) => flagElem.alpha2Code === country.CountryCode);
      return ({
         ...country,
         ...countryFlag
      })
   })
   resultArr.sort(sortArrByField('TotalConfirmed'));

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


         li.addEventListener('click', () => {
            console.log(li)
         })

         countryName.innerText = country.Country;
         countryValue.innerText = country.TotalConfirmed;

         ul.appendChild(li);
         li.appendChild(countryFlag);
         li.appendChild(countryName);
         li.appendChild(countryValue);

      })
   covidResult.appendChild(ul);
}


showList();
showTable();

searchCovidCountry.addEventListener('input', (e) => {
   searchCovid = e.target.value;
   showList();
})




/*



const showCountries = async () => {
   results.innerHTML = '';

   //getting the data
   await fetchCountries();
   //creating structure
   const ul = document.createElement("ul");
   ul.classList.add('countries');
   countries
      .filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .forEach(country => {
         const li = document.createElement('li'),
            countryFlag = document.createElement('img'),
            countryName = document.createElement('h3'),
            countryInfo = document.createElement('div'),
            countryPopulation = document.createElement('h2'),
            countryPopulationText = document.createElement('h5');

         li.classList.add('country-item');
         countryInfo.classList.add('country-item__info');

         countryFlag.src = country.flag;
         countryFlag.classList.add('country-item__flag')

         countryName.innerText = country.name;
         countryName.classList.add('country-item__name');

         countryPopulation.innerText = numberWithCommas(country.population);
         countryPopulation.classList.add('country-item__population');

         countryPopulationText.innerText = 'Population';
         countryPopulationText.classList.add('country-item__population--text');

         countryInfo.appendChild(countryPopulation);
         countryInfo.appendChild(countryPopulationText);

         li.appendChild(countryFlag);
         li.appendChild(countryName);
         li.appendChild(countryInfo);
         ul.appendChild(li);
      })
   results.appendChild(ul);
}

searchInput.addEventListener('input', (e) => {
   searchTerm = e.target.value;
   showCountries();
})




fetch('https://api.covid19api.com/summary')
.then((res) => res.json())
.then((res) => {
   totalDeaths.textContent = 'zalupa';
   console.log(res);
})


async function getWeather() {
   
     try {
       const url = `https://covid19api.com/`;
       const res = await fetch(url);
       const data = await res.json();
       console.log(res)
     } catch {
       localStorage.removeItem('city');
       city.textContent = "invalid value";
       weatherIcon.style.opacity = "0";
       temperature.textContent = ` `;
       humidity.textContent = ` `;
       windSpeed.textContent = ` `;
     }
 }
 */