import 'regenerator-runtime/runtime';

import {
  coordinates,
  fetchCovidByCoordinates,
} from './htmlSelectors';

// создание опций
const mapOptions = {
  center: [20, 25],
  zoom: 1,
  worldCopyJump: true,
};

// создание карты с определенными опциями
const map = new L.Map('map', mapOptions);

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

// функция для отображения интенсивности заражения вирусом
async function main() {
  await fetchCovidByCoordinates();
  coordinates.key.forEach((element) => {
    if (element.cases > 1000000) {
      const circle = new L.CircleMarker([element.countryInfo.lat, element.countryInfo.long], {
        color: 'black',
        fillColor: 'black',
        fillOpacity: 0.5,
        radius: 30,
      });
      circle.bindPopup(`Name country:${element.country}<br>Population:${element.population}<br>Cases:${element.cases}<br>Deaths:${element.deaths}`);
      circle.addTo(map);
    } else if (element.cases > 500000) {
      const circle = new L.CircleMarker([element.countryInfo.lat, element.countryInfo.long], {
        color: 'red',
        fillColor: 'red',
        fillOpacity: 0.5,
        radius: 25,
      });
      circle.bindPopup(`Name country:${element.country}<br>Population:${element.population}<br>Cases:${element.cases}<br>Deaths:${element.deaths}`);
      circle.addTo(map);
    } else if (element.cases > 250000) {
      const circle = new L.CircleMarker([element.countryInfo.lat, element.countryInfo.long], {
        color: 'yellow',
        fillColor: 'yellow',
        fillOpacity: 0.5,
        radius: 23,
      });
      circle.bindPopup(`Name country:${element.country}<br>Population:${element.population}<br>Cases:${element.cases}<br>Deaths:${element.deaths}`);
      circle.addTo(map);
    } else if (element.cases > 100000) {
      const circle = new L.CircleMarker([element.countryInfo.lat, element.countryInfo.long], {
        color: 'orange',
        fillColor: 'orange',
        fillOpacity: 0.5,
        radius: 21,
      });
      circle.bindPopup(`Name country:${element.country}<br>Population:${element.population}<br>Cases:${element.cases}<br>Deaths:${element.deaths}`);
      circle.addTo(map);
    } else if (element.cases > 50000) {
      const circle = new L.CircleMarker([element.countryInfo.lat, element.countryInfo.long], {
        color: 'pink',
        fillColor: 'pink',
        fillOpacity: 0.5,
        radius: 19,
      });
      circle.bindPopup(`Name country:${element.country}<br>Population:${element.population}<br>Cases:${element.cases}<br>Deaths:${element.deaths}`);
      circle.addTo(map);
    } else if (element.cases > 25000) {
      const circle = new L.CircleMarker([element.countryInfo.lat, element.countryInfo.long], {
        color: 'green',
        fillColor: 'green',
        fillOpacity: 0.5,
        radius: 17,
      });
      circle.bindPopup(`Name country:${element.country}<br>Population:${element.population}<br>Cases:${element.cases}<br>Deaths:${element.deaths}`);
      circle.addTo(map);
    } else {
      const circle = new L.CircleMarker([element.countryInfo.lat, element.countryInfo.long], {
        color: 'white',
        fillColor: 'white',
        fillOpacity: 0.5,
        radius: 15,
      });
      circle.bindPopup(`Name country:${element.country}<br>Population:${element.population}<br>Cases:${element.cases}<br>Deaths:${element.deaths}`);
      circle.addTo(map);
    }
  });
}

main();
