import React, { useEffect, useState } from 'react';
import VerseOfTheDay from './VerseOfTheDay';
import QuoteOfTheDay from './QuoteOfTheDay';
import { fetchData, getRandomItem } from '../../utils';

const QuotesWidget = () => {
  const bibleAPI = 'https://beta.ourmanna.com/api/v1/get/?format=json';
  const motivationAPI = 'https://type.fit/api/quotes';

  const [bible, setBible] = useState([]);
  const [motivation, setMotivation] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      const bibleData = await fetchData(bibleAPI);
      const motivationData = await fetchData(motivationAPI);
      setBible(bibleData.verse);
      getRandomItem(motivationData, setMotivation);
    };
    getAllData();
  }, []);

  return (
    <div>
      <div id="quoteSettings" className="quote-settings">
        {''}
      </div>
      <h2>Verse of the day</h2>
      <VerseOfTheDay data={bible} />
      {/* <QuoteOfTheDay data={motivation} /> */}
    </div>
  );
};

export default QuotesWidget;
