import React from 'react';
import PropTypes from 'prop-types';

export const Greeting = ({ greeting }) => {
  return (
    <div className="greeting">
      <p className="greeting__text">{greeting}</p>
    </div>
  );
};
Greeting.propTypes = {
  greeting: PropTypes.string,
};
