import axios from 'axios';
import { appConfig, domStrings } from '../appSettings';
import {
  addToLocalStorage,
  getFromLocalStorage,
  fetchData,
  isActive,
  isDisabled,
} from '../utils';

/*
  To handle the verse of the day
*/

export async function quoteWidget() {
  const { ourmannaUrl, inspirationalQuoteUrl } = appConfig;
  const {
    quoteContent,
    quoteAuthor,
    motivationalBtn,
    spiritualityBtn,
  } = domStrings.quoteBox;

  const inspiredQuote = await fetchData(inspirationalQuoteUrl);
  const bibleQuote = await fetchData(ourmannaUrl);

  function renderQuote(quoteOfTheDay) {
    Object.entries(quoteOfTheDay).forEach(([key, value]) => {
      if (key === 'author') {
        quoteAuthor.textContent = quoteOfTheDay['author'];
      } else if (key === 'reference') {
        quoteAuthor.textContent = quoteOfTheDay['reference'];
      } else {
        quoteContent.textContent = quoteOfTheDay['text'];
      }
    });
  }

  const isInspired = () => {
    const randomQuote =
      inspiredQuote[Math.floor(Math.random() * inspiredQuote.length)];
    isActive(motivationalBtn);
    isDisabled(spiritualityBtn);
    return renderQuote(randomQuote);
  };

  const isBible = () => {
    isActive(spiritualityBtn);
    isDisabled(motivationalBtn);
    return renderQuote(bibleQuote.verse.details);
  };

  spiritualityBtn.addEventListener('click', () => isBible());
  motivationalBtn.addEventListener('click', () => isInspired());
}
