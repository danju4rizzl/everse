import { appConfig, domStrings } from '../appSettings';
import { addToLocalStorage, getFromLocalStorage } from '../utils';
/*
  To handle the todo widget
  */
export function todoWidget() {
  const { todoForm, todoInput, todoItemsList } = domStrings.todoBox;
  let todos = [];

  todoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo(todoInput.value);
  });

  // function to add todo
  function addTodo(item) {
    if (item !== '') {
      const todo = {
        id: Date.now(),
        name: item,
        completed: false,
      };

      todos.unshift(todo);
      addToLocalStorage('Current_todos', todos, renderTodos);

      todoInput.value = '';
    }
  }

  // function to render given todos to screen
  function renderTodos(todos) {
    todoItemsList.innerHTML = '';

    todos.forEach(function (item) {
      const checked = item.completed ? 'checked' : null;

      const li = document.createElement('li');
      li.setAttribute('class', 'item');
      li.setAttribute('data-key', item.id);

      if (item.completed === true) {
        li.classList.add('checked');
      }

      li.innerHTML = `
          <input type="checkbox" class="checkbox" ${checked}>
          ${item.name}
          <button class="delete-button">X</button>
        `;
      todoItemsList.append(li);
    });
  }

  // toggle the value to completed and not completed
  function toggle(id) {
    todos.forEach(function (item) {
      if (item.id == id) {
        item.completed = !item.completed;
      }
    });

    addToLocalStorage('Current_todos', todos, renderTodos);
  }

  // deletes a todo from todos array, then updates localstorage and renders updated list to screen
  function deleteTodo(id) {
    todos = todos.filter(function (item) {
      return item.id != id;
    });

    addToLocalStorage('Current_todos', todos, renderTodos);
  }

  // after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
  todoItemsList.addEventListener('click', function (event) {
    if (event.target.type === 'checkbox') {
      toggle(event.target.parentElement.getAttribute('data-key'));
    }

    if (event.target.classList.contains('delete-button')) {
      deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
  });

  getFromLocalStorage('Current_todos', todos, renderTodos);
}
