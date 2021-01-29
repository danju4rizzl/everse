import React, { useState } from 'react';
import DeleteButtonIcon from '../DeleteButtonIcon';

const Task = ({ task, onDelete }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center mb-1">
      {task.task}
      <DeleteButtonIcon onDelete={() => onDelete(task.id)} />
    </li>
  );
};

export default Task;
