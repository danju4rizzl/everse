import axios from 'axios';
import { appConfig, domStrings } from '../appSettings';
import {
  addToLocalStorage,
  getFromLocalStorage,
  renderWeatherIcon,
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
