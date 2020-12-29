import axios from 'axios';
import { appConfig, domStrings } from '../appSettings';
import { addToLocalStorage, getFromLocalStorage, fetchData } from '../utils';

/*
  To handle the verse of the day
*/

export async function quoteWidget() {
  const { ourmannaUrl, inspirationalQuoteUrl } = appConfig;
  const { quoteContent, quoteAuthor } = domStrings.quoteBox;

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
    return renderQuote(randomQuote);
  };

  const isBible = () => {
    return renderQuote(bibleQuote.verse.details);
  };

  isInspired();
  // isBible();
}
