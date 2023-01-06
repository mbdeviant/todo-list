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
    const formTitle = document.getElementById("form-title");
    const form = document.getElementById("task-form");
    const description = document.getElementById("task-desc");
    const date = document.getElementById("task-due-date");
    const priority = document.getElementById("task-priority-dropdown");
    const formWarning = document.createElement("p");
    const addTaskButton = document.getElementById("add-task-button");
    const editTaskButton = document.getElementById("edit-task-button");

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
        editTaskButton.style.display = "none";
        addTaskButton.style.display = "block";
        form.reset();
    }
    function focus() {
        description.focus();
    }
    function edit() {
        formTitle.textContent = "Edit task";
        editTaskButton.style.display = "block";
        addTaskButton.style.display = "none";
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
        edit,
        description,
        date,
        priority,
    };
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
    const addTaskButton = document.getElementById("add-task-button");
    const editTaskButton = document.getElementById("edit-task-button");
    let index;

    taskContainer.setAttribute("id", "task-item-container");

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
    addTaskButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (Form.isEmpty()) {
            Form.showWarning();
            return;
        }
        const task = createTask(Form.description.value, Form.date.value);
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({
            desc: Form.description.value,
            date: Form.date.value,
            priority: Form.priority.value,
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskContainer.appendChild(task);
        Overlay.close();
    });
    taskContainer.addEventListener("click", (e) => {
        if (e.target.matches(".remove-button")) {
            taskContainer.removeChild(e.target.parentNode);
        }
        if (e.target.matches(".task-edit-button-preview")) {
            index = Array.from(taskContainer.children).indexOf(
                e.target.parentNode // gets the index of clicked button's parent in container
            );
            console.log(index);
            Overlay.show();
            Form.reset();
            Form.edit();
        }
        if (e.target.matches(".checkbox")) {
            // on checkbox click event, change isChecked value of the item
            // get the index same way in edit button
            // or look what you did at notes.js
        }
    });

    editTaskButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (Form.isEmpty()) {
            Form.showWarning();
            return;
        }
        const editedTask = createTask();
        taskContainer.replaceChild(editedTask, taskContainer.childNodes[index]);
        Overlay.close();
    });

    function loadSavedTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        // eslint-disable-next-line no-restricted-syntax
        for (const task of tasks) {
            const taskItem = createTask(task.desc, task.date);
            taskContainer.appendChild(taskItem); // something wrong here
        }
    }
    loadSavedTasks();
    return taskContainer;
}

function createTask(desc, due) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("checkbox");

    const description = document.createElement("p");
    description.classList.add("task-desc-preview");
    description.textContent = desc;

    const dateValue = new Date(due);
    const date = document.createElement("p");
    date.textContent = dateValue.toDateString();

    const dropdownValue = Form.priority.value;
    const priority = document.createElement("p");
    priority.textContent = `Priority: ${dropdownValue}`;

    const editButton = document.createElement("button");
    editButton.innerHTML = `&#9998;`;
    editButton.classList.add("task-edit-button-preview");

    const removeButton = document.createElement("button");
    removeButton.setAttribute("id", "remove-button");
    removeButton.classList.add("remove-button");
    removeButton.innerHTML = "X";

    checkbox.addEventListener("click", () =>
        taskItem.classList.toggle("completed")
    );

    taskItem.appendChild(checkbox);
    taskItem.appendChild(description);
    taskItem.appendChild(date);
    taskItem.appendChild(priority);
    taskItem.appendChild(editButton);
    taskItem.appendChild(removeButton);

    return taskItem;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
