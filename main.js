const DomStrings = {
  content: document.querySelector('.verse__content'),
  book: document.querySelector('.verse__book'),
};

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://beta.ourmanna.com/api/v1/get/?format=json';

function createNode(element) {
  return document.createElement(element);
}
function append(parent, el) {
  return parent.appendChild(el);
}

function print_verse_content(content) {
  return (DomStrings.content.textContent = content);
}

function print_verse_book(book) {
  return (DomStrings.book.textContent = book);
}

function saveContents(itemObject) {
  localStorage.setItem('verseOfTheDay', JSON.stringify(itemObject));
  const localVerse = localStorage.getItem('verseOfTheDay');
  const storedVerseOfTheDay = JSON.parse(localVerse);

  print_verse_content(storedVerseOfTheDay.verse);
  print_verse_book(storedVerseOfTheDay.book);
}

(() => {
  axios
    .get(proxyUrl + url)
    .then(function (response) {
      let { text, reference, version } = response.data.verse.details;

      // Remember to replace this object with real api calls
      const verseInfo = {
        verse:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, quo!',
        book: 'Lorem ipsum',
      };

      // print_verse_content(text);
      // print_verse_book(reference);
      saveContents(verseInfo);
    })
    .catch(function (error) {
      console.log(error);
    });
})();
