const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const deadlineList = document.getElementById('deadlineList');

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

deadlineList.addEventListener('click', (event) => {
  const button = event.target.closest('.edit-btn');
  if (!button) return;

  const deadlineItem = button.closest('article');
  const deadlineText = deadlineItem.querySelector('.deadline-text');
  const updatedText = window.prompt('Edit deadline', deadlineText.textContent);

  if (!updatedText || !updatedText.trim()) return;
  deadlineText.textContent = updatedText.trim();
});
