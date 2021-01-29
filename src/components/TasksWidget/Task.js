import React from 'react';
import { useSpring, animated } from 'react-spring';
import DeleteButtonIcon from '../DeleteButtonIcon';

const Task = ({ task, onDelete }) => {
  const fadeInAnimation = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <animated.li
      style={fadeInAnimation}
      className="list-group-item d-flex justify-content-between align-items-center mb-1"
    >
      {task.task}
      <DeleteButtonIcon onDelete={() => onDelete(task.id)} />
    </animated.li>
  );
};

export default Task;
