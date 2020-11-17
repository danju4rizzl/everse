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

  let { location, temp, celsius, fahrenheit } = domStrings.weatherBox;
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
      let activeWeatherUnits = false;

      celsius.addEventListener('click', () => {
        //! formula: (74°F − 32) × 5/9 = 23,333°C
        let isCelsius = ((defaultUnit - 32) * 5) / 9;
        const currentCelsius = Math.round(isCelsius);
        toggleActive(celsius, fahrenheit);

        let weatherObject = {
          weatherLocation,
          weatherTemperature: `${currentCelsius}°`,
          activeWeatherUnits: 'celsius',
        };
        let weatherUpdate = storeContents('Current_weather', weatherObject);
        temp.textContent = weatherUpdate.weatherTemperature;
      });

      fahrenheit.addEventListener('click', () => {
        toggleActive(fahrenheit, celsius);
        temp.textContent = `${defaultUnit}°`;

        let weatherObject = {
          weatherLocation,
          weatherTemperature: `${defaultUnit}°`,
          activeWeatherUnits,
        };
        let weatherUpdate = storeContents('Current_weather', weatherObject);
        temp.textContent = weatherUpdate.weatherTemperature;
      });

      function weatherLoaded() {
        const loadedWeather = JSON.parse(
          localStorage.getItem('Current_weather')
        );

        if (loadedWeather !== null) {
          // let weatherUpdate = storeContents('Current_weather', loadedWeather);
          location.textContent = loadedWeather.weatherLocation;
          temp.textContent = loadedWeather.weatherTemperature;

          loadedWeather.activeWeatherUnits === 'celsius'
            ? toggleActive(celsius, fahrenheit)
            : toggleActive(fahrenheit, celsius);
        } else {
          let weatherObject = {
            weatherLocation,
            weatherTemperature,
            activeWeatherUnits,
          };
          let weatherUpdate = storeContents('Current_weather', weatherObject);
          location.textContent = weatherUpdate.weatherLocation;
          temp.textContent = weatherUpdate.weatherTemperature;
          toggleActive(fahrenheit, celsius);
        }
      }

      renderWeatherIcon(response.data.weather);

      function toggleActive(activeElement, inactiveElement) {
        activeElement.classList.add('is-active');
        inactiveElement.classList.remove('is-active');
      }

      window.onload = weatherLoaded();
      // console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}
