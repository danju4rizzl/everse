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
  const { ourmannaUrl } = appConfig;
  const { verseContent, verseBook } = domStrings.verseBox;

  axios
    .get(ourmannaUrl)
    .then(function (response) {
      let { text, reference, version } = response.data.verse.details;
      verseContent.textContent = text;
      verseBook.textContent = reference;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/*
To handle the current date
*/
function print_date() {
  const { currentTime, currentDate } = domStrings.timeBox;

  let date = new Date();
  let month = date.getMonth();
  let dYear = date.getFullYear();
  let d = date.getDate();
  let h = date.getHours(); // 0 - 23
  let m = date.getMinutes(); // 0 - 59
  // let s = date.getSeconds(); // 0 - 59

  const addZero = (val) => (val < 10 ? `0${val}` : val);

  let time = `${dYear}-${month}-${d}`;

  currentTime.textContent = `${h}:${addZero(m)} ${h < 12 ? 'AM' : 'PM'}`;
  currentDate.textContent = `${addZero(month)}-${addZero(d)}-${dYear}`;
  return time;
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
function print_weather() {
  const {
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
      let weatherLocation = response.data.name;
      let weatherTemperature = `${Math.round(response.data.main.temp)}°`;

      location.textContent = weatherLocation;
      temp.textContent = weatherTemperature;

      const weatherObject = {
        currentWeatherLocation: weatherLocation,
        currentWeatherTemperature: weatherTemperature,
      };
    })
    .catch((error) => {
      console.error(error);
    });
}

// We use this to call all the functions
(async () => {
  await setInterval(() => {
    //     print_date();
  }, 1000);
  // await print_weather();
  // await print_verse();
  // await print_covid();
  // localStorage.clear();
  if (localStorage.length <= 0) {
    await print_date();
  }
  if (localStorage.length > 0) {
    // getContents(print_weather);
  }
})();

// Save the value
function storeContents(item, itemObject) {
  localStorage.setItem(item, JSON.stringify(itemObject));
}

function getContents(item) {
  console.log(item());
  let savedValues;
  if (localStorage.getItem(item)) {
    let savedValues = JSON.parse(localStorage.getItem(item));
  }
}
