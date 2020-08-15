const content = document.querySelector('.verse__content');
const book = document.querySelector('.verse_book');

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const api_url =
  'http://www.ourmanna.com/verses/api/get?format=text&order=random';

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

fetch(proxyUrl + api_url)
  .then((response) => response.json())
  .then((data) => console.log(data.body))
  .catch(function () {
    console.error();
  });
