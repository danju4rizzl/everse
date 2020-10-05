/*
This holds the entire elements to be used in the DOM
*/
export let domStrings = {
  verseBox: {
    verseContent: document.querySelector('.verse__content'),
    verseBook: document.querySelector('.verse__book'),
  },
  weatherBox: {
    box: document.querySelector('#weather'),
    location: document.querySelector('#location'),
    temp: document.querySelector('#temperature'),
  },
  timeBox: {
    box: document.querySelector('#dateTime'),
    currentDate: document.querySelector('#date'),
    currentTime: document.querySelector('#time'),
  },
  covidBox: {
    box: document.querySelector('#covid'),
    confirmed: document.querySelector('#confirmed'),
    recovered: document.querySelector('#recovered'),
    deaths: document.querySelector('#deaths'),
  },
  todoBox: {
    todoForm: document.querySelector('.todo-form'),
    todoInput: document.querySelector('.todo-input'),
    todoItemsList: document.querySelector('.todo-items'),
  },
  quickLinkBox: {
    main: document.querySelector('#quickLinks'),
    quickLinksList: document.querySelector('.quick-link__list'),
    quickLinkNameInput: document.querySelector(
      '.quick-link__form input[type=text]'
    ),
    quickLinkUrlInput: document.querySelector(
      '.quick-link__form input[type=url]'
    ),
    quickLinkAddBtn: document.querySelector('.quick-link__button--add'),
    quickLinkCancelBtn: document.querySelector('.quick-link__button--cancel'),
  },
};

/*
   App setting 
*/
export const appConfig = {
  proxyUrl: 'https://cors-anywhere.herokuapp.com/',
  ourmannaUrl: 'https://beta.ourmanna.com/api/v1/get/?format=json',
  covidUrl: 'https://pomber.github.io/covid19/timeseries.json',
  openWeatherMapApiKey: '8633abd41d2939308a4bdf453fbdcbe9',
  openWeatherMapLocation: 'New York',
  openWeatherMapUnits: 'metric',
  ipApiUrl: `http://ip-api.com/json`,
};
