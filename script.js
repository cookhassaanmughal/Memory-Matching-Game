const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

renderTasks();

// Add task
addBtn.addEventListener("click", function () {
    const text = taskInput.value.trim();

    if (text !== "") {
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = "";
    }
});

// Render tasks
function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(function(task) {
        if (currentFilter === "completed") {
            return task.completed;
        } else if (currentFilter === "pending") {
            return !task.completed;
        } else {
            return true;
        }
    });

    for (let i = 0; i < filteredTasks.length; i++) {
        const task = filteredTasks[i];

        const li = document.createElement("li");

        // Create tick icon
        const tickIcon = document.createElement("span");
        tickIcon.classList.add("tick-icon");
        tickIcon.textContent = "✓";
        
        if (task.completed) {
            tickIcon.classList.add("show");
        }

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        span.addEventListener("click", function () {
            toggleTask(task.id);
        });

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        removeBtn.addEventListener("click", function () {
            deleteTask(task.id);
        });

        li.appendChild(tickIcon);
        li.appendChild(span);
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }
}

// Toggle complete
function toggleTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].completed = !tasks[i].completed;
        }
    }
    saveTasks();
    renderTasks();
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });
    saveTasks();
    renderTasks();
}

// Filter buttons
filterButtons.forEach(function(button) {
    button.addEventListener("click", function () {
        currentFilter = button.getAttribute("data-filter");
        renderTasks();
    });
});

// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}