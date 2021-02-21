import React from 'react';

const WeatherUnitControl = ({ unit, onUnitChange }) => {
  const handleClick = (e) => {
    onUnitChange(e.target.value);
  };

  return (
    <>
      <div className="weather__units">
        <button
          type="button"
          value="fahrenheit"
          onClick={handleClick}
          style={{ color: unit && '#333' }}
        >
          F°
        </button>

        <button
          type="button"
          value="celsius"
          onClick={handleClick}
          style={{ color: !unit && '#333' }}
        >
          C°
        </button>
      </div>
    </>
  );
};

export default WeatherUnitControl;
