import React from 'react';

const WeatherUnitControl = ({ unit, onUnitChange }) => {
  const handleClick = (e) => {
    onUnitChange(e.target.value);
  };

  return (
    <>
      <ul
        className={`weather__units d-flex align-items-start ${
          unit ? 'flex-row' : 'flex-row-reverse'
        } list-group`}
      >
        <li className="list-group-item">
          <button
            type="button"
            value="fahrenheit"
            onClick={handleClick}
            className={unit ? 'isActive' : 'notActive'}
          >
            °F
          </button>
        </li>
        {/* <hr className="divider" /> */}
        <li className="list-group-item">
          <button
            type="button"
            value="celsius"
            onClick={handleClick}
            className={!unit ? 'isActive' : 'notActive'}
          >
            °C
          </button>
        </li>
      </ul>
    </>
  );
};

export default WeatherUnitControl;
