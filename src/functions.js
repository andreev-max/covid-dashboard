import {
  changerDay,
  changerPeople,
  valueConfirmed,
  valueDeaths,
  valueRecovered,
  calculationPeople,
  changerOption,
} from './htmlSelectors';

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

// функция для отображения данных в таблице в  зависимости от страны
function table(obj, countPeople) {
  if (!changerDay.checked && !changerPeople.checked) {
    valueConfirmed.textContent = `${obj.cases}`;
    valueDeaths.textContent = `${obj.deaths}`;
    valueRecovered.textContent = `${obj.recovered}`;
  } else if (changerDay.checked && !changerPeople.checked) {
    valueConfirmed.textContent = `${obj.todayCases}`;
    valueDeaths.textContent = `${obj.todayDeaths}`;
    valueRecovered.textContent = `${obj.todayRecovered}`;
  } else if (!changerDay.checked && changerPeople.checked) {
    valueConfirmed.textContent = `${Math.ceil(
      (obj.cases * calculationPeople) / countPeople,
    )}`;
    valueDeaths.textContent = `${Math.ceil(
      (obj.deaths * calculationPeople) / countPeople,
    )}`;
    valueRecovered.textContent = `${Math.ceil(
      (obj.recovered * calculationPeople) / countPeople,
    )}`;
  } else {
    valueConfirmed.textContent = `${Math.ceil(
      (obj.todayCases * calculationPeople) / countPeople,
    )}`;
    valueDeaths.textContent = `${Math.ceil(
      (obj.todayDeaths * calculationPeople) / countPeople,
    )}`;
    valueRecovered.textContent = `${Math.ceil(
      (obj.todayRecovered * calculationPeople) / countPeople,
    )}`;
  }
}
export { table, sortArrByField };
