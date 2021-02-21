import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { fetchData } from '../../utils';
import axios from 'axios';
import WeatherCity from './WeatherCity';
import WeatherUnit from './WeatherUnit';
import WeatherIcon from './WeatherIcon';
import WeatherCondition from './WeatherCondition';

const WeatherWidget = () => {
  const [city, setCity] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  console.log(data);
  return (
    <>
      <div className="weather__temp">
        <WeatherCondition data={data} />
        <WeatherIcon data={data} />
        <WeatherCity city={city} />
        <WeatherUnit data={data} />
      </div>
    </>
  );
};

export default WeatherWidget;
