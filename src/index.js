import './main.scss';
import axios from 'axios';
import { domStrings, appConfig, quickLinks } from './appSettings';
import { verseWidget } from './widgets/verseWidget';
import { todoWidget } from './widgets/todoWidget';
import { dateTimeWidget } from './widgets/dateTimeWidget';
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
      // weatherWidget(city);
      covidWidget(country);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

// handles ALL UI function calls
function runApp() {
  // verseWidget();
  // quickLinkWidget(quickLinks);
  // todoWidget();
  dateTimeWidget();
  ipLookUp(); //TOdo make ipLookUp() a utils function to call weather and / or covidWidget instead of groping it together
}

// localStorage.clear();
if (localStorage.length <= 0) {
  runApp();
} else runApp();
