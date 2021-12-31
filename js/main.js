import { getTodoTemplate, getTodoListElement } from "./selectors.js";

function createTodoElement(todo) {
  if (!todo) return null;

  const todoTemplate = getTodoTemplate();
  if (!todoTemplate) return null;

  const todoElement = todoTemplate.content.querySelector("li").cloneNode(true);
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
  const todoList = [
    { id: 1, title: "HTML & CSS" },
    { id: 2, title: "Javascript" },
    { id: 3, title: "ReactJS" },
    { id: 4, title: "NextJS" },
  ];

  renderTodoList(todoList);
})();
