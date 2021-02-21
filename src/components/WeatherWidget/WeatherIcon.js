import React from 'react';
import {
  WiThunderstorm,
  WiSleet,
  WiRain,
  WiSnow,
  WiFog,
  WiCloud,
  WiCloudy,
  WiNa,
} from 'react-icons/wi';

const WeatherIcon = ({ data }) => {
  const handleIcon = (id) => {
    if (id >= 200 && id < 232) {
      return <WiThunderstorm />;
    } else if (id >= 300 && id < 321) {
      return <WiSleet />;
    } else if (id >= 500 && id < 531) {
      return <WiRain />;
    } else if (id >= 600 && id < 622) {
      return <WiSnow />;
    } else if (id >= 701 && id < 781) {
      return <WiFog />;
    } else if (id === 800) {
      return <WiCloud />;
    } else if (id > 800 && id <= 804) {
      return <WiCloudy />;
    } else return <WiNa />;
  };

  return (
    <>
      {data.weather.map((item) => (
        <i className="weather__icon" key={item.id}>
          {handleIcon(item.id)}
        </i>
      ))}
    </>
  );
};

export default WeatherIcon;
