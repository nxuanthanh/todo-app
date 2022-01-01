import {
  getTodoListElement,
  getTodoInputElement,
  getTodoFormElement,
  getTodoCheckboxElement,
} from './selectors.js';
import { getTodoList, setTodoItem, cloneLiElement, isMatch } from './utils.js';

function populateTodoFrom(todo) {
  const input = getTodoInputElement();
  const checkbox = getTodoCheckboxElement();
  const todoForm = getTodoFormElement();

  input.value = todo.title;
  checkbox.checked = todo.status === 'completed' ? 1 : 0;
  todoForm.dataset.id = todo.id;
}

function createTodoElement(todo, params) {
  if (!todo) return null;

  // clone li element
  const todoElement = cloneLiElement();

  todoElement.dataset.id = todo.id;
  todoElement.dataset.status = todo.status;

  const todoTitleElement = todoElement.querySelector('li .todo__title');
  if (todoTitleElement) todoTitleElement.textContent = todo.title;

  const divElement = todoElement.querySelector('div.todo');
  if (!divElement) return;
  const alertClass = todo.status === 'completed' ? 'alert-success' : 'alert-secondary';
  divElement.classList.remove('alert-secondary');
  divElement.classList.add(alertClass);

  todoElement.hidden = !isMatch(todoElement, params);

  // handle click on mark-as-done button
  const markAsDonButton = todoElement.querySelector('.btn.mark-as-done');

  if (markAsDonButton) {
    const markContent = todo.status === 'completed' ? 'Reset' : 'Finish';
    markAsDonButton.textContent = markContent;

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

  // handle click on edit button
  const editButton = todoElement.querySelector('.btn.edit');
  if (editButton) {
    editButton.addEventListener('click', () => {
      const todoList = getTodoList();
      const lastTodo = todoList.find((e) => e.id === todo.id);
      populateTodoFrom(lastTodo);
    });
  }

  return todoElement;
}

function renderTodoList(todoList, params) {
  if (!Array.isArray(todoList) || todoList.length === 0) return;

  const ulElement = getTodoListElement();
  if (!ulElement) return;

  for (const todo of todoList) {
    const todoElement = createTodoElement(todo, params);
    ulElement.appendChild(todoElement);
  }
}

function handleTodoFormSubmit(e) {
  e.preventDefault();
  const inputValue = getTodoInputElement().value;
  const checkbox = getTodoCheckboxElement();
  const todoForm = getTodoFormElement();

  if (!todoForm) return;
  const todoFormId = todoForm.dataset.id;
  const isEdit = Boolean(todoFormId);

  if (isEdit) {
    const todoList = getTodoList();
    const index = todoList.findIndex((e) => e.id === Number(todoFormId));
    if (index < 0) return;

    todoList[index].title = inputValue;
    todoList[index].status = checkbox.checked ? 'completed' : 'pending';
    setTodoItem(todoList);

    const currentTodo = document.querySelector(`#todoList > li[data-id="${todoFormId}"]`);
    if (currentTodo) {
      const titleElement = currentTodo.querySelector('.todo__title');
      if (titleElement) titleElement.textContent = inputValue;
      currentTodo.dataset.status = todoList[index].status;

      const divElement = currentTodo.querySelector('div.todo');
      if (divElement) {
        const alertClass =
          currentTodo.dataset.status === 'completed' ? 'alert-success' : 'alert-secondary';
        divElement.classList.remove('alert-secondary', 'alert-success');
        divElement.classList.add(alertClass);

        const markButton = divElement.querySelector('.btn.mark-as-done');
        const markContent = currentTodo.dataset.status === 'completed' ? 'Reset' : 'Finish';
        markButton.textContent = markContent;
      }
    }
  } else {
    const todo = {
      id: new Date().getTime(),
      title: inputValue,
      status: checkbox.checked ? 'completed' : 'pending',
    };

    const todoList = getTodoList();
    todoList.push(todo);
    setTodoItem(todoList);

    const ulElement = getTodoListElement();
    if (ulElement) {
      const liElement = createTodoElement(todo, params);
      ulElement.appendChild(liElement);
    }
  }

  // reset  todo form
  delete todoForm.dataset.id;
  todoForm.reset();
}

(() => {
  // const todoList = [
  //   { id: 1, title: 'HTML & CSS', status: 'completed' },
  //   { id: 2, title: 'Javascript', status: 'completed' },
  //   { id: 3, title: 'ReactJS', status: 'pending' },
  //   { id: 4, title: 'NextJS', status: 'pending' },
  // ];
  const todoList = getTodoList();
  const params = new URLSearchParams(window.location.search);

  renderTodoList(todoList, params);
  const todoForm = getTodoFormElement();
  if (todoForm) {
    todoForm.addEventListener('submit', (e) => {
      handleTodoFormSubmit(e);
    });
  }
})();
