import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { fetchData } from '../../utils';
import axios from 'axios';
import WeatherCity from './WeatherCity';
import WeatherUnit from './WeatherUnit';
import WeatherIcon from './WeatherIcon';
import WeatherCondition from './WeatherCondition';
import { css } from '@emotion/core';
import PulseLoader from 'react-spinners/PulseLoader';

const WeatherWidget = () => {
  const [city, setCity] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  // Can be a string as well. Need to ensure each key-value pair ends with ;
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const getCity = axios('http://ip-api.com/json');
  getCity
    .then((res) => setCity(res.data.city))
    .catch((err) => `Oops there was an error ${err}`);

  const requestOptions = {
    method: 'GET',
    url: `https://api.openweathermap.org/data/2.5/weather`,
    params: {
      q: city,
      appid: process.env.OPEN_WEATHER_MAP_API_KEY,
      units: 'standard',
    },
  };

  const [{ data, loading, error }, reFetchData] = useAxios(requestOptions);

  if (loading)
    return <PulseLoader loading={true} css={override} size={10} color="#FFF" />;
  if (error) return <p>Error!</p>;
  console.log(data);
  return (
    <>
      <div className="weather__temp">
        <WeatherCondition conditionData={data.weather} />
        {/* <WeatherIcon iconData={data.weather} /> */}
        <WeatherUnit data={data} />
        <WeatherCity city={city} />
      </div>
    </>
  );
};

export default WeatherWidget;
