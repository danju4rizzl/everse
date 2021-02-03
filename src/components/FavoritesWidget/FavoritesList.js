import React from 'react';
import Favorite from './Favorite';
import AddButtonIcon from '../AddButtonIcon';

const FavoritesList = ({ favorites, toggleForm, onDelete }) => {
  return (
    <div className="favorites__inner">
      <ul className="favorites__list px-0 py-2">
        <AddButtonIcon
          isVisible={true}
          onAdd={toggleForm}
          iconContainerStyles={{ display: 'inline-block' }}
        />
        {favorites.map((favorite) => {
          const {
            id,
            favorite: { name, url },
            bgColor,
          } = favorite;

          return (
            <Favorite
              key={id}
              name={name}
              url={url}
              bgColor={bgColor}
              onDelete={(e) => onDelete(e, id, name)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default FavoritesList;
