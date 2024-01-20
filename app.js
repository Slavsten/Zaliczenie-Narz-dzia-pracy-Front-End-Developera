document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});

function loadTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  // Pobieranie zadań z LocalStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Sortowanie zadań według godziny dodania (od najniższej do najwyższej)
  tasks.sort((a, b) => a.time.localeCompare(b.time));

  tasks.forEach(function (task) {
    createTaskElement(task);
  });
}

function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();
  const taskTime = document.getElementById("task-time").value;

  if (taskText !== "" && taskTime !== "") {
    const newTask = {
      text: taskText,
      completed: false,
      timestamp: new Date().toISOString(),
      time: taskTime,
    };

    // Pobieranie zadań z LocalStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push(newTask);

    // Zapisywanie zadań do LocalStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    createTaskElement(newTask);

    taskInput.value = "";
    document.getElementById("task-time").value = "";
  }
}

function createTaskElement(task) {
  const taskList = document.getElementById("task-list");
  const taskElement = document.createElement("div");
  taskElement.className = "task";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", function () {
    toggleTaskCompletion(task);
  });

  const taskText = document.createElement("div");
  taskText.textContent = `${task.text} - ${task.time}`;
  taskText.className = task.completed ? "completed" : "";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Usuń";
  deleteButton.addEventListener("click", function () {
    deleteTask(task);
  });

  taskElement.appendChild(checkbox);
  taskElement.appendChild(taskText);
  taskElement.appendChild(deleteButton);

  taskList.appendChild(taskElement);
}

function sortTasksByTime(order) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  // Pobieranie zadań z LocalStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Sortowanie zadań według godziny dodania
  tasks.sort((a, b) => {
    if (order === "asc") {
      return a.time.localeCompare(b.time);
    } else {
      return b.time.localeCompare(a.time);
    }
  });

  tasks.forEach(function (task) {
    createTaskElement(task);
  });
}

function toggleTaskCompletion(task) {
  task.completed = !task.completed;

  // Pobieranie zadań z LocalStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Aktualizacja statusu ukończenia zadania w LocalStorage
  const updatedTasks = tasks.map((t) => (t.text === task.text ? task : t));

  // Zapisywanie zaktualizowanych zadań do LocalStorage
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  loadTasks();
}

function deleteTask(task) {
  // Pobieranie zadań z LocalStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Usuwanie zadania z LocalStorage
  const updatedTasks = tasks.filter((t) => t.text !== task.text);

  // Zapisywanie zaktualizowanych zadań do LocalStorage
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  loadTasks();
}
