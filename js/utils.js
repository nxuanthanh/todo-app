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
