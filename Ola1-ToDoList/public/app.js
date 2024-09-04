document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Fetch tasks from the API and display them
  const fetchTasks = async () => {
    const res = await fetch("/tasks");
    const tasks = await res.json();
    taskList.innerHTML = "";
    tasks.forEach((task) => addTaskToDOM(task));
  };

  // Add task to DOM
  const addTaskToDOM = (task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
            <span>${task.title}</span>
            <div>
                <button class="complete-btn">${
                  task.completed ? "Undo" : "Complete"
                }</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

    // Complete or Undo Task
    li.querySelector(".complete-btn").addEventListener("click", async () => {
      const res = await fetch(`/tasks/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const updatedTask = await res.json();
      li.className = updatedTask.completed ? "completed" : "";
      li.querySelector(".complete-btn").textContent = updatedTask.completed
        ? "Undo"
        : "Complete";
    });

    // Delete Task
    li.querySelector(".delete-btn").addEventListener("click", async () => {
      await fetch(`/tasks/${task._id}`, { method: "DELETE" });
      taskList.removeChild(li);
    });

    taskList.appendChild(li);
  };

  // Handle form submission to create a new task
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newTask = {
      title: taskInput.value,
    };
    const res = await fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const savedTask = await res.json();
    addTaskToDOM(savedTask);
    taskInput.value = "";
  });

  // Initial fetch to load existing tasks
  fetchTasks();
});
