import axios from 'axios';
import { appConfig, domStrings } from '../appSettings';
import {
  addToLocalStorage,
  getFromLocalStorage,
  storeContents,
} from '../utils';

/*
  To handle the weather of the user
  */
export function weatherWidget(userCity) {
  const {
    openWeatherMapApiKey,
    openWeatherMapLocation,
    openWeatherMapUnits,
  } = appConfig;

  const { location, temp } = domStrings.weatherBox;

  const options = {
    method: 'GET',
    url: `https://api.openweathermap.org/data/2.5/weather`,
    params: {
      q: userCity,
      appid: openWeatherMapApiKey,
      units: openWeatherMapUnits,
    },
    // headers: { 'user-agent': 'vscode-restclient' },
  };

  const renderWeatherIcon = (apiIcon) => {
    let iconClass;

    const checkIconId = function (id) {
      if (id >= 200 && id < 232) {
        iconClass = 'bolt';
      } else if (id >= 300 && id < 321) {
        iconClass = 'cloud-sun-rain';
      } else if (id >= 500 && id < 531) {
        iconClass = 'cloud-showers-heavy';
      } else if (id >= 600 && id < 622) {
        iconClass = 'snowflake';
      } else if (id >= 701 && id < 781) {
        iconClass = 'wind';
      } else if (id === 800) {
        iconClass = 'cloud-sun';
      } else if (id > 800 && id <= 804) {
        iconClass = 'smog';
      } else iconClass = 'rainbow';
    };

    for (let item of apiIcon) {
      checkIconId(item.id);
    }

    const iconElement = `<span class="fas fa-${iconClass}"></span>`;

    document.querySelector('.weather__temp #icon').innerHTML = iconElement;
  };

  axios
    .request(options)
    .then((response) => {
      let weatherLocation = response.data.name;
      let weatherTemperature = `${Math.round(response.data.main.temp)}°`;

      let weatherObject = {
        weatherLocation,
        weatherTemperature,
      };

      renderWeatherIcon(response.data.weather);
      const weatherUpdate = storeContents('Current_weather', weatherObject);

      location.textContent = weatherUpdate.weatherLocation;
      temp.textContent = weatherUpdate.weatherTemperature;
    })
    .catch((error) => {
      console.error(error);
    });
}
