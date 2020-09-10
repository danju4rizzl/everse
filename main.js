const domStrings = {
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
    date: document.querySelector('#date'),
    time: document.querySelector('#time'),
  },
  covidBox: {
    box: document.querySelector('#covid'),
    confirmed: document.querySelector('#confirmed'),
    recovered: document.querySelector('#recovered'),
    deaths: document.querySelector('#deaths'),
  },
};

const appConfig = {
  proxyUrl: 'https://cors-anywhere.herokuapp.com/',
  ourmannaUrl: 'https://beta.ourmanna.com/api/v1/get/?format=json',
  covidUrl: 'https://pomber.github.io/covid19/timeseries.json',
  openWeatherMapApiKey: '8633abd41d2939308a4bdf453fbdcbe9',
  openWeatherMapLocation: 'Cape Town',
  openWeatherMapUnits: 'metric',
};

function print_verse() {
  const { verseContent, verseBook } = domStrings.verseBox;
  const { proxyUrl, ourmannaUrl } = appConfig;

  axios
    .get(ourmannaUrl)
    .then(function (response) {
      let { text, reference, version } = response.data.verse.details;

      const verseInfo = {
        verse: text,
        book: reference,
      };

      saveContents(verseInfo, verseContent, verseBook);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function print_date(timeBox) {
  let date = new Date();
  let d = date.getDate();
  let dDay = date.getMonth();
  let dYear = date.getFullYear();
  let h = date.getHours(); // 0 - 23
  let m = date.getMinutes(); // 0 - 59
  let s = date.getSeconds(); // 0 - 59
  let session;

  const addZero = (val) => (val < 10 ? `0${val}` : val);

  let timeUI = `${h}:${addZero(m)}`;
  let dateUI = `${addZero(dDay)}-${addZero(d)}-${dYear}`;

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

  const { location, temp } = domStrings.weatherBox;

  const options = {
    method: 'GET',
    url: `https://api.openweathermap.org/data/2.5/weather`,
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
      // console.log(response.data);

      let weatherLocation = response.data.name;
      let weatherTemperature = `${Math.round(response.data.main.temp)}°`;

      location.textContent = weatherLocation;
      temp.textContent = weatherTemperature;
    })
    .catch((error) => {
      console.error(error);
    });

  weatherDisplay.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('submitted', e.target.value);
  });
}

function print_covid() {
  const { confirmed, box, deaths, recovered } = domStrings.covidBox;
  const { proxyUrl, covidUrl } = appConfig;

  axios
    .get(covidUrl)
    .then(function (response) {
      const covidLocation = response.data['South Africa'];

      const filtered = covidLocation.filter((item) => {
        // console.log(item.date.length - 1);
        // item.filter((day) => day.date.length - 1);
        const { confirmed: confirm, deaths: death, recovered: recover } = item;
        const filteredDay = item.date;
        if (filteredDay === getToday()) {
          console.log(item);
          confirmed.textContent = `Cases: ${confirm}`;
          deaths.textContent = `Death: ${death}`;
          recovered.textContent = `Recovered: ${recover} `;
        }

        return [];
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getToday() {
  let date = new Date();
  let d = date.getDate();
  let m = date.getMonth();
  let dYear = date.getFullYear();

  return `${dYear}-${m}-${d}`;
}

function saveContents(itemObject, verse, book) {
  localStorage.setItem('verseOfTheDay', JSON.stringify(itemObject));

  const localVerse = localStorage.getItem('verseOfTheDay');
  const storedVerseOfTheDay = JSON.parse(localVerse);

  verse.textContent = storedVerseOfTheDay.verse;
  book.textContent = storedVerseOfTheDay.book;
}

// We use the iffi to call all the functions
(async () => {
  await setInterval(() => {
    print_date(domStrings.timeBox);
  }, 1000);
  await print_weather(domStrings.weatherBox.box);
  await print_verse();
  await print_covid();
})();
