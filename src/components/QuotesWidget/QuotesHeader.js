import React from 'react';

const QuotesHeader = ({ mode }) => {
  return (
    <h2 className="quotes__heading">
      {`${mode ? 'Verse' : 'Quote'} of the day`}
    </h2>
  );
};

export default QuotesHeader;
