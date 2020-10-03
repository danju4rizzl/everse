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
const appConfig = {
  proxyUrl: 'https://cors-anywhere.herokuapp.com/',
  ourmannaUrl: 'https://beta.ourmanna.com/api/v1/get/?format=json',
  covidUrl: 'https://pomber.github.io/covid19/timeseries.json',
  openWeatherMapApiKey: '8633abd41d2939308a4bdf453fbdcbe9',
  openWeatherMapLocation: 'New York',
  openWeatherMapUnits: 'metric',
  ipApiUrl: `http://ip-api.com/json`,
};

/*
Default Quick Links
*/
const quickLinks = [
  'amazon.com',
  'facebook.com',
  'twitter.com',
  'youtube.com',
  'gmail.com',
  'google.com',
  'web.whatsapp.com',
];
const userQuickLinks = [];
/*
To handle the verse of the day
*/
function verseWidget() {
  const { ourmannaUrl } = appConfig;
  const { verseContent, verseBook } = domStrings.verseBox;

  function renderVerse(verseOfTheDay) {
    for (const item in verseOfTheDay) {
      if (verseOfTheDay.hasOwnProperty(item)) {
        verseContent.textContent = verseOfTheDay['text'];
        verseBook.textContent = verseOfTheDay['reference'];
      }
    }
  }

  axios
    .get(ourmannaUrl)
    .then(function (response) {
      let { text, reference, version } = response.data.verse.details;
      addToLocalStorage('Current_verse', { text, reference }, renderVerse);
    })
    .catch(function (error) {
      console.log(error);
    });
  getFromLocalStorage('Current_verse', {}, renderVerse);
}

