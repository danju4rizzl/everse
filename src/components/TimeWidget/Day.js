import React from 'react';
import PropTypes from 'prop-types';

export const Day = ({ day }) => {
  return (
    <div className="">
      <p>{day()}</p>
    </div>
  );
};
Day.propTypes = {
  day: PropTypes.func,
};
