// function to add todos to local storage
export function addToLocalStorage(key, item, fn) {
  localStorage.setItem(key, JSON.stringify(item));
  fn(item);
}

// function helps to get everything from local storage
export function getFromLocalStorage(key, item, fn) {
  const reference = localStorage.getItem(key);
  if (reference) {
    item = JSON.parse(reference);
    fn(item);
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
