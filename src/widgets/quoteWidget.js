import axios from 'axios';
import { appConfig, domStrings } from '../appSettings';
import {
  addToLocalStorage,
  getFromLocalStorage,
  storeContents,
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

  class DefaultQuote {
    constructor(userQuote, userStoredQuote) {
      this.userQuote = userQuote;
      this.userStoredQuote = userStoredQuote;
    }
  }

  //Render the quote from local storage if it exists else render from the server.
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

    const selectedInspired = new DefaultQuote('motivational', randomQuote);

    storeContents('Current_quote', selectedInspired);
    isActive(motivationalBtn);
    isDisabled(spiritualityBtn);
    return renderQuote(randomQuote);
  };

  const isBible = () => {
    const { details } = bibleQuote.verse;
    const selectedBible = new DefaultQuote('bible', details);

    storeContents('Current_quote', selectedBible);

    isActive(spiritualityBtn);
    isDisabled(motivationalBtn);
    return renderQuote(details);
  };

  const quoteLoaded = () => {
    const loadedQuote = JSON.parse(localStorage.getItem('Current_quote'));

    if (loadedQuote !== null) {
      checkQuotes(loadedQuote.userQuote);
    } else {
      isInspired();
    }
  };

  const checkQuotes = (check) => {
    if (check === 'motivational') {
      // Remder quoteOfTheDay from storage
      isInspired();
    } else {
      isBible();
    }
  };

  window.onload = quoteLoaded();
  spiritualityBtn.addEventListener('click', () => isBible());
  motivationalBtn.addEventListener('click', () => isInspired());
}
