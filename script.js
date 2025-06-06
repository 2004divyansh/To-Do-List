const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');

// Load theme
document.body.classList.toggle('dark', localStorage.getItem('theme') === 'dark');
updateThemeIcon();

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => createTaskElement(task.text, task.done));

// Add Task
addBtn.addEventListener('click', () => {
  const taskText = input.value.trim();
  if (taskText === '') return;
  createTaskElement(taskText);
  tasks.push({ text: taskText, done: false });
  updateStorage();
  input.value = '';
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const newTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', newTheme);
  updateThemeIcon();
});

function updateThemeIcon() {
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

function createTaskElement(text, done = false) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = text;
  if (done) li.classList.add('done');

  span.addEventListener('click', () => {
    li.classList.toggle('done');
    const index = Array.from(taskList.children).indexOf(li);
    tasks[index].done = li.classList.contains('done');
    updateStorage();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'X';
  delBtn.className = 'delete-btn';
  delBtn.addEventListener('click', () => {
    const index = Array.from(taskList.children).indexOf(li);
    tasks.splice(index, 1);
    li.remove();
    updateStorage();
  });

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function updateStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
