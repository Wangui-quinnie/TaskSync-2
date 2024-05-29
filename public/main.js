document.addEventListener('DOMContentLoaded', () => {
  const authContainer = document.getElementById('auth');
  const tasksContainer = document.getElementById('tasks');
  const taskList = document.getElementById('task-list');
  const newTaskInput = document.getElementById('new-task');

  const token = localStorage.getItem('token');

  // If token exists, show tasks container and load tasks
  if (token) {
    authContainer.style.display = 'none';
    tasksContainer.style.display = 'block';
    loadTasks();
  }

  // Handle login
  document.getElementById('login').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      authContainer.style.display = 'none';
      tasksContainer.style.display = 'block';
      loadTasks();
    } else {
      alert('Login failed');
    }
  });

  // Handle registration
  document.getElementById('register').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      authContainer.style.display = 'none';
      tasksContainer.style.display = 'block';
      loadTasks();
    } else {
      alert('Registration failed');
    }
  });

  // Handle adding a new task
  document.getElementById('add-task').addEventListener('click', async () => {
    const task = newTaskInput.value;
    const token = localStorage.getItem('token');

    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify({ title: task })
    });
    const data = await response.json();
    if (data._id) {
      newTaskInput.value = '';
      socket.emit('taskAdded', data); // Emit taskAdded event through socket.io
    } else {
      alert('Failed to add task');
    }
  });

  // Load tasks from the server
  async function loadTasks() {
    const token = localStorage.getItem('token');

    const response = await fetch('/api/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    });
    const data = await response.json();
    taskList.innerHTML = '';
    data.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.title;
      taskList.appendChild(li);
    });
  }

  // Handle receiving new tasks from socket.io
  const socket = io();
  socket.on('taskAdded', task => {
    const li = document.createElement('li');
    li.textContent = task.title;
    taskList.appendChild(li);
  });
});
