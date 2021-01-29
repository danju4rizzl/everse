import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onDelete }) => {
  return (
    <div className="task__list my-2">
      <ul className="list-group mr-1 flex-column-reverse">
        {tasks.map((item) => (
          <Task task={item} key={item.id} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
