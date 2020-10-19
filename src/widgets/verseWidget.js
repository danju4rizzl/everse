import axios from 'axios';
import { appConfig, domStrings } from '../appSettings';
import { addToLocalStorage, getFromLocalStorage, fetchData } from '../utils';

/*
  To handle the verse of the day
*/

export async function verseWidget() {
  const { ourmannaUrl } = appConfig;
  const { verseContent, verseBook } = domStrings.verseBox;

  const dailyVerse = await fetchData(ourmannaUrl);
  let { text, reference, version } = dailyVerse.verse.details;

  function renderVerse(verseOfTheDay) {
    for (const item in verseOfTheDay) {
      if (verseOfTheDay.hasOwnProperty(item)) {
        verseContent.textContent = verseOfTheDay['text'];
        verseBook.textContent = verseOfTheDay['reference'];
      }
    }
  }

  addToLocalStorage('Current_verse', { text, reference }, renderVerse);

  getFromLocalStorage('Current_verse', {}, renderVerse);
}
