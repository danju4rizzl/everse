import React from 'react';

const WeatherCondition = ({ data }) => {
  return (
    <>
      {data.weather.map((item) => (
        <p>{item.main}</p>
      ))}
    </>
  );
};

export default WeatherCondition;
