import React from 'react';
import ReactDOM from 'react-dom';
import TasksWidget from './components/TasksWidget/TasksWidget';
import TimeWidget from './components/TimeWidget/TimeWidget';
import './fonts/Alata-Regular.ttf';
import './main.scss';
import { quoteWidget } from './widgets/quoteWidget';
import { covidWidget } from './widgets/covidWidget';
import { quickLinkWidget } from './widgets/quickLinkWidget';
import { weatherWidget } from './widgets/weatherWidget';
import { fetchData, appIntro } from './utils';

ReactDOM.render(
  <React.StrictMode>
    <TasksWidget />
  </React.StrictMode>,
  document.getElementById('task')
);

ReactDOM.render(
  <React.StrictMode>
    <TimeWidget />
  </React.StrictMode>,
  document.getElementById('time')
);

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

quickLinkWidget();
appIntro();

const runApp = async () => {
  const userIp = await fetchData('http://ip-api.com/json');
  let { country, city } = userIp;
  quoteWidget();
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
