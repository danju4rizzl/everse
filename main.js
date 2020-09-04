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

(() => {
  axios
    .get(proxyUrl + url)
    .then(function (response) {
      let { text, reference, version } = response.data.verse.details;
      print_verse_content(text);
      print_verse_book(reference);
    })
    .catch(function (error) {
      console.log(error);
    });
})();