/*
To handle the current date
*/
function dateWidget() {
  let date = new Date();
  let month = date.getMonth();
  let dYear = date.getFullYear();
  let d = date.getDate();
  let h = date.getHours(); // 0 - 23
  let m = date.getMinutes(); // 0 - 59
  let s = date.getSeconds(); // 0 - 59
  const { currentTime, currentDate } = domStrings.timeBox;

  addZero = (val) => (val < 10 ? `0${val}` : val);

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
function covidWidget(usersCountry) {
  const { confirmed, deaths, recovered } = domStrings.covidBox;
  const { covidUrl } = appConfig;

  axios
    .get(covidUrl)
    .then(function (response) {
      const country = usersCountry === 'United States' ? 'US' : usersCountry;

      const covidLocation = response.data[country];

      covidLocation.filter((item) => {
        const { confirmed: confirm, deaths: death, recovered: recover } = item;
        const filteredDay = item.date;

        if (filteredDay === dateWidget()) {
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
function weatherWidget(userCity) {
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
      q: userCity,
      appid: openWeatherMapApiKey,
      units: openWeatherMapUnits,
    },
    // headers: { 'user-agent': 'vscode-restclient' },
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

// function to add todos to local storage
function addToLocalStorage(key, item, fn) {
  localStorage.setItem(key, JSON.stringify(item));
  fn(item);
}

// function helps to get everything from local storage
function getFromLocalStorage(key, item, fn) {
  const reference = localStorage.getItem(key);
  if (reference) {
    item = JSON.parse(reference);
    fn(item);
  }
}

/*
To handle the todo widget
*/
function todoWidget() {
  const { todoForm, todoInput, todoItemsList } = domStrings.todoBox;
  let todos = [];

  todoForm.addEventListener('submit', function (event) {
    console.log('clicked');

    event.preventDefault();
    addTodo(todoInput.value);
  });

  // function to add todo
  function addTodo(item) {
    if (item !== '') {
      const todo = {
        id: Date.now(),
        name: item,
        completed: false,
      };

      todos.unshift(todo);
      addToLocalStorage('Current_todos', todos, renderTodos);

      todoInput.value = '';
    }
  }

  // function to render given todos to screen
  function renderTodos(todos) {
    todoItemsList.innerHTML = '';

    todos.forEach(function (item) {
      const checked = item.completed ? 'checked' : null;

      const li = document.createElement('li');
      li.setAttribute('class', 'item');
      li.setAttribute('data-key', item.id);

      if (item.completed === true) {
        li.classList.add('checked');
      }

      li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
      todoItemsList.append(li);
    });
  }

  // toggle the value to completed and not completed
  function toggle(id) {
    todos.forEach(function (item) {
      if (item.id == id) {
        item.completed = !item.completed;
      }
    });

    addToLocalStorage('Current_todos', todos, renderTodos);
  }

  // deletes a todo from todos array, then updates localstorage and renders updated list to screen
  function deleteTodo(id) {
    todos = todos.filter(function (item) {
      return item.id != id;
    });

    addToLocalStorage('Current_todos', todos, renderTodos);
  }

  // after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
  todoItemsList.addEventListener('click', function (event) {
    if (event.target.type === 'checkbox') {
      toggle(event.target.parentElement.getAttribute('data-key'));
    }

    if (event.target.classList.contains('delete-button')) {
      deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
  });

  getFromLocalStorage('Current_todos', todos, renderTodos);
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

// Handle User Location
function handleLocation() {
  // if ('geolocation' in navigator) {
  //   navigator.geolocation.getCurrentPosition(
  //     function success(position) {
  //       console.log(
  //         'latitude',
  //         position.coords.latitude,
  //         'longitude',
  //         position.coords.longitude
  //       );
  //     },
  //     function error(error_message) {
  //       console.log(
  //         'An error has occured whale retrieving location',
  //         error_message
  //       );
  //     }
  //   );
  // } else {
  //   console.log('geolocation is not enabled on this browser');
  // }

  return ipLookUp();
}

// Handle User ip-location
function ipLookUp() {
  const options = {
    method: 'GET',
    url: appConfig.ipApiUrl,
  };

  axios
    .request(options)
    .then(function (response) {
      let { city, country } = response.data;
      weatherWidget(city);
      covidWidget(country);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

function quickLinkWidget(listItems) {
  const {
    main,
    quickLinksList,
    quickLinkNameInput,
    quickLinkUrlInput,
    quickLinkAddBtn,
    quickLinkCancelBtn,
  } = domStrings.quickLinkBox;

  function renderItems(listItems) {
    for (let item = 0; item < listItems.length; item++) {
      let el = listItems[item];
      quickLinksList.innerHTML += allLink(el);
    }
    quickLinksList.innerHTML += addLinkButton();
  }
  let allLink = (el) =>
    `<li class="quick-link__item"><a href="http://${el}" class="quick-link__link"><img src="http://www.google.com/s2/favicons?domain=https://${el}" alt="everse quick link icon ${el}" class="quick-link__img"></a></li>`;

  let addLinkButton = () =>
    `<li class="quick-link__item quick-link__item--plus" title="Create new Link"><img src="./img/links/plus.svg" alt="everse quick link icon plus new" class="quick-link__img"></li>`;

  let newLinkButton = (url, name) =>
    `<li class="quick-link__item quick-link__item--new"><a href="http://${url}" class="quick-link__link"><img src="http://www.google.com/s2/favicons?domain=https://${url}" alt="everse quick link icon ${name}" class="quick-link__img"></a></li>`;
  renderItems(quickLinks);
  toggleDisplay(quickLinksList.querySelector('.quick-link__item--plus'));
  toggleDisplay(quickLinkCancelBtn);

  quickLinkAddBtn.addEventListener('click', function (e) {
    e.preventDefault();
    handleNewLinks();
  });
  function toggleDisplay(el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      // console.log('prevented');
      toggleForm(main);
    });
  }

  function handleNewLinks() {
    let urlName = quickLinkNameInput.value;
    let urlLink = quickLinkUrlInput.value;

    // ${urlName[0].toUpperCase()} to get the first alphabet of urlName
    if (urlLink === '' || urlName === '') return;
    else {
      listItems.push(urlLink);
      quickLinkNameInput.value = '';
      quickLinkUrlInput.value = '';
      toggleForm(main);
      // renderItems(listItems);
      // quickLinksList.innerHTML = '';
    }

    // quickLinksList.innerHTML += newLinkButton(urlLink, urlName);
    // addLinkButton();
  }
}

function toggleForm(el) {
  const c = el.children;
  c[0].classList.toggle('toggledWidget');
  c[1].classList.toggle('toggledWidget');
}

// handles ALL UI function calls
function runApp() {
  verseWidget();
  setInterval(() => {
    dateWidget();
  }, 1000);
  quickLinkWidget(quickLinks);
  todoWidget();
  handleLocation();
}

// We use this to call all the functions
(async () => {
  // localStorage.clear();
  if (localStorage.length <= 0) {
    // runApp();
    return;
  }
  verseWidget();
  quickLinkWidget(quickLinks);
  // runApp();
})();

/*
 *** Gets the fave icon
 */

const getFavicon = function () {
  let favicon = undefined;
  let nodeList = document.getElementsByTagName('link');
  for (let i = 0; i < nodeList.length; i++) {
    if (
      nodeList[i].getAttribute('rel') == 'icon' ||
      nodeList[i].getAttribute('rel') == 'shortcut icon'
    ) {
      favicon = nodeList[i].getAttribute('href');
    }
  }
  return favicon;
};
