import React, { useState, useEffect } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import store from 'store';

const TasksWidget = () => {
  const [tasks, setTasks] = useState([]);
  const storageKey = 'Current_tasks';
  // Add a state hook to watch the checkbox to pass down to children components
  const [checked, setChecked] = useState(false);

  //* Fetch all task from localStorage
  const fetchTask = (task) => {};

  const saveTask = (taskKey, task) => {
    localStorage.setItem(taskKey, JSON.stringify(task));
  };

  //* Update selected task
  const completedTask = (id) => {
    // tasks.map((task) => {
    //   if (task.id !== id) return;
    //   setTasks(tasks.map((item)=> item));
    // });

    // const taskToToggleId = (id) => {
    //   for (const task of taskToToggle) {
    //     return task.id;
    //   }
    // };
    // console.log(taskToToggleId());

    const taskToToggle = store.get(storageKey);

    const toggleId = taskToToggle.filter((task) => task.id === id);

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, checked: !checked } : task
      )
    );
    store.set(storageKey, tasks);
  };

  useEffect(() => {
    const storedTasks = store.get(storageKey);
    // console.log(storedTasks);
    storedTasks === undefined ? [] : setTasks(storedTasks);

    //! You toped here in the article of useEffect section
    // ! localStorage.setItem('items', JSON.stringify(items));
  }, []);

  // Delete task from localStorage
  const deleteTask = (id) => {
    const canDelete = confirm('Are you sure you want to delete this task');

    if (!canDelete) return;

    setTasks(tasks.filter((task) => task.id !== id));
    store.set(storageKey, tasks);
  };

  // Adds new task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 1000) + 1;

    const newTask = { id, task, checked };
    setTasks([...tasks, newTask]);
    store.set(storageKey, tasks);
  };

  return (
    <div>
      <AddTask onAdd={addTask} />
      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onComplete={completedTask}
      />
    </div>
  );
};

export default TasksWidget;
