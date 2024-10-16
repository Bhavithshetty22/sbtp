document.addEventListener('DOMContentLoaded', () => {
  const tasks = [];
  const quotes = [
    "The expert in anything was once a beginner.",
    "Believe you can and you're halfway there.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "The only way to do great work is to love what you do.",
    "Education is the passport to the future."
  ];

  const chartContext = document.getElementById('tasksChart').getContext('2d');
  let tasksChart;

  // Display random quote
  document.getElementById('quote').innerText = quotes[Math.floor(Math.random() * quotes.length)];

  // Add new task
  document.getElementById('addTaskBtn').addEventListener('click', addTask);

  function addTask() {
    const taskText = document.getElementById('newTask').value.trim();
    const subject = document.getElementById('subjectSelect').value;
    if (taskText) {
      const task = {
        id: Date.now(),
        text: taskText,
        subject: subject,
        completed: false,
        completedDate: null
      };
      tasks.push(task);
      renderTasks();
      document.getElementById('newTask').value = '';
    }
  }

  function renderTasks() {
    const taskContainer = document.getElementById('tasksContainer');
    taskContainer.innerHTML = '';

    const groupedTasks = tasks.reduce((acc, task) => {
      if (!acc[task.subject]) {
        acc[task.subject] = [];
      }
      acc[task.subject].push(task);
      return acc;
    }, {});

    for (const subject in groupedTasks) {
      const subjectTasks = groupedTasks[subject];
      const subjectDiv = document.createElement('div');
      subjectDiv.innerHTML = `<h4>${subject}</h4>`;
      const taskList = document.createElement('ul');
      subjectTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item'); // Added for styling
        taskItem.innerHTML = `
          <label class="container">
            <input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
            <div class="checkmark"></div>
          </label>
          <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
          <button class="button1" data-id="${task.id}">
            <svg viewBox="0 0 448 512" class="svgIcon">
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
            </svg>
          </button>
        `;

        // Event listener for checkbox
        taskItem.querySelector('input').addEventListener('change', () => toggleTask(task.id));
        // Event listener for delete button
        taskItem.querySelector('.button1').addEventListener('click', () => deleteTask(task.id));
        
        taskList.appendChild(taskItem);
      });
      subjectDiv.appendChild(taskList);
      taskContainer.appendChild(subjectDiv);
    }

    updateProgress();
    updateChart();
  }

  function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    task.completedDate = task.completed ? new Date().toISOString().split('T')[0] : null;
    renderTasks();
  }

  function deleteTask(id) {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      renderTasks();
    }
  }

  function updateProgress() {
    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    document.getElementById('progress').style.width = completionPercentage + '%';
    document.getElementById('progress-text').innerText = `${completedTasks} of ${totalTasks} tasks completed (${Math.round(completionPercentage)}%)`;
  }

  function getTasksPerDay() {
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => ({
      date,
      count: tasks.filter(task => task.completed && task.completedDate === date).length
    }));
  }

  function updateChart() {
    const taskData = getTasksPerDay();
    const labels = taskData.map(d => d.date);
    const data = taskData.map(d => d.count);
  
    // Find the maximum number of tasks to set as the upper limit of the Y-axis
    const maxTasks = Math.max(...data);
  
    if (tasksChart) {
      tasksChart.destroy();
    }
  
    tasksChart = new Chart(chartContext, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Tasks Completed',
          data: data,
          backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent fill
          borderColor: 'rgba(34, 197, 94, 1)', // Greenish color for the line
          borderWidth: 2,
          tension: 0.4, // Creates a smooth curve
          pointBackgroundColor: 'rgba(34, 197, 94, 1)', // Greenish points
          pointBorderColor: 'rgba(34, 197, 94, 1)', // Matching border for points
          pointRadius: 4, // Point size
          pointHoverRadius: 6, // Point size when hovering
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: maxTasks > 0 ? maxTasks + 1 : 1, // Dynamic max limit for y-axis, adds some padding
            ticks: {
              stepSize: 1, // Ensures integer steps
            },
          },
          x: {
            ticks: {
              callback: function(value, index, values) {
                return new Date(labels[index]).toLocaleDateString('en-US', { weekday: 'short' });
              },
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Hide the legend for a clean look
          },
          tooltip: {
            backgroundColor: 'rgba(34, 197, 94, 0.8)', // Greenish tooltip background
            titleFont: { weight: 'bold' },
            callbacks: {
              label: function(context) {
                return `Tasks: ${context.raw}`;
              }
            }
          }
        }
      }
    });
  }

  // Initialize chart with empty data
  updateChart();
});




