import { getAllTodoElement, getTodoSearchElement } from './selectors.js';
import { isMatch } from './utils.js';

function handleFilterChange(filterName, filterValue) {
  const url = new URL(window.location);
  url.searchParams.set(filterName, filterValue);
  window.history.pushState({}, '', url);

  const todoList = getAllTodoElement();
  if (!todoList) return;

  for (const todo of todoList) {
    const hide = isMatch(todo, url.searchParams);
    todo.hidden = !hide;
  }
}

function initFilterTodo(params) {
  const filterStatus = document.getElementById('filterStatus');
  if (!filterStatus) return;

  if (params.get('status')) {
    filterStatus.value = params.get('status');
  }

  filterStatus.addEventListener('change', () => {
    handleFilterChange('status', filterStatus.value);
  });
}

function initSerachTodo(params) {
  const inputSearch = getTodoSearchElement();
  if (!inputSearch) return;

  if (params.get('searchTerm')) {
    inputSearch.value = params.get('searchTerm');
  }

  inputSearch.addEventListener('input', () => {
    handleFilterChange('searchTerm', inputSearch.value);
  });
}

(() => {
  const params = new URLSearchParams(window.location.search);

  initFilterTodo(params);
  initSerachTodo(params);
})();
