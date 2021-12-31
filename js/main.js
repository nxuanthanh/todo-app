import { getTodoTemplate, getTodoListElement } from './selectors.js';
import { getTodoList, setTodoItem } from './utils.js';

function createTodoElement(todo) {
  if (!todo) return null;

  const todoTemplate = getTodoTemplate();
  if (!todoTemplate) return null;

  // clone li element
  const todoElement = todoTemplate.content.querySelector('li').cloneNode(true);

  todoElement.dataset.id = todo.id;
  todoElement.dataset.status = todo.status;

  const todoTitleElement = todoElement.querySelector('li .todo__title');
  if (todoTitleElement) todoTitleElement.textContent = todo.title;

  const divElement = todoElement.querySelector('div.todo');
  if (!divElement) return;
  const alertClass = todo.status === 'completed' ? 'alert-success' : 'alert-secondary';
  divElement.classList.remove('alert-secondary');
  divElement.classList.add(alertClass);

  // handle click on mark-as-done button
  const markAsDonButton = todoElement.querySelector('.btn.mark-as-done');
  if (markAsDonButton) {
    markAsDonButton.addEventListener('click', () => {
      const currentState = todoElement.dataset.status;
      const newState = currentState === 'completed' ? 'pending' : 'completed';
      todoElement.dataset.status = newState;

      const todoList = getTodoList();
      if (!todoList) return null;

      const index = todoList.findIndex((todoElement) => todoElement.id === todo.id);
      todoList[index].status = newState;
      setTodoItem(todoList);

      const newAlertClass = newState === 'completed' ? 'alert-success' : 'alert-secondary';

      divElement.classList.remove('alert-secondary', 'alert-success');
      divElement.classList.add(newAlertClass);

      const markContent = newState === 'completed' ? 'Reset' : 'Finish';
      markAsDonButton.textContent = markContent;
    });
  }

  // handle click on remove button
  const removeButton = todoElement.querySelector('.btn.remove');
  if (removeButton) {
    removeButton.addEventListener('click', () => {
      const todoList = getTodoList();
      const index = todoList.findIndex((todoElement) => todoElement.id === todo.id);
      todoList.splice(index, 1);
      setTodoItem(todoList);
      todoElement.remove();
    });
  }

  return todoElement;
}

function renderTodoList(todoList) {
  if (!Array.isArray(todoList) || todoList.length === 0) return;

  const ulElement = getTodoListElement();
  if (!ulElement) return;

  for (const todo of todoList) {
    const todoElement = createTodoElement(todo);
    ulElement.appendChild(todoElement);
  }
}

(() => {
  // const todoList = [
  //   { id: 1, title: 'HTML & CSS', status: 'completed' },
  //   { id: 2, title: 'Javascript', status: 'completed' },
  //   { id: 3, title: 'ReactJS', status: 'pending' },
  //   { id: 4, title: 'NextJS', status: 'pending' },
  // ];
  const todoList = getTodoList();

  renderTodoList(todoList);
})();
