import axios from 'axios';
import { appConfig, domStrings } from '../appSettings';
import {
  addToLocalStorage,
  getFromLocalStorage,
  renderWeatherIcon,
  storeContents,
} from '../utils';
import easyToggle from 'easy-toggle-state';

/*
  To handle the weather of the user
  */
export function weatherWidget(userCity) {
  const {
    openWeatherMapApiKey,
    openWeatherMapLocation,
    openWeatherMapUnits,
  } = appConfig;

  const { location, temp, celsius, fahrenheit } = domStrings.weatherBox;
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
      const defaultUnit = Math.round(response.data.main.temp);

      let weatherLocation = response.data.name;
      let weatherTemperature = `${defaultUnit}°`;

      celsius.addEventListener('click', () => {
        //! formula: (74°F − 32) × 5/9 = 23,333°C
        let isCelsius = ((defaultUnit - 32) * 5) / 9;
        const currentCelsius = Math.round(isCelsius);

        celsius.classList.add('is-active');
        fahrenheit.classList.remove('is-active');

        weatherObject.weatherTemperature = currentCelsius;
        temp.textContent = `${currentCelsius}°`;
      });

      fahrenheit.addEventListener('click', () => {
        fahrenheit.classList.add('is-active');
        celsius.classList.remove('is-active');
        temp.textContent = `${defaultUnit}°`;

        weatherObject.weatherTemperature = defaultUnit;
      });

      let weatherObject = {
        weatherLocation,
        weatherTemperature,
      };

      const weatherUpdate = storeContents('Current_weather', weatherObject);
      renderWeatherIcon(response.data.weather);
      // console.log(response.data);
      location.textContent = weatherUpdate.weatherLocation;
      temp.textContent = weatherUpdate.weatherTemperature;
    })
    .catch((error) => {
      console.error(error);
    });
}
