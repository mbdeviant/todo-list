export default function createTasksDisplay() {
    const container = document.getElementById("content-container");
    const tasksButton = document.getElementById("tasks-button");

    tasksButton.addEventListener("click", () => {
        removeAllChildNodes(container);
        container.appendChild(createTaskContainer());
    });
}

export function createTaskContainer() {
    const taskContainer = document.createElement("div");
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
