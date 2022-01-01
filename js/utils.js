export function getTodoList() {
  try {
    return JSON.parse(localStorage.getItem('todo_list'));
  } catch {
    return [];
  }
}

export function setTodoItem(todoList) {
  localStorage.setItem('todo_list', JSON.stringify(todoList));
}

export function cloneLiElement() {
  const todoTemplate = document.getElementById('todoTemplate');
  if (!todoTemplate) return null;

  // clone li element
  const todoElement = todoTemplate.content.querySelector('li').cloneNode(true);
  return todoElement;
}

export function isMatchSearch(element, searchTerm) {
  if (!element) return false;

  if (searchTerm === '') return true;
  const todoTitle = element.querySelector('p.todo__title');

  return todoTitle.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}

export function isMatchStatus(element, filterStatus) {
  return filterStatus === 'all' || element.dataset.status === filterStatus;
}

export function isMatch(todoElement, params) {
  return (
    isMatchSearch(todoElement, params.get('searchTerm')) &&
    isMatchStatus(todoElement, params.get('status'))
  );
}
