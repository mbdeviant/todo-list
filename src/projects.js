export default function createProjectDisplay() {
    const container = document.getElementById("content-container");
    const projectsButton = document.getElementById("projects-button");

    projectsButton.addEventListener("click", () => {
        if (container.querySelector("#project-container")) return;
        removeAllChildNodes(container);
        container.appendChild(createProjectContainer());
    });
}

const Id = (() => {
    const projectId = 0;
    const taskId = 0;
    return {
        projectId,
        taskId,
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
        const data = localStorage.getItem("projects");
        if (!data) return;

        const { projects } = JSON.parse(data);

        if (e.target.matches(".remove-button")) {
            const { projectId } = e.target.parentNode.parentNode.dataset;
            console.log(projectId);
            return;
            const index = projects.findIndex(
                (project) => project.projectId === projectId
            );
            projects.splice(projectId, 1);
            projectContainer.removeChild(e.target.parentNode.parentNode);
            localStorage.setItem("projects", JSON.stringify({ projects }));
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

    if (Project.isEmpty()) return;
    const projectTitle = Project.titlePreview.value.trim();
    const project = createProject(projectTitle);
    project.dataset.projectId = Id.projectId;
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push({
        title: projectTitle,
        id: project.dataset.projectId,
        tasks: [],
    });
    localStorage.setItem("projects", JSON.stringify(projects));
    Id.projectId += 1;

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
        const text = "";
        const task = createProjectTask(text);
        task.dataset.taskId = Id.taskId;
        expandmenuContainer.appendChild(task);
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        const { projectId } = expandmenuContainer.parentNode.dataset;
        const projectIndex = projects.find((p) => p.id === projectId);
        console.log(projectIndex);
        projectIndex.tasks.push({ title: text, id: task.dataset.taskId });
        localStorage.setItem("projects", JSON.stringify(projects));
        Id.taskId += 1;
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
        console.log(taskId);
        const { projectId } =
            e.target.parentNode.parentNode.parentNode.parentNode.dataset;
        const updatedTitle = e.target.textContent;
        const matchingProject = projects.find((p) => p.id === projectId);
        const matchingTask = matchingProject.tasks.find((t) => t.id === taskId);
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
        const data = localStorage.getItem("projects");
        const { projects } = JSON.parse(data);
        const { taskId } = e.target.parentNode.dataset; // saving the indexes correct but not getting them correct!
        console.log(`${taskId} taskId`);
        const { projectId } = e.target.parentNode.parentNode.parentNode.dataset;
        console.log(`${projectId} project id`);
        const projectIndex = projects.findIndex(
            (project) => project.id === projectId
        );
        const taskIndex = projects[projectIndex].tasks.findIndex(
            (taskItem) => taskItem.id === taskId
        );
        projects[projectIndex].tasks.splice(taskIndex, 1);
        localStorage.setItem("projects", JSON.stringify({ projects }));
        e.target.parentNode.remove();
    });
    return taskContainer;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
