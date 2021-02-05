import React from 'react';
import PropTypes from 'prop-types';
const QuotesHeader = ({ mode }) => {
  return (
    <h2 className="quotes__heading">
      {`${mode ? 'Verse' : 'Quote'} of the day`}
    </h2>
  );
};

QuotesHeader.propTypes = { mode: PropTypes.bool };

export default QuotesHeader;
