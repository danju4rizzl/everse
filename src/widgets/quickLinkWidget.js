import { appConfig, domStrings, quickLinks } from '../appSettings';
import { addToLocalStorage, getFromLocalStorage } from '../utils';

export function quickLinkWidget() {
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

  let newLink = (url, name, bg) => {
    const quickLinkNewLi = document.createElement('li');
    const quickLinkNewA = document.createElement('a');
    const quickLinkNewSpan = document.createElement('span');

    quickLinkNewLi.classList.add('quick-link__item');

    quickLinkNewLi.classList.add('quick-link__item--new');

    quickLinkNewA.classList.add('quick-link__link');
    quickLinkNewSpan.classList.add('quick-link__item-remove');

    quickLinkNewLi.title = name.toUpperCase();
    quickLinkNewSpan.title = `DELETE`;

    quickLinkNewA.href = `https://${url}`;
    quickLinkNewA.textContent = name.slice(0, 2).toUpperCase();

    quickLinkNewLi.append(quickLinkNewA);
    quickLinkNewLi.append(quickLinkNewSpan);

    quickLinkNewLi.style.backgroundColor = bg;
    return quickLinkNewLi;

    // `< class="quick-link__item quick-link__item--new">
    //   <a href="http://${newLinkObject.url}" class="quick-link__link">${newLinkObject.name}</a><span class="quick-link__item-remove" title="DELETE">-</span>
    //  </>
    //  `;
  };

  let addLinkButton = () =>
    `<li class="quick-link__item quick-link__item--plus" title="Create new Link"><img src="https://image.flaticon.com/icons/png/512/2740/2740697.png" alt="everse quick link icon plus new" class="quick-link__img"></li>`;

  //! Add new links when user clicks on "ADD" button
  function creatNewLink(domElement) {
    domElement.addEventListener('click', function (e) {
      handleNewLinks();
      toggleDisplay(quickLinksList.querySelector('.quick-link__item--plus'));

      e.preventDefault();
    });
  }

  // ? To handle the newly added links from the user durning quickLinkAddBtn events
  function handleNewLinks() {
    let urlName = quickLinkNameInput.value;
    let urlLink = quickLinkUrlInput.value;

    if (urlLink === '' || urlName === '') return;

    storeUsersLinks(urlName, urlLink);
    quickLinkNameInput.value = '';
    quickLinkUrlInput.value = '';
    fetchBookmarks();
    toggleClass(quickLinksMain);
  }
  // ! Fetch Bookmarks saved in the browsers local storage
  function fetchBookmarks() {
    let currentLink = JSON.parse(localStorage.getItem('Current_link'));
    quickLinksList.innerHTML = '';

    for (let item = 0; item < currentLink.length; item++) {
      const { url, name, color } = currentLink[item];
      quickLinksList.prepend(newLink(url, name, color));
    }
    quickLinksList.innerHTML += addLinkButton();
  }

  // ! Store new Bookmarks to the browsers localStorage
  function storeUsersLinks(name, url) {
    const userQuickLink = {
      name,
      url,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    };

    if (localStorage.getItem('Current_link') === null) {
      let currentLink = [];
      currentLink.push(userQuickLink);
      localStorage.setItem('Current_link', JSON.stringify(currentLink));
    } else {
      let currentLink = JSON.parse(localStorage.getItem('Current_link'));
      currentLink.push(userQuickLink);
      localStorage.setItem('Current_link', JSON.stringify(currentLink));
    }
  }

  // ! Toggles between the form and quick links list
  function toggleDisplay(el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      toggleClass(quickLinksMain);
    });
  }

  // ! Toggles a class between children element of a given parent
  function toggleClass(el) {
    const c = el.children;
    c[0].classList.toggle('toggledWidget');
    c[1].classList.toggle('toggledWidget');
  }

  if (localStorage.getItem('Current_link')) {
    fetchBookmarks();
  } else quickLinksList.innerHTML += addLinkButton();

  creatNewLink(quickLinkAddBtn);

  toggleDisplay(quickLinksList.querySelector('.quick-link__item--plus'));
  toggleDisplay(quickLinkCancelBtn);
}
