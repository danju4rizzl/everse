import React, { useState, useEffect } from 'react';
import AddButtonIcon from '../AddButtonIcon';
import AddFavorites from './AddFavorites';
import FavoritesList from './FavoritesList';
import store from 'store';

const FavoritesWidget = () => {
  const [toggle, setToggle] = useState(false);
  const [texts, setText] = useState([]);
  const storageKey = 'Current_favorite';

  useEffect(() => {
    const storedFavorites = store.get(storageKey);
    storedFavorites && setText(storedFavorites);
  }, []);

  useEffect(() => {
    store.set(storageKey, texts);
  }, [texts]);

  const toggleForm = () => {
    setToggle(!toggle);
  };

  const deleteFavorites = (e, id) => {
    e.preventDefault();
    const confirmDelete = confirm(
      'Are you sure you want to delete this favorite link?'
    );
    confirmDelete && setText(texts.filter((text) => text.id !== id));
  };

  const addFavorite = (favorite) => {
    const id = Math.floor(Math.random() * 1000) + 1;
    const bgColor = `#${Math.floor(Math.random() * 16777215).toString(16)}
    `;
    const newFavorite = { id, bgColor, favorite };
    setText([...texts, newFavorite]);
    console.log(texts);
  };

  return (
    <>
      {!toggle && (
        <FavoritesList
          favorites={texts}
          toggleForm={toggleForm}
          onDelete={deleteFavorites}
        />
      )}
      {toggle && <AddFavorites isToggled={toggleForm} onAdd={addFavorite} />}
    </>
  );
};

export default FavoritesWidget;
