export function getTodoListElement() {
  return document.getElementById('todoList');
}

export function getTodoFormElement() {
  return document.getElementById('todoFormId');
}

export function getTodoCheckboxElement() {
  return document.querySelector('.form-check-input');
}

export function getTodoInputElement() {
  return document.getElementById('todo_text');
}

export function getTodoSearchElement() {
  return document.getElementById('searchTerm');
}

export function getAllTodoElement() {
  return document.querySelectorAll('#todoList > li');
}
