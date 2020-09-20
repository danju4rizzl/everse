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

/*
To handle the todo widget
*/

function handleTodo() {
  const { todoForm, todoInput, todoItemsList } = domStrings.todoBox;
  let todos = [];

  todoForm.addEventListener('submit', function (event) {
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
      addToLocalStorage(todos);

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

  // function to add todos to local storage
  function addToLocalStorage(todos) {
    localStorage.setItem('Current_todos', JSON.stringify(todos));

    renderTodos(todos);
  }

  // function helps to get everything from local storage
  function getFromLocalStorage() {
    const reference = localStorage.getItem('Current_todos');
    if (reference) {
      todos = JSON.parse(reference);
      renderTodos(todos);
    }
  }

  // toggle the value to completed and not completed
  function toggle(id) {
    todos.forEach(function (item) {
      if (item.id == id) {
        item.completed = !item.completed;
      }
    });

    addToLocalStorage(todos);
  }

  // deletes a todo from todos array, then updates localstorage and renders updated list to screen
  function deleteTodo(id) {
    todos = todos.filter(function (item) {
      return item.id != id;
    });

    addToLocalStorage(todos);
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

  getFromLocalStorage();
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

function runApp() {
  print_verse();
  print_weather();
  print_covid();
  setInterval(() => {
    print_date();
  }, 1000);
  handleTodo();
}

// We use this to call all the functions
(async () => {
  // localStorage.clear();
  if (localStorage.length <= 0) {
    runApp();
    return;
  }
  runApp();
})();
