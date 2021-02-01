import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddButtonIcon from '../AddButtonIcon';

const AddTask = ({ label, onAdd }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert('💁 Type in  a new task the hit enter or click the plus button.');
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
          className="task__form-input form-control"
          placeholder=" "
          id="taskInput"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <label htmlFor="taskInput">{label}</label>
      </form>
      <AddButtonIcon onAdd={onSubmit} isVisible={text.length > 0 && true} />
    </div>
  );
};

AddTask.defaultProps = { label: 'Add a Todo...' };
AddTask.propTypes = { label: PropTypes.string };

export default AddTask;
