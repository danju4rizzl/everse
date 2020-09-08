const domStrings = {
  content: document.querySelector('.verse__content'),
  book: document.querySelector('.verse__book'),
  weatherBox: {
    box: document.querySelector('#weather'),
    location: document.querySelector('#location'),
  },
  timeBox: {
    box: document.querySelector('#dateTime'),
    date: document.querySelector('#date'),
    time: document.querySelector('#time'),
  },
};
const appConfig = {
  proxyUrl: 'https://cors-anywhere.herokuapp.com/',
  url: 'https://beta.ourmanna.com/api/v1/get/?format=json',
  openWeatherMapApiKey: '8633abd41d2939308a4bdf453fbdcbe9',
  openWeatherMapLocation: 'Cape Town',
  openWeatherMapUnits: 'metric',
};

function print_verse() {
  axios
    .get(appConfig.proxyUrl + appConfig.url)
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

  // TODO: Simplify this
  function print_verse_content(content) {
    return (domStrings.content.textContent = content);
  }

  function print_verse_book(book) {
    return (domStrings.book.textContent = book);
  }
}

function print_date(timeBox) {
  let date = new Date();
  let d = date.getDate();
  let dDay = date.getDay();
  let dYear = date.getFullYear();
  let h = date.getHours(); // 0 - 23
  let m = date.getMinutes(); // 0 - 59
  let s = date.getSeconds(); // 0 - 59
  let session;

  let min = `0${m}`;
  let timeUI = `${h}:${m < 10 ? min : m}`;
  let dateUI = `${dDay}-${d}-${dYear}`;
  session = h < 12 ? 'am' : 'pm';

  timeBox.date.textContent = dateUI;
  timeBox.time.textContent = timeUI;
}

function print_weather(weatherDisplay) {
  const {
    proxyUrl,
    openWeatherMapApiKey,
    openWeatherMapLocation,
    openWeatherMapUnits,
  } = appConfig;

  const options = {
    method: 'GET',
    url: `${proxyUrl}api.openweathermap.org/data/2.5/weather`,
    params: {
      q: openWeatherMapLocation,
      appid: openWeatherMapApiKey,
      units: openWeatherMapUnits,
    },
    headers: { 'user-agent': 'vscode-restclient' },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(response.data);

      let wetherData = response.data.name;
      domStrings.weatherBox.location.textContent = wetherData;
    })
    .catch((error) => {
      console.error(error);
    });

  weatherDisplay.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('submitted', e.target.value);
  });
}

function saveContents(itemObject) {
  localStorage.setItem('verseOfTheDay', JSON.stringify(itemObject));
  const localVerse = localStorage.getItem('verseOfTheDay');
  const storedVerseOfTheDay = JSON.parse(localVerse);

  print_verse_content(storedVerseOfTheDay.verse);
  print_verse_book(storedVerseOfTheDay.book);
}

(async () => {
  await setInterval(() => {
    print_date(domStrings.timeBox);
  }, 1000);
  await print_weather(domStrings.weatherBox.box);
  // await print_verse();
})();
