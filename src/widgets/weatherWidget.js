import axios from 'axios';
import debounce from 'lodash.debounce';
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
  /**
   *ℹ️ To check/verify your ApiKey has been changed uncomment this console.log 
  console.log(process.env.OPEN_WEATHER_MAP_API_KEY);
  
  if you get a different key ie deprecated key, simply delete the .cache folder and restart the serve.
  */

  const { openWeatherMapUnits } = appConfig;

  let { location, temp, celsiusBtn, fahrenheitBtn } = domStrings.weatherBox;
  const options = {
    method: 'GET',
    url: `https://api.openweathermap.org/data/2.5/weather`,
    params: {
      q: userCity,
      appid: process.env.OPEN_WEATHER_MAP_API_KEY,
      units: openWeatherMapUnits,
    },
  };

  axios
    .request(options)
    .then((response) => {
      const defaultUnit = Math.round(response.data.main.temp);
      //! formula: (74°F − 32) × 5/9 = 23,333°C
      let isCelsius = ((defaultUnit - 32) * 5) / 9;
      const currentCelsius = Math.round(isCelsius);
      let userLocation = response.data.name;
      let userTemperature = `${defaultUnit}°`;
      let userUnits = false;

      let t = response.data.weather;
      const iconId = () => {
        for (const i of t) {
          return i.id;
        }
      };

      class DefaultWeatherObject {
        constructor(userLocation, userTemperature, userUnits) {
          this.userLocation = userLocation;
          this.userTemperature = userTemperature;
          this.userUnits = userUnits;
        }
      }

      celsiusBtn.addEventListener('click', () => {
        let celsiusObj = new DefaultWeatherObject(
          userLocation,
          `${currentCelsius}°`,
          !userUnits
        );

        let weatherUpdate = storeContents('Current_weather', celsiusObj);

        temp.textContent = weatherUpdate.userTemperature;

        weatherLoaded();
        toggleActive(celsiusBtn, fahrenheitBtn);
      });

      fahrenheitBtn.addEventListener('click', () => {
        let fahrenheitObj = new DefaultWeatherObject(
          userLocation,
          `${defaultUnit}°`,
          userUnits
        );

        let weatherUpdate = storeContents('Current_weather', fahrenheitObj);

        temp.textContent = weatherUpdate.userTemperature;
        weatherLoaded();
        toggleActive(fahrenheitBtn, celsiusBtn);
      });

      function weatherLoaded() {
        const loadedWeather = JSON.parse(
          localStorage.getItem('Current_weather')
        );

        if (loadedWeather !== null) {
          location.textContent = loadedWeather.userLocation;
          temp.textContent = loadedWeather.userTemperature;

          loadedWeather.userUnits
            ? toggleActive(celsiusBtn, fahrenheitBtn)
            : toggleActive(fahrenheitBtn, celsiusBtn);
          renderWeatherIcon(response.data.weather);
        } else {
          let defaultWeather = new DefaultWeatherObject(
            userLocation,
            userTemperature,
            userUnits
          );

          let weatherUpdate = storeContents('Current_weather', defaultWeather);

          location.textContent = weatherUpdate.userLocation;
          temp.textContent = weatherUpdate.userTemperature;

          toggleActive(fahrenheitBtn, celsiusBtn);
          renderWeatherIcon(response.data.weather);
        }
      }
      renderWeatherIcon(response.data.weather);

      function toggleActive(activeElement, inActiveElement) {
        activeElement.classList.add('is-active');
        inActiveElement.classList.remove('is-active');
      }

      window.onload = weatherLoaded();
      // console.log(response.data.weather);
    })
    .catch((error) => {
      console.error(error);
    });
}
