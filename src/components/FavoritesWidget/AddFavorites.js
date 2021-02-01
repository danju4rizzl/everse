import React, { useState, useEffect } from 'react';
import { isInputEmpty } from '../../utils';
import { useSpring, animated } from 'react-spring';
import AddButtonIcon from '../AddButtonIcon';
import CancelButtonIcon from '../CancelButtonIcon';
import validator from 'validator';

const AddFavorites = ({ isToggled, onAdd }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const fadeInAnimation = useSpring({ opacity: 1, from: { opacity: 0 } });

  const onSubmit = (e) => {
    e.preventDefault();

    if (validator.isURL(url, { require_protocol: true })) {
      setUrl(url.toLowerCase());
    } else {
      alert('Please enter a  valid URL.');
      return;
    }

    onAdd({ name, url });
    setName('');
    setUrl('');
    isToggled();
  };

  const validateInput = (name, url) => {
    if (name && url) return true;
  };

  return (
    <animated.form
      autoComplete="off"
      onSubmit={onSubmit}
      style={fadeInAnimation}
      className="favorites__form"
    >
      <div className="favorites__form-name my-2">
        <input
          type="text"
          className=" form-control"
          placeholder="Website Name "
          id="favoritesName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="favorites__form-url my-2">
        <input
          type="url"
          className=" form-control"
          placeholder="Website URL "
          id="favoritesURL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>

      <div className="favorites_form-controls my-3 d-flex justify-content-between">
        <CancelButtonIcon isVisible={true} onCancel={isToggled} />
        {validateInput(name, url) && (
          <AddButtonIcon isVisible={true} onAdd={onSubmit} />
        )}
      </div>
    </animated.form>
  );
};

export default AddFavorites;
