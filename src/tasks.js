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

    const newNoteButton = document.createElement("button");
    newNoteButton.innerHTML = "+New task";
    newNoteButton.classList.add("new-task-button");

    container.appendChild(newNoteButton);

    const text = document.createElement("p");
    text.innerHTML = "i like potatoes";
    taskContainer.appendChild(text);

    return taskContainer;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
