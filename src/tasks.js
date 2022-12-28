export default function createTasksDisplay() {
    const container = document.getElementById("content-container");
    const tasksButton = document.getElementById("tasks-button");

    tasksButton.addEventListener("click", () => {
        if (container.querySelector("#task-container")) return;
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
        toggleOverlay();
        createTask();
    });

    const text = document.createElement("p");
    text.innerHTML = "i like potatoes";
    taskContainer.appendChild(text);

    return taskContainer;
}

function createTask() {
    const addTaskButton = document.getElementById("add-task-button");
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    addTaskButton.addEventListener("click", (e) => {
        e.preventDefault();
        isEmpty();
        const description = document.getElementById("task-desc").value;
        const dateInput = document.getElementById("task-due-date").value;
        const dueDate = new Date(dateInput);

        console.log(description, dueDate.toLocaleDateString());
    });
    // return the taskItem and append it to task container above
    // should do this when you click add button on form, not new task button
}

function toggleOverlay() {
    const taskFormOverlay = document.getElementById("task-form-overlay");
    taskFormOverlay.style.display = "block";
    taskFormOverlay.addEventListener("click", (e) => {
        if (e.target === taskFormOverlay)
            taskFormOverlay.style.display = "none";
    });
}
function isEmpty() {
    const description = document.getElementById("task-desc");
    if (description.value === "") {
        console.log("ğü");
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
