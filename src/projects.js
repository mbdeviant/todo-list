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
        const data = localStorage.getItem("projects");
        if (!data) return;
        const { projects } = JSON.parse(data);
        if (e.target.matches(".remove-button")) {
            // const index = Array.from(projectContainer.childNodes).indexOf(
            //     e.target.parentNode.parentNode
            // );
            const { projectId } = e.target.parentNode.parentNode.dataset;
            const index = projects.findIndex(
                (project) => project.id === projectId
            );
            projects.splice(index, 1);
            // console.log(index);
            projectContainer.removeChild(e.target.parentNode.parentNode);
            localStorage.setItem("projects", JSON.stringify({ projects }));
        }
    });

    function getDataFromLocalStorage() {
        const data = localStorage.getItem("projects");
        if (!data) return;
        const { projects } = JSON.parse(data);
        if (!projects) return;
        projects.forEach((project) => {
            const projectItem = createProject(project.title, project.id);
            project.tasks.forEach((task) => {
                const taskItem = createProjectTask(task.title);
                projectItem.expandMenu.appendChild(taskItem);
            });
            projectContainer.appendChild(projectItem);
        });
    }
    getDataFromLocalStorage();
    return projectContainer;
}

Project.saveButton.addEventListener("click", () => {
    const container = document.getElementById("project-container");

    if (Project.isEmpty()) return;
    const project = createProject(Project.titlePreview.value.trim());

    container.appendChild(project);
    container.removeChild(Project.newItem);
    Project.reset();
    saveProjectToLocalStorage();
});
Project.cancelButton.addEventListener("click", () => {
    const container = document.getElementById("project-container");
    container.removeChild(Project.newItem);
    Project.reset();
});

function createProject(title) {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");

    const projectItemHeader = document.createElement("div");
    projectItemHeader.classList.add("project-item-header");

    const projectTitle = document.createElement("p");
    projectTitle.classList.add("project-title");
    projectTitle.textContent = title;

    const removeButton = document.createElement("button");
    removeButton.setAttribute("id", "remove-button");
    removeButton.classList.add("remove-button");
    removeButton.innerHTML = "X";

    const expandmenuContainer = document.createElement("div");
    expandmenuContainer.classList.add("expand-menu-container");

    const menuTop = document.createElement("div");
    menuTop.classList.add("expand-menu-top");

    const addTaskButton = document.createElement("button");
    addTaskButton.classList.add("expand-menu-add-button");
    addTaskButton.textContent = "+";

    addTaskButton.addEventListener("click", () => {
        const task = createProjectTask();
        expandmenuContainer.appendChild(task);
    });
    projectItem.expandMenu = expandmenuContainer;

    menuTop.appendChild(addTaskButton);
    expandmenuContainer.appendChild(menuTop);

    projectItemHeader.addEventListener("click", () => {
        expandmenuContainer.classList.toggle("hidden");
    });

    projectItemHeader.appendChild(projectTitle);
    projectItemHeader.appendChild(removeButton);
    projectItem.appendChild(projectItemHeader);
    projectItem.appendChild(expandmenuContainer);

    return projectItem;
}

function createProjectTask(text) {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("project-task-container");

    const left = document.createElement("div");
    left.classList.add("task-container-left");
    const mark = document.createElement("p");
    mark.textContent = "●";

    const task = document.createElement("p");
    task.textContent = text;
    task.classList.add("project-task-title");
    task.contentEditable = "true";
    task.spellcheck = false;
    task.addEventListener("input", () => {
        saveProjectToLocalStorage();
    });

    const removeTaskButton = document.createElement("button");
    removeTaskButton.classList.add("project-task-remove-button");
    removeTaskButton.textContent = "x";

    left.appendChild(mark);
    left.appendChild(task);
    taskContainer.appendChild(left);
    taskContainer.appendChild(removeTaskButton);
    task.focus();

    removeTaskButton.addEventListener("click", (e) => {
        const index = Array.from(
            e.target.parentNode.parentNode.childNodes
        ).indexOf(e.target.parentNode);
        console.log(index - 1); // minus the add button in the expand menu container
        // taskContainer.removeChild(left);
        // taskContainer.removeChild(removeTaskButton);
        removeTaskFromProject(index - 1);
    });
    return taskContainer;
}

function saveProjectToLocalStorage() {
    const projectContainer = document.getElementById("project-container");

    const projects = [];
    projectContainer.childNodes.forEach((project) => {
        const projectTitle =
            project.querySelector(".project-title").textContent;

        const tasks = [];
        project.querySelectorAll(".task-container-left").forEach((task) => {
            const taskTitle = task.querySelector(
                ".project-task-title"
            ).textContent;
            tasks.push({ title: taskTitle });
        });
        projects.push({ title: projectTitle, tasks });
    });
    const data = JSON.stringify({ projects });
    localStorage.setItem("projects", data);
}

function removeTaskFromProject(task) {
    const data = localStorage.getItem("projects");
    if (!data) return;
    const { projects } = JSON.parse(data);
    const index = projects.indexOf(
        (savedTask) => savedTask.title === task.title
    );
    console.log(index);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
