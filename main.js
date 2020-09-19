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
  todoBox: {
    todoInput: document.querySelector('.todo__input'),
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
      const verseObj = {
        verse: text,
        book: reference,
      };

      let updateDailyVerse = storeContents('Current_verse', verseObj);
      // STOPED hERE*******
      for (const item in updateDailyVerse) {
        if (updateDailyVerse.hasOwnProperty(item)) {
          const savedVerse = updateDailyVerse['verse'];
          const savedBook = updateDailyVerse['book'];

          verseContent.textContent = savedVerse;
          verseBook.textContent = savedBook;
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

addZero = (val) => (val < 10 ? `0${val}` : val);
addElementToDom = (element, value) => (element.textContent = value);

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
  let s = date.getSeconds(); // 0 - 59

  let time = `${dYear}-${month}-${d}`;

  let timeObj = {
    currentTime: `${h}:${addZero(m)} ${h < 12 ? 'AM' : 'PM'}`,
    currentDate: `${addZero(month)}-${addZero(d)}-${dYear}`,
  };

  let updatedTimeValues = storeContents('Current_Time', timeObj);
  // console.log(updatedTimeValues);
  currentTime.textContent = updatedTimeValues.currentTime;
  currentDate.textContent = updatedTimeValues.currentDate;

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

      covidLocation.filter((item) => {
        const { confirmed: confirm, deaths: death, recovered: recover } = item;
        const filteredDay = item.date;

        if (filteredDay === print_date()) {
          const covidObj = {
            confirm,
            death,
            recover,
          };
          const covidUpdate = storeContents('Current_covid', covidObj);
          // console.log(covidUpdate);
          confirmed.textContent = `Cases: ${covidUpdate.confirm}`;
          deaths.textContent = `Death: ${covidUpdate.death}`;
          recovered.textContent = `Recovered: ${covidUpdate.recover} `;
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

      const weatherObject = {
        weatherLocation,
        weatherTemperature,
      };
      const weatherUpdate = storeContents('Current_weather', weatherObject);
      // console.log(weatherUpdate);
      location.textContent = weatherUpdate.weatherLocation;
      temp.textContent = weatherUpdate.weatherTemperature;
    })
    .catch((error) => {
      console.error(error);
    });
}

// We use this to call all the functions
(async () => {
  // localStorage.clear();
  if (localStorage.length <= 0) {
    runApp();
  }
  //  else runApp();
  // else runApp();

  // if (localStorage.length > 0) {
  //   await print_date();
  //   // getContents(print_weather);
  // }
})();

function runApp() {
  print_verse();
  print_weather();
  print_covid();
  setInterval(() => {
    print_date();
  }, 1000);
}

// Save the value
function storeContents(item, itemObject) {
  let savedValues;
  localStorage.setItem(item, JSON.stringify(itemObject));

  if (localStorage.getItem(item)) {
    let savedValues = JSON.parse(localStorage.getItem(item));
    return savedValues;
  }
  return savedValues;
}

// TODO LIST
/*
REMEMBER to add key event on enter 
REMEMBER to add make the list scrollbar so users can scroll in the list 
*/

// Create a "close" button and append it to each list item
const todoItem = document.getElementsByTagName('LI');

for (i = 0; i < todoItem.length; i++) {
  let span = document.createElement('SPAN');
  let txt = document.createTextNode('\u00D7');

  span.className = 'close';
  span.appendChild(txt);
  todoItem[i].appendChild(span);
}

// Click on a close button to hide the current list item
const close = document.getElementsByClassName('close');

for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    const div = this.parentElement;
    div.style.display = 'none';
  };
}

// Add a "checked" symbol when clicking on a list item
const list = document.querySelector('ul');
list.addEventListener(
  'click',
  function (e) {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('checked');
    }
  },
  false
);

// Create a new list item when clicking on the "Add" button
function newElement() {
  const li = document.createElement('li');
  var inputValue = document.getElementById('myInput').value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert('You must write something!');
  } else {
    document.getElementById('myUL').appendChild(li);
  }
  document.getElementById('myInput').value = '';

  var span = document.createElement('SPAN');
  var txt = document.createTextNode('\u00D7');
  span.className = 'close';
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = 'none';
    };
  }
}

function handleKeyboard(e) {
  domStrings.todoBox.todoInput.addEventListener('keydown', function (e) {
    console.log('clicked');
    if (e.keyCode == 13) {
      newElement();
    }
  });
}
handleKeyboard();
