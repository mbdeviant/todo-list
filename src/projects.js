export default function createProjectDisplay() {
    const container = document.getElementById("content-container");
    const projectsButton = document.getElementById("projects-button");

    projectsButton.addEventListener("click", () => {
        if (container.querySelector("#project-container")) return;
        removeAllChildNodes(container);
        container.appendChild(createProjectContainer());
    });
}

const Project = (() => {
    const newItem = document.createElement("div");
    newItem.classList.add("new-item-display");

    const titlePreview = document.createElement("input");
    titlePreview.classList.add("new-project-title");
    titlePreview.placeholder = "Give a name to your project.";

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("save-project-button");

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("cancel-project-button");

    titlePreview.addEventListener("input", () => {
        titlePreview.style.borderColor = "black";
        titlePreview.placeholder = "Give a name to your project.";
    });

    function isEmpty() {
        const empty = titlePreview.value.trim() === "";
        titlePreview.style.borderColor = "red";
        titlePreview.placeholder = "Title can't be empty.";
        return empty;
    }
    function reset() {
        titlePreview.value = "";
        titlePreview.style.borderColor = "black";
        titlePreview.placeholder = "Give a name to your project.";
    }

    newItem.appendChild(titlePreview);
    newItem.appendChild(saveButton);
    newItem.appendChild(cancelButton);

    return { newItem, titlePreview, saveButton, cancelButton, isEmpty, reset };
})();

function createProjectContainer() {
    const container = document.getElementById("content-container");
    const projectContainer = document.createElement("div");
    projectContainer.setAttribute("id", "project-container");

    const newProjectButton = document.createElement("button");
    newProjectButton.textContent = "+New project";
    newProjectButton.classList.add("new-project-button");
    container.appendChild(newProjectButton);

    newProjectButton.addEventListener("click", () => {
        projectContainer.appendChild(Project.newItem);
        Project.titlePreview.focus();
    });

    projectContainer.addEventListener("click", (e) => {
        const index = Array.from(projectContainer.childNodes).indexOf(
            e.target.parentNode
        );

        if (e.target.matches(".remove-button")) {
            projectContainer.removeChild(e.target.parentNode.parentNode);
        }
    });

    return projectContainer;
}

Project.saveButton.addEventListener("click", () => {
    const container = document.getElementById("project-container");
    if (Project.isEmpty()) return;

    const project = createProject(Project.titlePreview.value.trim());

    container.appendChild(project);
    container.removeChild(Project.newItem);
    Project.reset();
});
Project.cancelButton.addEventListener("click", () => {
    const container = document.getElementById("project-container");

    container.removeChild(Project.newItem);

    Project.reset();
});

function createProject(title) {
    const container = document.getElementById("project-container");

    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    const itemExpandMenu = expandMenu();

    const projectItemHeader = document.createElement("div");
    projectItemHeader.classList.add("project-item-header");

    const projectTitle = document.createElement("p");
    projectItem.classList.add("project-title");
    projectTitle.textContent = title;

    projectItemHeader.addEventListener("click", () => {
        itemExpandMenu.classList.toggle("hidden");
        if (container.querySelector(".new-item-display")) {
            container.removeChild(Project.newItem);
            Project.reset();
        }
    });

    const removeButton = document.createElement("button");
    removeButton.setAttribute("id", "remove-button");
    removeButton.classList.add("remove-button");
    removeButton.innerHTML = "X";

    projectItemHeader.appendChild(projectTitle);
    projectItemHeader.appendChild(removeButton);
    projectItem.appendChild(projectItemHeader);
    projectItem.appendChild(itemExpandMenu);

    return projectItem;
}
function expandMenu() {
    const container = document.getElementById("project-container");

    const menuContainer = document.createElement("div");
    menuContainer.classList.add("expand-menu-container");

    const menuTop = document.createElement("div");
    menuTop.classList.add("expand-menu-top");

    const addTaskButton = document.createElement("button");
    addTaskButton.classList.add("expand-menu-add-button");
    addTaskButton.textContent = "+";

    addTaskButton.addEventListener("click", () => {
        if (container.querySelector(".new-item-display")) {
            container.removeChild(Project.newItem);
            Project.reset();
        }

        const taskContainer = document.createElement("div");
        taskContainer.classList.add("project-task-container");

        const left = document.createElement("div");
        left.classList.add("task-container-left");
        const mark = document.createElement("p");
        mark.textContent = "●";
        const task = document.createElement("p");
        task.classList.add("project-task-title");
        task.contentEditable = "true";
        task.spellcheck = false;

        const removeTaskButton = document.createElement("button");
        removeTaskButton.classList.add("project-task-remove-button");
        removeTaskButton.textContent = "x";

        left.appendChild(mark);
        left.appendChild(task);
        taskContainer.appendChild(left);
        taskContainer.appendChild(removeTaskButton);
        menuContainer.appendChild(taskContainer);
        task.focus();

        removeTaskButton.addEventListener("click", () => {
            taskContainer.removeChild(left);
            taskContainer.removeChild(removeTaskButton);
            menuContainer.removeChild(taskContainer);
        });
    });
    menuTop.appendChild(addTaskButton);
    menuContainer.appendChild(menuTop);

    return menuContainer;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
