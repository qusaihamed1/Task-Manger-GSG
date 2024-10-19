let taskList = [];
let currentId = 1;
let isEditing = false;
let editingTaskId = null;

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const description = taskInput.value.trim();

  if (description === "") {
    alert("Please enter a task description.");
    return;
  }

  if (isEditing) {
    const task = taskList.find((t) => t.id === editingTaskId);
    if (task) {
      task.description = description;
      highlightTask(task.id); 
    }
    isEditing = false;
    editingTaskId = null;
    document.querySelector("button.add-task-btn").textContent = "Add Task";
    document.querySelector("button.cancel-btn").style.display = "none"; 
  } else {

    taskList.push({
      id: currentId,
      description: description,
      completed: false,
    });
    currentId++;
  }

  taskInput.value = ""; 
  displayTasks(); 
}

function displayTasks() {
  const taskListElement = document.getElementById("taskList");
  taskListElement.innerHTML = ""; 

  taskList.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className = task.completed ? "completed" : "";

    taskItem.innerHTML = `
            ${task.description}
            <div>
                <button class="toggle-btn" onclick="toggleTask(${task.id})">Toggle</button>
                <button class="update-btn" onclick="editTask(${task.id})">Update</button>
                <button class="delete-btn" onclick="removeTask(${task.id})">Delete</button>
            </div>
        `;

    taskListElement.appendChild(taskItem);
  });
}

function toggleTask(id) {
  const task = taskList.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
  }
  displayTasks();
}

function removeTask(id) {
  taskList = taskList.filter((t) => t.id !== id);
  displayTasks();
}

function editTask(id) {
  const task = taskList.find((t) => t.id === id);
  if (task) {
    document.getElementById("taskInput").value = task.description;
    isEditing = true;
    editingTaskId = id;

    document.querySelector("button.add-task-btn").textContent = "Update Task";
    document.querySelector("button.cancel-btn").style.display = "inline-block";

    highlightTask(id);

    document.getElementById("taskList").scrollIntoView({ behavior: "smooth" });
  }
}

function cancelEdit() {
  isEditing = false;
  editingTaskId = null;
  document.getElementById("taskInput").value = "";
  document.querySelector("button.add-task-btn").textContent = "Add Task";
  document.querySelector("button.cancel-btn").style.display = "none"; 
}

function highlightTask(id) {
  const taskListElement = document.getElementById("taskList");
  const taskItems = taskListElement.querySelectorAll("li");

  taskItems.forEach((item) => item.classList.remove("highlight")); 
  const taskItem = taskItems[id - 1]; 
  if (taskItem) {
    taskItem.classList.add("highlight"); 
    setTimeout(() => taskItem.classList.remove("highlight"), 2000); 
  }
}

function searchTask() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredTasks = taskList.filter((task) =>
    task.description.toLowerCase().includes(searchInput)
  );

  const taskListElement = document.getElementById("taskList");
  taskListElement.innerHTML = ""; 

  filteredTasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className = task.completed ? "completed" : "";

    taskItem.innerHTML = `
            ${task.description}
            <div>
                <button class="toggle-btn" onclick="toggleTask(${task.id})">Toggle</button>
                <button class="update-btn" onclick="editTask(${task.id})">Update</button>
                <button class="delete-btn" onclick="removeTask(${task.id})">Delete</button>
            </div>
        `;

    taskListElement.appendChild(taskItem);
  });
}
