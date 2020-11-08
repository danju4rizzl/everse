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

// Handle User Location
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
  //         'An error has occured whale retrieving location',
  //         error_message
  //       );
  //     }
  //   );
  // } else {
  //   console.log('geolocation is not enabled on this browser');
  // }
  // return ipLookUp();
}

// handles ALL UI function calls
const runApp = async () => {
  const userIp = await fetchData('http://ip-api.com/json');
  let { country, city } = userIp;

  // quickLinkWidget(quickLinks);
  // todoWidget();
  verseWidget();
  covidWidget(country);
  weatherWidget(city);
  dateTimeWidget();
};

// localStorage.clear();
if (localStorage.length <= 0) {
  runApp();
} else runApp();
