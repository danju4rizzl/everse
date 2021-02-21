import React from 'react';
import TasksWidget from './components/TasksWidget/TasksWidget';

// TODO import each component accordingly
const App = () => {
  return (
    <div className="container-fluid p-0">
      <main class="main">
        <TasksWidget />
      </main>
    </div>
  );
};

export default App;
