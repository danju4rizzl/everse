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

      celsius.addEventListener('click', () => {
        //! formula: (74°F − 32) × 5/9 = 23,333°C
        let isCelsius = ((defaultUnit - 32) * 5) / 9;
        const currentCelsius = Math.round(isCelsius);

        celsius.classList.add('is-active');
        fahrenheit.classList.remove('is-active');

        let weatherObject = {
          weatherLocation,
          weatherTemperature: `${currentCelsius}°`,
        };
        let weatherUpdate = storeContents('Current_weather', weatherObject);
        temp.textContent = weatherUpdate.weatherTemperature;
      });

      fahrenheit.addEventListener('click', () => {
        fahrenheit.classList.add('is-active');
        celsius.classList.remove('is-active');
        temp.textContent = `${defaultUnit}°`;

        let weatherObject = {
          weatherLocation,
          weatherTemperature: `${defaultUnit}°`,
        };
        let weatherUpdate = storeContents('Current_weather', weatherObject);
        temp.textContent = weatherUpdate.weatherTemperature;
      });

      // window.addEventListener('load', () => {
      //   let weatherObject = {
      //     weatherLocation,
      //     weatherTemperature,
      //   };

      //   let weatherUpdate = storeContents('Current_weather', weatherObject);

      //   location.textContent = weatherUpdate.weatherLocation;
      //   temp.textContent = weatherUpdate.weatherTemperature;
      //   renderWeatherIcon(response.data.weather);
      // });

      function weatherLoaded() {
        const loadedWeather = JSON.parse(
          localStorage.getItem('Current_weather')
        );
        if (loadedWeather !== null) {
          // let weatherUpdate = storeContents('Current_weather', loadedWeather);
          location.textContent = loadedWeather.weatherLocation;
          temp.textContent = loadedWeather.weatherTemperature;
        } else {
          let weatherObject = {
            weatherLocation,
            weatherTemperature,
          };
          let weatherUpdate = storeContents('Current_weather', weatherObject);
          location.textContent = weatherUpdate.weatherLocation;
          temp.textContent = weatherUpdate.weatherTemperature;
        }
      }
      renderWeatherIcon(response.data.weather);

      window.onload = weatherLoaded();
      // console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}
