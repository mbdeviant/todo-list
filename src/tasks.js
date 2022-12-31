export default function createTasksDisplay() {
    const container = document.getElementById("content-container");
    const tasksButton = document.getElementById("tasks-button");

    tasksButton.addEventListener("click", () => {
        if (container.querySelector("#task-container")) return;
        removeAllChildNodes(container);
        container.appendChild(createTaskContainer());
    });
}
const Overlay = (() => {
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
const Form = (() => {
    const formContainer = document.getElementById("task-form-container");
    const form = document.getElementById("task-form");
    const description = document.getElementById("task-desc");
    const date = document.getElementById("task-due-date");
    const formWarning = document.createElement("p");
    let empty = true;

    function reset() {
        form.reset();
    }

    function showWarning() {
        if (formContainer.querySelector("#form-warning")) return;
        formWarning.textContent = "dont";
        formWarning.setAttribute("id", "form-warning");
        formContainer.appendChild(formWarning);
    }
    function removeWarning() {
        if (!formContainer.querySelector("#form-warning")) return;
        formContainer.removeChild(formWarning);
        console.log("reaches her"); // something wrong here
    }
    function isEmpty() {
        if (description.value === "" || date.value === "") empty = true;
        if (description.value !== "" && date.value !== "") empty = false;
        return empty;
    }

    return { reset, showWarning, isEmpty, removeWarning };
})();

function createTaskContainer() {
    const container = document.getElementById("content-container");
    const taskContainer = document.createElement("div");
    taskContainer.setAttribute("id", "task-container");

    const newTaskButton = document.createElement("button");
    newTaskButton.textContent = "+New task";
    newTaskButton.classList.add("new-task-button");
    container.appendChild(newTaskButton);

    newTaskButton.addEventListener("click", () => {
        Overlay.show();
        taskContainer.appendChild(createTask());
    });

    const text = document.createElement("p");
    text.textContent = "i like potatoes";
    taskContainer.appendChild(text);

    return taskContainer;
}

function createTask() {
    const addTaskButton = document.getElementById("add-task-button");
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    addTaskButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (Form.isEmpty()) {
            Form.showWarning();
            return;
        }
        console.log(Form.isEmpty());
        if (Form.isEmpty() === false) {
            Form.removeWarning();
        }

        const description = document.createElement("p");
        description.textContent = document.getElementById("task-desc").value;

        const dateInput = document.getElementById("task-due-date").value;
        const dueDate = new Date(dateInput);
        const date = document.createElement("p");
        date.textContent = dueDate.toLocaleDateString();

        taskItem.appendChild(description);
        taskItem.appendChild(date);
        Overlay.close();
        Form.reset();
    });
    return taskItem;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
