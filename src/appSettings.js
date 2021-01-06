/*
This holds the entire elements to be used in the DOM
*/
export let domStrings = {
  quoteBox: {
    quoteContent: document.querySelector('.quote__content'),
    quoteAuthor: document.querySelector('.quote__author'),
    spiritualityBtn: document.querySelector('.spirituality'),
    motivationalBtn: document.querySelector('.motivational'),
  },
  weatherBox: {
    box: document.querySelector('#weather'),
    location: document.querySelector('#location'),
    temp: document.querySelector('#temperature'),
    fahrenheitBtn: document.getElementById('fahrenheit'),
    celsiusBtn: document.getElementById('celsius'),
  },
  dateTimeBox: {
    box: document.querySelector('#dateTime'),
    currentDate: document.querySelector('#date'),
    currentTime: document.querySelector('#time'),
    greetings: document.querySelector('#greetings'),
  },
  covidBox: {
    box: document.querySelector('.covid'),
  },
  todoBox: {
    todoForm: document.querySelector('.todo-form'),
    todoInput: document.querySelector('.todo-input'),
    todoItemsList: document.querySelector('.todo-items'),
  },
  quickLinkBox: {
    quickLinksMain: document.querySelector('#quickLinks'),
    quickLinksList: document.querySelector('.quick-link__list'),
    quickLinkNameInput: document.querySelector(
      '.quick-link__form input[type=text]'
    ),
    quickLinkUrlInput: document.querySelector(
      '.quick-link__form input[type=url]'
    ),
    quickLinkAddBtn: document.querySelector('.btn-primary'),
    quickLinkCancelBtn: document.querySelector('.btn-danger'),
    quickLinkRemoveBtn: document.querySelector('.quick-link__item-remove'),
    quickLinksCreate: document.querySelector('.quick-link__item--plus'),
  },
};

/*
   App setting 
*/
export const appConfig = {
  proxyUrl: 'https://cors-anywhere.herokuapp.com/',
  ourmannaUrl: 'https://beta.ourmanna.com/api/v1/get/?format=json',
  inspirationalQuoteUrl: `https://type.fit/api/quotes`,
  covidUrl: 'https://pomber.github.io/covid19/timeseries.json',
  openWeatherMapLocation: 'New York',
  openWeatherMapUnits: 'imperial',
  ipApiUrl: `http://ip-api.com/json`,
};

/*
Default Quick Links
*/
export const quickLinks = [
  'amazon.com',
  'facebook.com',
  'twitter.com',
  'youtube.com',
  'gmail.com',
  'google.com',
  'web.whatsapp.com',
];
