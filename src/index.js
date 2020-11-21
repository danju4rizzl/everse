import './main.scss';
import axios from 'axios';
import { domStrings, appConfig, quickLinks } from './appSettings';
import { verseWidget } from './widgets/verseWidget';
import { todoWidget } from './widgets/todoWidget';
import { dateTimeWidget } from './widgets/dateTimeWidget';
import { covidWidget } from './widgets/covidWidget';
import { quickLinkWidget } from './widgets/quickLinkWidget';
import { weatherWidget } from './widgets/weatherWidget';
import { fetchData } from './utils';

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

const runApp = async () => {
  const userIp = await fetchData('http://ip-api.com/json');
  let { country, city } = userIp;
  verseWidget();
  dateTimeWidget();
  todoWidget();
  quickLinkWidget(quickLinks);
  covidWidget(country);
  weatherWidget(city);

  // This will auto refresh the weatherWidget data every 1 hour
  setInterval(() => {
    weatherWidget(city);
  }, 3600000);
};

// localStorage.clear();
if (localStorage.length <= 0) {
  runApp();
} else runApp();
