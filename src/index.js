import React from 'react';
import ReactDOM from 'react-dom';
import TasksWidget from './components/TasksWidget/TasksWidget';
import TimeWidget from './components/TimeWidget/TimeWidget';
import FavoritesWidget from './components/FavoritesWidget/FavoritesWidget';
import QuotesWidget from './components/QuotesWidget/QuotesWidget';
import './fonts/Alata-Regular.ttf';
import 'antd/dist/antd.css';
import './main.scss';

import { covidWidget } from './widgets/covidWidget';
import { weatherWidget } from './widgets/weatherWidget';
import { fetchData, appIntro } from './utils';

ReactDOM.render(<TasksWidget />, document.getElementById('task'));
ReactDOM.render(<TimeWidget />, document.getElementById('time'));
ReactDOM.render(<FavoritesWidget />, document.getElementById('favorites'));
ReactDOM.render(<QuotesWidget />, document.getElementById('quotes'));

// Handle User Geo-Location
function handleLocation() {
  // if ('geolocation' in navigator) {
  //   navigator.geolocation.getCurrentPosition(
  //     function success(position) {
  //       console.log(
  //         'latitude',
  //         position.coords.latitude,
  //         'longitude',
  //         position.coords.longitude
  //       );
  //     },
  //     function error(error_message) {
  //       console.log(
  //         'An error has occurred whale retrieving location',
  //         error_message
  //       );
  //     }
  //   );
  // } else {
  //   console.log('geolocation is not enabled on this browser');
  // }
}

// handles ALL UI function calls

appIntro();

const runApp = async () => {
  const userIp = await fetchData('http://ip-api.com/json');
  let { country, city } = userIp;

  covidWidget(country);
  weatherWidget(city);
};

// localStorage.clear();
if (localStorage.length <= 0) {
  runApp();
} else runApp();

// USE THIS TO LOAD REACT COMPONENTS UNTILL ENTIRE APP IS RUNNING REACT
// ReactDOM.render(<Box />, document.getElementById('div1'));
// ReactDOM.render(<Box />, document.getElementById('div2'));
// ReactDOM.render(<Box />, document.getElementById('div3'));

// TODO: Use react-grid-layout to support moving the widgets around the screen with LocalStorage to save the users layout. https://github.com/STRML/react-grid-layout
