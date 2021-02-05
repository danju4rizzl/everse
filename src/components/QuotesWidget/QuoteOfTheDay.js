import React from 'react';

const QuoteOfTheDay = ({ data }) => {
  const { text, author } = data;
  return (
    <div>
      <p className="quote__content">{text}</p>
      <p className="quote__author">{author}</p>
    </div>
  );
};

export default QuoteOfTheDay;
