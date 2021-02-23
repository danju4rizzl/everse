import React, { useState, useEffect } from 'react';
import WeatherIcon from './WeatherIcon';
import WeatherUnitControl from './WeatherUnitControl';

const WeatherUnit = ({ data }) => {
  const [userUnit, setUserUnit] = useState(true);
  const [temperature, setTemperature] = useState('');

  const handleUnit = (selectedValue) => {
    selectedValue === 'fahrenheit' ? setUserUnit(true) : setUserUnit(false);
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
    setTemperature(userUnit ? `${defaultUnit}` : `${celsius}`);
  };

  useEffect(() => {
    handleTemplate(data);
  }, [userUnit]);

  return (
    <div className="weather__temperature d-flex align-items-center">
      <h2 className="weather__current">{temperature}</h2>
      <WeatherUnitControl unit={userUnit} onUnitChange={handleUnit} />
    </div>
  );
};

export default WeatherUnit;
