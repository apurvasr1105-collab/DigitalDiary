const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const subjectSelect = document.getElementById('subjectSelect');
const deadlineList = document.getElementById('deadlineList');
const dashboardName = document.getElementById('dashboardName');
const darkModeToggle = document.getElementById('darkModeToggle');
const circles = document.querySelectorAll('.circle');
const editGoalsBtn = document.getElementById('editGoalsBtn');
const addMonthlyTaskBtn = document.getElementById('addMonthlyTaskBtn');

const DEFAULT_NAME = 'JEE Prep Diary';
const SUBJECTS = ['PHYSICS', 'CHEMISTRY', 'ZOOLOGY', 'BOTANY'];

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

const savedTheme = window.localStorage.getItem('jeeDiaryTheme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  darkModeToggle.checked = true;
}

darkModeToggle.addEventListener('change', () => {
  const isDark = darkModeToggle.checked;
  document.body.classList.toggle('dark-mode', isDark);
  window.localStorage.setItem('jeeDiaryTheme', isDark ? 'dark' : 'light');
});

function createTaskElement(text, subject, completed = false) {
  const item = document.createElement('li');
  item.dataset.subject = subject;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;

  const label = document.createElement('span');
  label.className = 'task-text';
  label.textContent = text;

  const pill = document.createElement('span');
  pill.className = 'subject-pill';
  pill.textContent = subject;

  item.appendChild(checkbox);
  item.appendChild(label);
  item.appendChild(pill);

  return item;
}

function updateStudyProgress() {
  const summary = {
    PHYSICS: { done: 0, total: 0 },
    CHEMISTRY: { done: 0, total: 0 },
    ZOOLOGY: { done: 0, total: 0 },
    BOTANY: { done: 0, total: 0 }
  };

  taskList.querySelectorAll('li').forEach((task) => {
    const subject = task.dataset.subject;
    if (!SUBJECTS.includes(subject)) return;

    summary[subject].total += 1;
    const checkbox = task.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      summary[subject].done += 1;
    }
  });

  circles.forEach((circle) => {
    const subject = circle.dataset.subject;
    const current = summary[subject];
    const pct = current.total ? Math.round((current.done / current.total) * 100) : 0;

    circle.style.setProperty('--pct', pct);
    circle.querySelector('span').textContent = `${pct}%`;
  });
}

addTaskBtn.addEventListener('click', () => {
  const title = window.prompt('Add a new task');
  if (!title || !title.trim()) return;

  const selectedSubject = subjectSelect.value;
  const item = createTaskElement(title.trim(), selectedSubject);
  taskList.appendChild(item);
  updateStudyProgress();
});

taskList.addEventListener('change', (event) => {
  if (event.target.matches('input[type="checkbox"]')) {
    updateStudyProgress();
  }
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

editGoalsBtn.addEventListener('click', () => {
  document.querySelectorAll('.goal-row .goal-label').forEach((goalLabel) => {
    const nextValue = window.prompt('Edit goal', goalLabel.textContent);
    if (nextValue && nextValue.trim()) {
      goalLabel.textContent = nextValue.trim();
    }
  });
});

addMonthlyTaskBtn.addEventListener('click', () => {
  const trackChoices = Array.from(document.querySelectorAll('.monthly-card')).map((card) => card.dataset.track);
  const selectedTrack = window.prompt(`Choose a monthly track: ${trackChoices.join(', ')}`, trackChoices[0]);
  if (!selectedTrack || !selectedTrack.trim()) return;

  const taskText = window.prompt('Add monthly planner task');
  if (!taskText || !taskText.trim()) return;

  const targetCard = Array.from(document.querySelectorAll('.monthly-card')).find(
    (card) => card.dataset.track.toLowerCase() === selectedTrack.trim().toLowerCase()
  );
  if (!targetCard) return;

  const list = targetCard.querySelector('.mini-list');
  const li = document.createElement('li');
  li.textContent = taskText.trim();
  list.appendChild(li);
});

updateStudyProgress();
