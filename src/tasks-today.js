import { createTask } from "./tasks";

export default function createTodayDisplay() {
  const container = document.getElementById("content-container");
  const buttons = document.querySelectorAll(".nav-button");
  const todayButton = document.getElementById("today-button");

  todayButton.addEventListener("click", () => {
    if (container.querySelector("#task-today-container")) return;
    buttons.forEach((button) => button.classList.remove("selected"));
    todayButton.classList.add("selected");
    removeAllChildNodes(container);
    container.appendChild(createTodayContainer());
  });
}

function createTodayContainer() {
  const container = document.getElementById("content-container");

  const taskTodayContainer = document.createElement("div");
  taskTodayContainer.setAttribute("id", "task-today-container");

  const title = document.createElement("p");
  title.textContent = "Today's tasks";
  title.classList.add("task-today-title");
  container.appendChild(title);

  const todaysDate = new Date();
  const yyyy = todaysDate.getFullYear();
  let mm = todaysDate.getMonth() + 1;
  let dd = todaysDate.getDate();
  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;
  const formattedDate = `${yyyy}-${mm}-${dd}`;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const filteredTasks = tasks.filter((task) => task.date === formattedDate);

  const emptyTaskMessage = document.createElement("p");
  emptyTaskMessage.classList.add("empty-task-message");
  emptyTaskMessage.innerHTML = `Nothing to do today. Click <button class="new-today-task-button">here</button> to create a new task.`;

  document.addEventListener("click", (e) => {
    if (e.target.matches(".new-today-task-button")) {
      const tasksButton = document.getElementById("tasks-button");
      tasksButton.click();
    }
  });

  const noTasksToday = filteredTasks.length === 0;
  if (noTasksToday) taskTodayContainer.appendChild(emptyTaskMessage);

  filteredTasks.forEach((task) => {
    const index = tasks.findIndex((item) => item === task);
    const taskItem = createTask(
      task.desc,
      task.date,
      task.priority,
      task.check
    );
    taskItem.dataset.id = index;
    taskTodayContainer.appendChild(taskItem);
  });

  taskTodayContainer.addEventListener("click", (e) => {
    const index = e.target.parentNode.parentNode.parentNode.dataset.id;
    if (e.target.matches(".remove-button")) {
      taskTodayContainer.removeChild(e.target.parentNode.parentNode.parentNode);
      tasks.splice(index, 1);
    }
    if (e.target.matches(".checkbox")) {
      tasks[index].check = !tasks[index].check;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  return taskTodayContainer;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
