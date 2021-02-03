import React from 'react';
import PropTypes from 'prop-types';

export const Time = ({ time, seconds, period }) => {
  return (
    <div className="time d-flex align-items-center justify-content-center">
      <div className="time__currently mx-2">
        <h2 className="hours">
          <span>{time}</span>
        </h2>
      </div>
      <div className="time__info">
        <p className="period">{period ? 'AM' : 'PM'}</p>
        <p className="seconds">{seconds < 10 ? `0${seconds}` : seconds}</p>
      </div>
    </div>
  );
};

Time.propTypes = {
  time: PropTypes.string,
  seconds: PropTypes.number,
  period: PropTypes.bool,
};
