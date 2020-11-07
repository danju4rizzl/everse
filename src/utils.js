import axios from 'axios';

// function to add todos to local storage
export function addToLocalStorage(key, item, fn) {
  localStorage.setItem(key, JSON.stringify(item));
  fn(item);
}

// function helps to get everything from local storage
export function getFromLocalStorage(refKey, refItems, handleRefItems) {
  const reference = localStorage.getItem(refKey);
  if (reference) {
    refItems = JSON.parse(reference);
    handleRefItems(refItems);
  }
}

// Save the value
export function storeContents(item, itemObject) {
  let savedValues;

  localStorage.setItem(item, JSON.stringify(itemObject));

  if (localStorage.getItem(item)) {
    let savedValues = JSON.parse(localStorage.getItem(item));
    return savedValues;
  }

  return savedValues;
}

/*
 * Gets the fave icon
 */
export const getFavicon = function () {
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

/*
Format months as strings
*/
export const formattedMonth = (arrayOfTheMonth) => {
  let date = new Date();
  arrayOfTheMonth = new Array();

  arrayOfTheMonth[0] = 'Jan';
  arrayOfTheMonth[1] = 'Feb';
  arrayOfTheMonth[2] = 'Mar';
  arrayOfTheMonth[3] = 'Apr';
  arrayOfTheMonth[4] = 'May';
  arrayOfTheMonth[5] = 'Jun';
  arrayOfTheMonth[6] = 'Jul';
  arrayOfTheMonth[7] = 'Aug';
  arrayOfTheMonth[8] = 'Sep';
  arrayOfTheMonth[9] = 'Oct';
  arrayOfTheMonth[10] = 'Nov';
  arrayOfTheMonth[11] = 'Dec';
  return arrayOfTheMonth[date.getMonth()];
};
/*
Returns a formatted date string for covidWidget
*/
export const dateFormatted = function () {
  let date = new Date();
  let month = date.getMonth();
  let dYear = date.getFullYear();
  let d = date.getDate();

  return `${dYear}-${month}-${d}`;
};

/*
Fetch data using axios 
*/
export const fetchData = async (arg) => {
  const response = await axios.get(arg);
  if (response.data.error) {
    return [];
  }
  return response.data;
};
