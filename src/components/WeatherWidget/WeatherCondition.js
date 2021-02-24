import React from 'react';
import PropTypes from 'prop-types';

const WeatherCondition = ({ conditionData }) => {
  return (
    <>
      <p className="text-sm">{conditionData.map((item) => item.main)}</p>
    </>
  );
};

WeatherCondition.propTypes = { condition: PropTypes.array };
export default WeatherCondition;
