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
