import { appConfig, domStrings } from '../appSettings';
import { addToLocalStorage, getFromLocalStorage } from '../utils';

export function quickLinkWidget(listItems) {
  const {
    main,
    quickLinksList,
    quickLinkNameInput,
    quickLinkUrlInput,
    quickLinkAddBtn,
    quickLinkCancelBtn,
    quickLinkRemoveBtn,
  } = domStrings.quickLinkBox;

  let allLink = (el) => {
    return `<li class="quick-link__item" title="${el.toUpperCase()}"><a href="http://${el}" class="quick-link__link"><img src="http://www.google.com/s2/favicons?domain=https://${el}" alt="everse quick link icon ${el}" class="quick-link__img"></a>   <span class="quick-link__item-remove" title="DELETE">-</span></li>`;
  };

  let addLinkButton = () =>
    `<li class="quick-link__item quick-link__item--plus" title="Create new Link"><img src="https://image.flaticon.com/icons/png/512/2740/2740697.png" alt="everse quick link icon plus new" class="quick-link__img"></li>`;

  let newLinkButton = (url, name) =>
    `<li class="quick-link__item quick-link__item--new"><a href="http://${url}" class="quick-link__link"><img src="http://www.google.com/s2/favicons?domain=https://${url}" alt="everse quick link icon ${name}" class="quick-link__img"></a></li>`;

  function renderItems(listItems) {
    for (let item = 0; item < listItems.length; item++) {
      let el = listItems[item];
      quickLinksList.innerHTML += allLink(el);
    }

    quickLinksList.innerHTML += addLinkButton();
  }

  function removeItems(elements) {
    console.log(elements);
    // elements.children()
  }

  renderItems(listItems);
  toggleDisplay(quickLinksList.querySelector('.quick-link__item--plus'));
  toggleDisplay(quickLinkCancelBtn);

  quickLinkAddBtn.addEventListener('click', function (e) {
    e.preventDefault();
    handleNewLinks();

    quickLinksList.innerHTML = '';

    renderItems(listItems);
    toggleDisplay(quickLinksList.querySelector('.quick-link__item--plus'));
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
    }
  }

  function toggleForm(el) {
    const c = el.children;
    c[0].classList.toggle('toggledWidget');
    c[1].classList.toggle('toggledWidget');
  }
}
