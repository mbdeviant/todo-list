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
        addTaskButton,
        editTaskButton,
    };
})();

function createTaskContainer() {
    console.log("createTaskContainer called");
    const container = document.getElementById("content-container");
    const taskItemContainer = document.createElement("div");
    taskItemContainer.setAttribute("id", "task-item-container");

    const newTaskButton = document.createElement("button");
    newTaskButton.textContent = "+New task";
    newTaskButton.classList.add("new-task-button");
    container.appendChild(newTaskButton);

    newTaskButton.addEventListener("click", () => {
        console.log("newtask called");
        Overlay.show();
        Form.reset();
        Form.removeWarning();
        Form.focus();
    });

    taskItemContainer.addEventListener("click", (e) => {
        console.log("taskItemContainer click event  called");
        if (e.target.matches(".remove-button")) {
            taskItemContainer.removeChild(e.target.parentNode);
        }
        if (e.target.matches(".task-edit-button-preview")) {
            Overlay.show();
            Form.reset();
            Form.edit();
        }
        if (e.target.matches(".checkbox")) {
            //  on checkbox click event, change isChecked value of the item
            //  get the index same way in edit button
            //  or look what you did at notes.js
        }
    });

    function loadSavedTasks() {
        console.log("loadSavedTasks function called");
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        // eslint-disable-next-line no-restricted-syntax
        for (const task of tasks) {
            console.log("for loop in the loadSavedTasks function called");
            const taskItem = createTask(task.desc, task.date, task.priority);
            taskItemContainer.appendChild(taskItem); // something wrong here
        }
    }
    loadSavedTasks();
    return taskItemContainer;
}
Form.addTaskButton.addEventListener("click", (e) => {
    const taskItemContainer = document.getElementById("task-item-container");
    console.log("addTaskButton click event called");
    e.preventDefault();
    if (Form.isEmpty()) {
        Form.showWarning();
        return;
    }
    const task = createTask(
        Form.description.value,
        Form.date.value,
        Form.priority.value
    );
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({
        desc: Form.description.value,
        date: Form.date.value,
        priority: Form.priority.value,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskItemContainer.appendChild(task);
    Overlay.close();
});
Form.editTaskButton.addEventListener("click", (e) => {
    e.preventDefault();
});

function createTask(desc, due, priorityValue) {
    console.log("createTask called");
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

    Form.priority.value = priorityValue;
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

    checkbox.addEventListener("click", () => {
        taskItem.classList.toggle("completed");
    });

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
