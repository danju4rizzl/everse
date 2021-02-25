import React from 'react';
import PropTypes from 'prop-types';
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

const WeatherIcon = ({ iconData, iconSize }) => {
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
      {iconData.map((item) => (
        <i
          className="weather__icon d-flex"
          style={{ fontSize: iconSize }}
          key={item.id}
        >
          {handleIcon(item.id)}
        </i>
      ))}
    </>
  );
};
WeatherIcon.defaultProps = { iconSize: '1rem' };
WeatherIcon.propTypes = {
  iconData: PropTypes.array,
  iconSize: PropTypes.string,
};
export default WeatherIcon;
