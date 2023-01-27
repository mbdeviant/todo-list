export default function createProjectDisplay() {
    const container = document.getElementById("content-container");
    const buttons = document.querySelectorAll(".nav-button");
    const projectsButton = document.getElementById("projects-button");

    projectsButton.addEventListener("click", () => {
        if (container.querySelector("#project-container")) return;
        buttons.forEach((button) => button.classList.remove("selected"));
        projectsButton.classList.add("selected");
        removeAllChildNodes(container);
        container.appendChild(createProjectContainer());
    });
}

const Id = (() => {
    let projectId = parseInt(localStorage.getItem("projectId"), 10) || 0;
    let taskId = parseInt(localStorage.getItem("taskId"), 10) || 0;

    function updateLocalStorage() {
        localStorage.setItem("projectId", projectId);
        localStorage.setItem("taskId", taskId);
    }

    return {
        get projectId() {
            return projectId;
        },
        set projectId(value) {
            projectId = value;
            updateLocalStorage();
        },
        get taskId() {
            return taskId;
        },
        set taskId(value) {
            taskId = value;
            updateLocalStorage();
        },
        incrementProjectId() {
            projectId += 1;
            updateLocalStorage();
        },
        incrementTaskId() {
            taskId += 1;
            updateLocalStorage();
        },
    };
})();

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

    return {
        newItem,
        titlePreview,
        saveButton,
        cancelButton,
        isEmpty,
        reset,
    };
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
        if (e.target.matches(".remove-button")) {
            const projects = JSON.parse(localStorage.getItem("projects")) || [];
            const { projectId } = e.target.parentNode.parentNode.dataset;
            const index = projects.findIndex(
                (p) => parseInt(p.id, 10) === parseInt(projectId, 10)
            );
            projects.splice(index, 1);
            projectContainer.removeChild(e.target.parentNode.parentNode);
            localStorage.setItem("projects", JSON.stringify(projects));
        }
    });

    function getDataFromLocalStorage() {
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        if (!projects) return;
        projects.forEach((project) => {
            const projectItem = createProject(project.title);
            projectItem.dataset.projectId = project.id;
            project.tasks.forEach((task) => {
                const taskItem = createProjectTask(task.title);
                taskItem.dataset.taskId = task.id;
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
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    if (Project.isEmpty()) return;

    const projectTitle = Project.titlePreview.value.trim();
    const project = createProject(projectTitle);
    project.dataset.projectId = Id.projectId;

    projects.push({
        title: projectTitle,
        id: Id.projectId,
        tasks: [],
    });

    localStorage.setItem("projects", JSON.stringify(projects));
    Id.incrementProjectId();

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
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        const text = "";
        const task = createProjectTask(text);
        task.dataset.taskId = Id.taskId;
        expandmenuContainer.appendChild(task);
        const { projectId } = expandmenuContainer.parentNode.dataset;
        const projectIndex = projects.find(
            (p) => parseInt(p.id, 10) === parseInt(projectId, 10)
        );

        projectIndex.tasks.push({ title: text, id: task.dataset.taskId });
        localStorage.setItem("projects", JSON.stringify(projects));
        Id.incrementTaskId();
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

    task.addEventListener("input", (e) => {
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        const { taskId } = taskContainer.dataset;
        const { projectId } =
            e.target.parentNode.parentNode.parentNode.parentNode.dataset;
        const updatedTitle = e.target.textContent;
        const matchingProject = projects.find(
            (p) => parseInt(p.id, 10) === parseInt(projectId, 10)
        );
        const matchingTask = matchingProject.tasks.find(
            (t) => parseInt(t.id, 10) === parseInt(taskId, 10)
        );
        matchingTask.title = updatedTitle;
        localStorage.setItem("projects", JSON.stringify(projects));
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
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        const { taskId } = e.target.parentNode.dataset;
        const { projectId } = e.target.parentNode.parentNode.parentNode.dataset;
        const projectIndex = projects.findIndex(
            (p) => parseInt(p.id, 10) === parseInt(projectId, 10)
        );
        const taskIndex = projects[projectIndex].tasks.findIndex(
            (t) => parseInt(t.id, 10) === parseInt(taskId, 10)
        );
        projects[projectIndex].tasks.splice(taskIndex, 1);
        localStorage.setItem("projects", JSON.stringify(projects));
        e.target.parentNode.remove();
    });
    return taskContainer;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
