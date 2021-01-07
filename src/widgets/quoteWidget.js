import { appConfig, domStrings } from '../appSettings';
import { storeContents, fetchData, isActive, isDisabled } from '../utils';

export async function quoteWidget() {
  const { ourmannaAPI, inspirationalQuoteAPI } = appConfig;
  const {
    quoteContent,
    quoteAuthor,
    motivationalBtn,
    spiritualityBtn,
  } = domStrings.quoteBox;

  const inspiredQuote = await fetchData(inspirationalQuoteAPI);
  const bibleQuote = await fetchData(ourmannaAPI);

  class DefaultQuote {
    constructor(userQuote, userStoredQuote) {
      this.userQuote = userQuote;
      this.userStoredQuote = userStoredQuote;
    }
  }

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

  /**
   * To handle the Motivational quote of the day
   **/

  const isInspired = () => {
    const randomQuote =
      inspiredQuote[Math.floor(Math.random() * inspiredQuote.length)];

    const selectedInspired = new DefaultQuote('motivational', randomQuote);

    storeContents('Current_quote', selectedInspired);
    isActive(motivationalBtn);
    isDisabled(spiritualityBtn);
    return renderQuote(randomQuote);
  };

  /**
   * To handle the Bible quote of the day
   **/

  const isBible = () => {
    const { details: verseOfTheDay } = bibleQuote.verse;
    const selectedBible = new DefaultQuote('bible', verseOfTheDay);

    storeContents('Current_quote', selectedBible);

    isActive(spiritualityBtn);
    isDisabled(motivationalBtn);
    return renderQuote(verseOfTheDay);
  };

  const quoteLoaded = () => {
    const loadedQuote = JSON.parse(localStorage.getItem('Current_quote'));
    if (loadedQuote !== null) {
      renderQuote(loadedQuote.userStoredQuote);
    } else {
      isInspired();
    }
  };

  spiritualityBtn.addEventListener('click', () => isBible());
  motivationalBtn.addEventListener('click', () => isInspired());
  window.onload = quoteLoaded();
}
