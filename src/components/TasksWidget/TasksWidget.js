import React, { useState, useEffect } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import store from 'store';

const TasksWidget = () => {
  const [tasks, setTasks] = useState([]);
  const storageKey = 'Current_tasks';

  useEffect(() => {
    const storedTasks = store.get(storageKey);
    storedTasks && setTasks(storedTasks);
  }, []);

  useEffect(() => {
    store.set(storageKey, tasks);
  }, [tasks]);

  // Delete task from localStorage
  const deleteTask = (id) => {
    const canDelete = confirm('Are you sure you want to delete this task');
    canDelete && setTasks(tasks.filter((task) => task.id !== id));
  };

  // Adds new task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 1000) + 1;

    const newTask = { id, task };
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <AddTask onAdd={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
};

export default TasksWidget;
