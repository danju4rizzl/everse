import { appConfig, domStrings } from '../appSettings';
import { addToLocalStorage, getFromLocalStorage } from '../utils';

export function quickLinkWidget(listItems) {
  const {
    quickLinksMain,
    quickLinkNameInput,
    quickLinkUrlInput,
    quickLinkAddBtn,
    quickLinkCancelBtn,
    quickLinkRemoveBtn,
  } = domStrings.quickLinkBox;

  const quickLinksList = document.createElement('ul');
  quickLinksList.classList.add('quick-link__list');
  quickLinksMain.append(quickLinksList);
  const customLinksObject = {};

  let defaultLink = (url) => {
    return `<li class="quick-link__item" title="${url.toUpperCase()}"><a href="https://${url}" class="quick-link__link"><img src="./img/links/${url}.svg" class="quick-link__img"></a>   <span class="quick-link__item-remove" title="DELETE">-</span></li>`;
  };

  let newLinkButton = (newLinkObject) =>
    `<li class="quick-link__item quick-link__item--new">
      <a href="http://${newLinkObject.url}" class="quick-link__link">${newLinkObject.name}</a><span class="quick-link__item-remove" title="DELETE">-</span>
     </li>
     `;

  let addLinkButton = () =>
    `<li class="quick-link__item quick-link__item--plus" title="Create new Link"><img src="https://image.flaticon.com/icons/png/512/2740/2740697.png" alt="everse quick link icon plus new" class="quick-link__img"></li>`;

  function renderDefault(listItems) {
    for (let item of listItems) {
      quickLinksList.innerHTML += defaultLink(item);
    }
  }

  renderDefault(listItems);
  quickLinksList.innerHTML += addLinkButton();
  toggleDisplay(quickLinksList.querySelector('.quick-link__item--plus'));
  toggleDisplay(quickLinkCancelBtn);

  quickLinkAddBtn.addEventListener('click', function (e) {
    e.preventDefault();
    handleNewLinks();
    quickLinksList.innerHTML = '';
    renderDefault(listItems);
    quickLinksList.innerHTML += newLinkButton(customLinksObject);
    quickLinksList.innerHTML += addLinkButton();
    toggleDisplay(quickLinksList.querySelector('.quick-link__item--plus'));
  });

  function toggleDisplay(el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      toggleForm(quickLinksMain);
    });
  }

  function renderCustomLinks() {
    quickLinksList.innerHTML += newLinkButton(customLinksObject);
    // quickLinksList.innerHTML += addLinkButton();
  }

  function handleNewLinks() {
    let urlName = quickLinkNameInput.value;
    let urlLink = quickLinkUrlInput.value;

    // ${urlName[0].toUpperCase()} to get the first alphabet of urlName

    if (urlLink === '' || urlName === '') return;

    customLinksObject.url = urlLink;
    customLinksObject.name = urlName[0].toUpperCase();

    quickLinkNameInput.value = '';
    quickLinkUrlInput.value = '';

    toggleForm(quickLinksMain);

    //  TODO get the new quicklink  icon added to the DOM
    // 1. Remove or clear the current rendered icons
    // 2. create another array to store the new icons
    // 3. Add the new icon to the array
    // 4. render the list again and with the new links from the array
  }

  function toggleForm(el) {
    const c = el.children;
    c[0].classList.toggle('toggledWidget');
    c[1].classList.toggle('toggledWidget');
  }
}
