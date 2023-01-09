export default function createTasksDisplay() {
    const container = document.getElementById("content-container");
    const tasksButton = document.getElementById("tasks-button");

    tasksButton.addEventListener("click", () => {
        if (container.querySelector("#task-item-container")) return;
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
    const formTitle = document.getElementById("form-title");
    const form = document.getElementById("task-form");
    const description = document.getElementById("task-desc");
    const date = document.getElementById("task-due-date");
    const priority = document.getElementById("task-priority-dropdown");
    const formWarning = document.createElement("p");
    const addTaskButton = document.getElementById("add-task-button");

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

    function reset() {
        formTitle.textContent = "Add a new task";
        addTaskButton.style.display = "block";
        form.reset();
    }
    function focus() {
        description.focus();
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
    return {
        reset,
        showWarning,
        isEmpty,
        removeWarning,
        focus,
        description,
        date,
        priority,
        addTaskButton,
    };
})();

function createTaskContainer() {
    const container = document.getElementById("content-container");
    const taskItemContainer = document.createElement("div");
    taskItemContainer.setAttribute("id", "task-item-container");

    const newTaskButton = document.createElement("button");
    newTaskButton.textContent = "+New task";
    newTaskButton.classList.add("new-task-button");
    container.appendChild(newTaskButton);

    newTaskButton.addEventListener("click", () => {
        Overlay.show();
        Form.reset();
        Form.removeWarning();
        Form.focus();
    });

    taskItemContainer.addEventListener("click", (e) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const index = Array.from(taskItemContainer.childNodes).indexOf(
            e.target.parentNode
        );
        if (e.target.matches(".remove-button")) {
            taskItemContainer.removeChild(e.target.parentNode);
            tasks.splice(index, 1);
        }
        if (e.target.matches(".checkbox")) {
            tasks[index].check = !tasks[index].check;
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    function loadSavedTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        // eslint-disable-next-line no-restricted-syntax
        for (const task of tasks) {
            const taskItem = createTask(
                task.desc,
                task.date,
                task.priority,
                task.check
            );
            if (task.check) taskItem.classList.add("completed");
            taskItemContainer.appendChild(taskItem);
        }
    }

    loadSavedTasks();
    return taskItemContainer;
}

Form.addTaskButton.addEventListener("click", (e) => {
    const taskItemContainer = document.getElementById("task-item-container");
    e.preventDefault();

    if (Form.isEmpty()) {
        Form.showWarning();
        return;
    }
    const checkInit = false;
    const task = createTask(
        Form.description.value,
        Form.date.value,
        Form.priority.value,
        checkInit
    );
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        desc: Form.description.value,
        date: Form.date.value,
        priority: Form.priority.value,
        check: checkInit,
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskItemContainer.appendChild(task);
    Overlay.close();
});

function createTask(desc, due, priorityValue, check) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("checkbox");
    checkbox.checked = check;

    const description = document.createElement("p");
    description.classList.add("task-desc-preview");
    description.textContent = desc;

    const dateValue = new Date(due);
    const yyyy = dateValue.getFullYear();
    let mm = dateValue.getMonth() + 1;
    let dd = dateValue.getDate();
    if (dd < 10) dd = `0${dd}`;
    if (mm < 10) mm = `0${mm}`;
    const formattedDate = `Due Date: ${dd}/${mm}/${yyyy}`;
    const date = document.createElement("p");
    date.classList.add("task-date-preview");
    date.textContent = formattedDate;

    const priority = document.createElement("p");
    priority.classList.add("task-priority-preview");
    priority.textContent = `Priority: ${priorityValue}`;

    if (priorityValue === "High") priority.style.color = "maroon";
    if (priorityValue === "Medium") priority.style.color = "orange";
    if (priorityValue === "Low") priority.style.color = "green";

    const removeButton = document.createElement("button");
    removeButton.setAttribute("id", "remove-button");
    removeButton.classList.add("remove-button");
    removeButton.innerHTML = "X";

    checkbox.addEventListener("click", () => {
        taskItem.classList.toggle("completed");
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(description);
    taskItem.appendChild(date);
    taskItem.appendChild(priority);
    taskItem.appendChild(removeButton);

    return taskItem;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
