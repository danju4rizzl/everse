import './main.scss';
import axios from 'axios';
import { domStrings, appConfig } from './appSettings';
import { verseWidget } from './widgets/verseWidget';
import { todoWidget } from './widgets/todoWidget';
import { dateWidget } from './widgets/dateWidget';
import { covidWidget } from './widgets/covidWidget';
import { quickLinkWidget } from './widgets/quickLinkWidget';
import { weatherWidget } from './widgets/weatherWidget';

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

  return ipLookUp();
}

// Handle User ip-location
function ipLookUp() {
  const options = {
    method: 'GET',
    url: appConfig.ipApiUrl,
  };

  axios
    .request(options)
    .then(function (response) {
      let { city, country } = response.data;
      weatherWidget(city);
      covidWidget(country);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

// handles ALL UI function calls
function runApp() {
  verseWidget();
  quickLinkWidget(quickLinks);
  todoWidget();
  ipLookUp();

  setInterval(() => {
    dateWidget();
  }, 1000);
}

// localStorage.clear();
if (localStorage.length <= 0) {
  runApp();
} else runApp();
