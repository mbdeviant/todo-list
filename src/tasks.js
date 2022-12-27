export default function createTasksDisplay() {
    const container = document.getElementById("content-container");
    const tasksButton = document.getElementById("tasks-button");

    tasksButton.addEventListener("click", () => {
        removeAllChildNodes(container);
        container.appendChild(createTaskContainer());
    });
}

function createTaskContainer() {
    const container = document.getElementById("content-container");
    const taskContainer = document.createElement("div");
    taskContainer.setAttribute("id", "task-container");

    const newTaskButton = document.createElement("button");
    newTaskButton.innerHTML = "+New task";
    newTaskButton.classList.add("new-task-button");
    container.appendChild(newTaskButton);

    newTaskButton.addEventListener("click", () => {
        createTask();
    });

    const text = document.createElement("p");
    text.innerHTML = "i like potatoes";
    taskContainer.appendChild(text);

    return taskContainer;
}

function createTask(description, date) {
    toggleOverlay();
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
}

function toggleOverlay() {
    const taskFormOverlay = document.getElementById("task-form-overlay");

    taskFormOverlay.style.display = "block";

    taskFormOverlay.addEventListener("click", (e) => {
        if (e.target === taskFormOverlay)
            taskFormOverlay.style.display = "none";
    });
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
