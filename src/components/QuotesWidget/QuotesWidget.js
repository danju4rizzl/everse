import React, { useEffect, useState } from 'react';
import VerseOfTheDay from './VerseOfTheDay';
import QuoteOfTheDay from './QuoteOfTheDay';
import QuotesHeader from './QuotesHeader';
import { fetchData, getRandomItem } from '../../utils';
import { Select } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import store from 'store';

const bibleAPI = 'https://beta.ourmanna.com/api/v1/get/?format=json';
const motivationAPI = 'https://type.fit/api/quotes';
const { Option } = Select;

const QuotesWidget = () => {
  const [bible, setBible] = useState([]);
  const [motivation, setMotivation] = useState([]);
  const [mode, setMode] = useState('spirituality');
  const storageKey = 'Current_quotes';

  const isBibleSelected = checkBible(mode);

  function handleChange(value) {
    if (value === 'spirituality') {
      setMode(value);
    } else setMode('motivational');
  }

  useEffect(() => {
    const storedQuotes = store.get(storageKey);
    console.log(storedQuotes);
    storedQuotes && setMode(storedQuotes);
    handleChange(storedQuotes);
  }, []);

  useEffect(() => {
    store.set(storageKey, mode);
  }, [mode]);

  useEffect(() => {
    const getAllData = async () => {
      const bibleData = await fetchData(bibleAPI);
      const motivationData = await fetchData(motivationAPI);
      const randomMotivationalQuote =
        motivationData[Math.floor(Math.random() * motivationData.length)];

      setBible(bibleData.verse);
      setMotivation(randomMotivationalQuote);
    };
    getAllData();
  }, []);

  return (
    <div className="quotes__inner p-5">
      <QuotesHeader mode={isBibleSelected()} />
      <div className="quotes__today">
        {isBibleSelected() && <VerseOfTheDay data={bible} />}
        {!isBibleSelected() && <QuoteOfTheDay data={motivation} />}
      </div>

      <div className="quotes__settings ">
        <Select
          defaultValue={
            store.get(storageKey) === 'spirituality' ? mode : 'motivational'
          }
          style={{ width: 200 }}
          onChange={handleChange}
          bordered={false}
          className="quotes__options"
          dropdownClassName="quotes__dropdown"
        >
          <Option value="spirituality" disabled={isBibleSelected()}>
            Spirituality
          </Option>
          <Option value="motivational" disabled={!isBibleSelected()}>
            Motivational
          </Option>
        </Select>
      </div>
    </div>
  );
};

export default QuotesWidget;
function checkBible(mode) {
  return () => (mode === 'spirituality' ? true : false);
}
