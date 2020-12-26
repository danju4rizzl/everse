import axios from 'axios';
import { appConfig, domStrings } from '../appSettings';
import { addToLocalStorage, getFromLocalStorage, fetchData } from '../utils';

/*
  To handle the verse of the day
*/

export async function quoteWidget() {
  const { ourmannaUrl } = appConfig;
  const { quoteContent, quoteAuthor } = domStrings.quoteBox;

  const dailyQuote = await fetchData(ourmannaUrl);
  let { text, reference } = dailyQuote.verse.details;

  function renderQuote(quoteOfTheDay) {
    for (const item in quoteOfTheDay) {
      if (quoteOfTheDay.hasOwnProperty(item)) {
        quoteContent.textContent = quoteOfTheDay['text'];
        quoteAuthor.textContent = quoteOfTheDay['reference'];
      }
    }
  }

  addToLocalStorage('Current_verse', { text, reference }, renderQuote);

  getFromLocalStorage('Current_verse', {}, renderQuote);
}
