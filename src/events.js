import 'regenerator-runtime/runtime';

import {
  boards,
  changerDay,
  changerPeople,
  changerOption,
  countryPopulation,
  territory,
  regexpSearchChartParameter,
  select,
  options,
  selectedOptionPopulation,
  display,
  covidResult,
} from './htmlSelectors';

import drawChart from './chart';

import showTable from './table';

import showList from './list';

function changeDayInTable() {
  changerDay.addEventListener('click', () => {
    showTable();
  });
}

function changePeopleCountInTable() {
  changerPeople.addEventListener('click', () => {
    showTable();
  });
}

function drawChartFromTable() {
  for (let i = 0; i < boards.length; i += 1) {
    const board = boards[i];
    board.addEventListener('click', () => {
      const parameterForChart = board.children[0].innerHTML
        .match(regexpSearchChartParameter)[0].toLowerCase();
      const population = Number(countryPopulation.textContent);
      drawChart(territory.textContent, parameterForChart,
        changerDay.checked, changerPeople.checked, population);
    });
  }
}

function changeListByParameter() {
  select.addEventListener('change', () => {
    covidResult.innerHTML = '';
    selectedOptionPopulation.value = options[select.selectedIndex].value;
    showList(selectedOptionPopulation.value, changerOption.checked);
  });
}

function changeListBySearch() {
  display.addEventListener('input', (e) => {
    display.value = e.target.value;
    showList(selectedOptionPopulation.value, changerOption.checked);
  });
}

function changeListByToggle() {
  changerOption.addEventListener('click', () => {
    showList(selectedOptionPopulation.value, changerOption.checked);
  });
}

export {
  changeDayInTable,
  changePeopleCountInTable,
  drawChartFromTable,
  changeListByParameter,
  changeListBySearch,
  changeListByToggle,
};
