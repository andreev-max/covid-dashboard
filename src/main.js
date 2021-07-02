import 'regenerator-runtime/runtime';
import showTable from './table';
import drawChart from './chart';

import {
  changerDay,
  changerPeople,
  territory,
  countryPopulation,
} from './htmlSelectors';

import {
  changeDayInTable,
  changePeopleCountInTable,
  drawChartFromTable,
  changeListByParameter,
  changeListBySearch,
  changeListByToggle,
} from './events';

changeDayInTable();
changePeopleCountInTable();
drawChartFromTable();
changeListByParameter();
changeListBySearch();
changeListByToggle();
showTable();

drawChart(territory.textContent,
  'cases',
  changerDay.checked,
  changerPeople.checked,
  countryPopulation.textContent);
