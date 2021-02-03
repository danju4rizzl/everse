import React from 'react';

const VerseOfTheDay = ({ data }) => {
  let { text, reference } = data.details || '--';

  return (
    <div>
      <p className="quote__content">{text}</p>
      <p className="quote__author">{reference}</p>
    </div>
  );
};

export default VerseOfTheDay;
