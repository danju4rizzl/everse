import React, { useState } from 'react';
import CheckButton from '../CheckButton';
import DeleteButtonIcon from '../DeleteButtonIcon';

const Task = ({ task, onDelete, onComplete }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center mb-1">
      <CheckButton
        onComplete={() => onComplete(task.id)}
        // isChecked={task.checked}
      />
      {task.task}
      <DeleteButtonIcon onDelete={() => onDelete(task.id)} />
    </li>
  );
};

export default Task;
