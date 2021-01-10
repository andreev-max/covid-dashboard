import 'regenerator-runtime/runtime';
import L from 'leaflet';

import {
  coordinates,
} from './htmlSelectors';

import {
  fetchCovidByCoordinates,
} from './fetchFunctions';

import myObj from './countries.geo.json';

let type;

const arrMillion = [0, 5000, 10000, 25000, 50000, 125000, 250000, 500000, 1000000];
const arrTenThousand = [0, 5000, 10000, 25000, 50000, 75000, 100000, 150000, 300000];
const arrThousand = [0, 500, 1000, 2500, 5000, 7000, 10000, 15000, 25000];
const arrHundred = [0, 50, 100, 200, 400, 500, 600, 800, 1000];
const arrColors = ['#faf0c4', '#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'];

function getDataByType(props, type) {
  let fillArray;
  let countPeople;
  switch (type) {
    case 'cases':
      fillArray = props.cases;
      countPeople = 1000000;
      break;
    case 'deaths':
      fillArray = props.deaths;
      countPeople = 300000;
      break;
    case 'recovered':
      fillArray = props.recovered;
      countPeople = 1000000;
      break;
    case 'todayCases':
      fillArray = props.todayCases;
      countPeople = 25000;
      break;
    case 'todayDeaths':
      fillArray = props.todayDeaths;
      countPeople = 1000;
      break;
    case 'todayRecovered':
      fillArray = props.todayRecovered;
      countPeople = 25000;
      break;
  }
  return {
    arr: fillArray,
    count: countPeople,
  };
}

const main = async () => {
  await fetchCovidByCoordinates();
  for (let i = 0; i < myObj[0].features.length; i++) {
    coordinates.key.forEach((element) => {
      if (myObj[0].features[i].id === element.countryInfo.iso3) {
        myObj[0].features[i].properties.cases = element.cases;
        myObj[0].features[i].properties.todayCases = element.todayCases;
        myObj[0].features[i].properties.deaths = element.deaths;
        myObj[0].features[i].properties.todayDeaths = element.todayDeaths;
        myObj[0].features[i].properties.recovered = element.recovered;
        myObj[0].features[i].properties.todayRecovered = element.todayRecovered;
      }
    });
  }
  L.geoJson(myObj, { style }).addTo(map);
  geojson = L.geoJson(myObj, {
    style,
    onEachFeature,
  }).addTo(map);
};

main();
// создание опций
const mapOptions = {
  center: [20, 33],
  zoom: 2,
  worldCopyJump: true,
};

// создание карты с определенными опциями
const map = new L.map('map', mapOptions);

// добавление одного слоя карты
const layerOneMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
}).addTo(map);

// добавление другого слоя карты
const layerTwoMap = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
}).addTo(map);

const Maps = {
  1: layerOneMap,
  2: layerTwoMap,
};

L.control.layers(Maps, {}).addTo(map);

// отображение данных для основных состояний
L.geoJson(myObj).addTo(map);

// функция добавления цвета для страны в зависимости от степени распространения
function getColor(d, count) {
  if (count > 500000) {
    for (let i = 0; i < arrMillion.length; i++) {
      if (d < arrMillion[0]) { return d = arrColors[0]; }
      if (d >= arrMillion[i] && d < arrMillion[i + 1]) {
        return d = arrColors[i];
      } if (d > arrMillion[arrMillion.length - 1]) { return d = arrColors[arrColors.length - 1]; }
    }
  } else if (count > 100000) {
    for (let i = 0; i < arrTenThousand.length; i++) {
      if (d < arrTenThousand[0]) { return d = arrColors[0]; }
      if (d >= arrTenThousand[i] && d < arrTenThousand[i + 1]) {
        return d = arrColors[i];
      } if (d > arrTenThousand[arrTenThousand.length - 1]) { return d = arrColors[arrColors.length - 1]; }
    }
  } else if (count > 20000) {
    for (let i = 0; i < arrThousand.length; i++) {
      if (d < arrThousand[0]) { return d = arrColors[0]; }
      if (d >= arrThousand[i] && d < arrThousand[i + 1]) {
        return d = arrColors[i];
      } if (d > arrThousand[arrThousand.length - 1]) { return d = arrColors[arrColors.length - 1]; }
    }
  } else {
    for (let i = 0; i < arrHundred.length; i++) {
      if (d < arrHundred[0]) { return d = arrColors[0]; }
      if (d >= arrHundred[i] && d < arrHundred[i + 1]) {
        return d = arrColors[i];
      } if (d > arrHundred[arrHundred.length - 1]) { return d = arrColors[arrColors.length - 1]; }
    }
  }
}

// функция стиля для слоя GeoJSON
function style(feature) {
  return {
    fillColor: getColor(getDataByType(feature.properties, type).arr,
      getDataByType(feature.properties, type).count),
    weight: 0.5,
    opacity: 1,
    color: 'purple',
    fillOpacity: 0.5,
  };
}

L.geoJson(myObj, { style }).addTo(map);

// прослушиватель событий для mouseover события
function highlightFeature(e) {
  const layer = e.target;
  layer.setStyle({
    weight: 5,
    color: 'pink',
    fillOpacity: 0.7,
  });
  info.update(layer.feature.properties);
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

let geojson;

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature,
  });
}

let info = L.control();

// создание таблички инфо
info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

// Отображение информации при наведении
info.update = function (props) {
  this._div.innerHTML = `<h4>${type}</h4>${props
    ? `<b>${props.name}</b><br />${getDataByType(props, type).arr} ${type}`
    : 'Move the mouse cursor over the country'}`;
};

info.addTo(map);

// Создание легенды карты
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
  const div = L.DomUtil.create('div', 'info legend');
  const labels = [];
  for (let i = 0; i < arrMillion.length; i++) {
    div.innerHTML
    += `<i style="background:${arrColors[i]}"></i> ${
        arrMillion[i]}${arrMillion[i + 1] ? `&ndash;${arrMillion[i + 1]}<br>` : '+'}`;
  }
  return div;
};

legend.addTo(map);

const selector = document.querySelector('#covid-parameters');
selector.addEventListener('change', () => {
  type = selector.value;
  info.update();
  L.geoJson(myObj, { style }).addTo(map);
  geojson = L.geoJson(myObj, {
    style,
    onEachFeature,
  }).addTo(map);
});

document.addEventListener('DOMContentLoaded', () => {
  type = 'cases';
  info.update();
});
