export default function createTasksDisplay() {
    const container = document.getElementById("content-container");
    const tasksButton = document.getElementById("tasks-button");

    tasksButton.addEventListener("click", () => {
        if (container.querySelector("#task-container")) return;
        removeAllChildNodes(container);
        container.appendChild(createTaskContainer());
    });
}
const overlay = (() => {
    const taskFormOverlay = document.getElementById("task-form-overlay");
    taskFormOverlay.addEventListener("click", (e) => {
        if (e.target === taskFormOverlay)
            taskFormOverlay.style.display = "none";
    });
    function close() {
        taskFormOverlay.style.display = "none";
    }
    function show() {
        taskFormOverlay.style.display = "block";
    }
    return {
        close,
        show,
    };
})();

function createTaskContainer() {
    const container = document.getElementById("content-container");
    const taskContainer = document.createElement("div");
    taskContainer.setAttribute("id", "task-container");

    const newTaskButton = document.createElement("button");
    newTaskButton.innerHTML = "+New task";
    newTaskButton.classList.add("new-task-button");
    container.appendChild(newTaskButton);

    newTaskButton.addEventListener("click", () => {
        overlay.show();
        taskContainer.appendChild(createTask());
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
        if (isEmpty()) return;

        const description = document.createElement("p");
        description.innerHTML = document.getElementById("task-desc").value;

        const dateInput = document.getElementById("task-due-date").value;
        const dueDate = new Date(dateInput);
        const date = document.createElement("p");
        date.innerHTML = dueDate.toLocaleDateString();

        taskItem.appendChild(description);
        taskItem.appendChild(date);
        overlay.close();
        resetForm();
    });
    return taskItem;
}

function isEmpty() {
    const description = document.getElementById("task-desc");
    const emptyValueAlert = document.createElement("p");
    let descIsEmpty = true;
    emptyValueAlert.innerHTML = "Description cannot be empty";
    if (description.value !== "") descIsEmpty = false;
    if (description.value === "") descIsEmpty = true;
    return descIsEmpty;
}

function resetForm() {
    const form = document.getElementById("task-form");
    form.reset();
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
