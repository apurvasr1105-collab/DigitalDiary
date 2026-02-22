const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const deadlineList = document.getElementById('deadlineList');
const dashboardName = document.getElementById('dashboardName');

const DEFAULT_NAME = 'JEE Prep Diary';

const savedName = window.localStorage.getItem('jeeDiaryName');
const promptedName = window.prompt('What should we call you?', savedName || '');

if (promptedName && promptedName.trim()) {
  const cleanedName = promptedName.trim();
  dashboardName.textContent = cleanedName;
  window.localStorage.setItem('jeeDiaryName', cleanedName);
} else if (savedName && savedName.trim()) {
  dashboardName.textContent = savedName.trim();
} else {
  dashboardName.textContent = DEFAULT_NAME;
}

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
