/*
This holds the entire elements to be used in the DOM
*/
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
    currentDate: document.querySelector('#date'),
    currentTime: document.querySelector('#time'),
  },
  covidBox: {
    box: document.querySelector('#covid'),
    confirmed: document.querySelector('#confirmed'),
    recovered: document.querySelector('#recovered'),
    deaths: document.querySelector('#deaths'),
  },
};

/*
 App setting 
*/
const appConfig = {
  proxyUrl: 'https://cors-anywhere.herokuapp.com/',
  ourmannaUrl: 'https://beta.ourmanna.com/api/v1/get/?format=json',
  covidUrl: 'https://pomber.github.io/covid19/timeseries.json',
  openWeatherMapApiKey: '8633abd41d2939308a4bdf453fbdcbe9',
  openWeatherMapLocation: 'Cape Town',
  openWeatherMapUnits: 'metric',
};

/*
To handle the verse of the day
*/
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
    })
    .catch(function (error) {
      console.log(error);
    });
}

/*
To handle the current date
*/
function print_date() {
  const { box, currentTime, currentDate } = domStrings.timeBox;
  let session;
  let date = new Date();
  let month = date.getMonth();
  let dYear = date.getFullYear();
  let d = date.getDate();
  let h = date.getHours(); // 0 - 23
  let m = date.getMinutes(); // 0 - 59
  let s = date.getSeconds(); // 0 - 59

  const addZero = (val) => (val < 10 ? `0${val}` : val);

  let timeUI = `${h}:${addZero(m)} ${h < 12 ? 'AM' : 'PM'}`;
  let dateUI = `${addZero(month)}-${addZero(d)}-${dYear}`;
  let time = `${dYear}-${month}-${d}`;

  currentDate.textContent = dateUI;
  currentTime.textContent = timeUI;
  return time;
  // console.log( `${dYear}-${m}-${d}`)
}

/*
To handle the Covid-19 update according to the value (current date) from print_date()
*/
function print_covid() {
  const { confirmed, deaths, recovered } = domStrings.covidBox;
  const { covidUrl } = appConfig;

  axios
    .get(covidUrl)
    .then(function (response) {
      const covidLocation = response.data['South Africa'];

      const filtered = covidLocation.filter((item) => {
        const { confirmed: confirm, deaths: death, recovered: recover } = item;

        const filteredDay = item.date;
        if (filteredDay === print_date()) {
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

/*
To handle the weather of the user
*/
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

// We use this to call all the functions
(async () => {
  await setInterval(() => {
    print_date(domStrings.timeBox);
  }, 1000);
  // await print_weather(domStrings.weatherBox.box);
  // await print_verse();
  await print_covid();
  localStorage.clear();
})();
