import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddButtonIcon from '../AddButtonIcon';

const AddTask = ({ label, onAdd }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert('Please add a Task');
      return;
    }
    onAdd(text);
    setText('');
  };

  return (
    <div className="task__add">
      <form
        className="form-floating task__form"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          className="todo__input form-control"
          placeholder=" "
          id="floatingInput"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <label htmlFor="floatingInput">{label}</label>
      </form>
      <AddButtonIcon onAdd={onSubmit} isVisible={text.length > 0 && true} />
    </div>
  );
};

AddTask.defaultProps = { label: 'Add a Todo...' };
AddTask.propTypes = { label: PropTypes.string };

export default AddTask;
