export default function createTasksDisplay() {
    const container = document.getElementById("content-container");
    const tasksButton = document.getElementById("tasks-button");

    tasksButton.addEventListener("click", () => {
        if (container.querySelector("#task-container")) return;
        removeAllChildNodes(container);
        container.appendChild(createTaskContainer());
    });
}

const Form = (() => {
    const formContainer = document.getElementById("task-form-container");
    const form = document.getElementById("task-form");
    const description = document.getElementById("task-desc");
    const date = document.getElementById("task-due-date");
    const formWarning = document.createElement("p");
    formWarning.setAttribute("id", "form-warning");
    let empty = true;

    description.addEventListener("keydown", () => {
        if (!formContainer.querySelector("#form-warning")) return;
        formContainer.removeChild(formWarning);
    });
    date.addEventListener("click", () => {
        if (!formContainer.querySelector("#form-warning")) return;
        formContainer.removeChild(formWarning);
    });
    formContainer.addEventListener("click", (e) => {
        console.log(e.target.id);
    });

    function reset() {
        form.reset();
    }

    function showWarning() {
        if (formContainer.querySelector("#form-warning")) return;
        formWarning.textContent = "Please fill all the blanks.";
        formContainer.appendChild(formWarning);
    }
    function removeWarning() {
        if (!formContainer.querySelector("#form-warning")) return;
        formContainer.removeChild(formWarning);
    }
    function isEmpty() {
        if (description.value === "" || date.value === "") empty = true;
        if (description.value !== "" && date.value !== "") empty = false;
        return empty;
    }

    return { reset, showWarning, isEmpty, removeWarning };
})();
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
    Form.removeWarning();
    return taskItem;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
