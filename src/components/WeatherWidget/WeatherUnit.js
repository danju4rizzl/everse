import React, { useState, useEffect } from 'react';
import WeatherIcon from './WeatherIcon';
import WeatherUnitControl from './WeatherUnitControl';
import store from 'store';

const storageKey = 'Current_unit';

const WeatherUnit = ({ data }) => {
  const [userUnit, setUserUnit] = useState(store.get(storageKey));
  const [temperature, setTemperature] = useState('');

  const handleUnit = (selectedValue) => {
    switch (selectedValue) {
      case 'fahrenheit':
        setUserUnit(true);
        break;
      case 'celsius':
        setUserUnit(false);
      default:
        break;
    }

    //TODO Create a storage object to store in localStorage
  };

  const getCelsius = (f) => {
    //! formula: (74°F − 32) × 5/9 = 23,333°C
    const c = ((f - 32) * 5) / 9;
    return Math.round(c);
  };

  const handleTemplate = (userData) => {
    const defaultUnit = Math.round(userData.main.temp);
    const celsius = getCelsius(defaultUnit);
    setTemperature(
      store.get(storageKey) ? `${defaultUnit}` : `${celsius}` || userUnit
    );
  };

  useEffect(() => {
    store.set(storageKey, userUnit);
    handleTemplate(data);
  }, [userUnit]);

  return (
    <div className="weather__temperature d-flex align-items-center">
      <WeatherIcon iconData={data.weather} iconSize="3rem" />
      <h2 className="current">{temperature}</h2>
      <WeatherUnitControl unit={userUnit} onUnitChange={handleUnit} />
    </div>
  );
};

export default WeatherUnit;
