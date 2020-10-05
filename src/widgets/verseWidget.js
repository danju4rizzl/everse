import axios from 'axios';
import { appConfig, domStrings } from '../appSettings';
import { addToLocalStorage, getFromLocalStorage } from '../utils';

/*
  To handle the verse of the day
  */

export function verseWidget() {
  const { ourmannaUrl } = appConfig;
  const { verseContent, verseBook } = domStrings.verseBox;

  function renderVerse(verseOfTheDay) {
    for (const item in verseOfTheDay) {
      if (verseOfTheDay.hasOwnProperty(item)) {
        verseContent.textContent = verseOfTheDay['text'];
        verseBook.textContent = verseOfTheDay['reference'];
      }
    }
  }

  axios
    .get(ourmannaUrl)
    .then(function (response) {
      let { text, reference, version } = response.data.verse.details;
      addToLocalStorage('Current_verse', { text, reference }, renderVerse);
    })
    .catch(function (error) {
      console.log(error);
    });
  getFromLocalStorage('Current_verse', {}, renderVerse);
}
