const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
  const title = window.prompt('Add a new task');
  if (!title || !title.trim()) return;

  const item = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  item.appendChild(checkbox);
  item.append(` ${title.trim()}`);
  taskList.appendChild(item);
});
