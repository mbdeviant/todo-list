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
            const { projectId } = e.target.parentNode.parentNode.dataset;
            console.log(projectId);
            return;
            const index = projects.findIndex(
                // something terribly wrong here
                (project) => project.id === projectId
            );
            console.log(index);
            projects.splice(index, 1);
            projectContainer.removeChild(e.target.parentNode.parentNode);
            localStorage.setItem("projects", JSON.stringify({ projects }));
        }
    });

    function getDataFromLocalStorage() {
        const data = localStorage.getItem("projects");
        if (!data) return;
        const { projects } = JSON.parse(data);
        if (!projects) return;
        let projectid = 0;
        let taskid = 0; // forgett adding id in the createProject function. add dataset while you reloading them from dom. do same thing in the saveToLocalStorage apply it to task itemm too if needed
        projects.forEach((project) => {
            const projectItem = createProject(project.title);
            projectItem.dataset.projectId = projectid;
            projectid += 1;

            project.tasks.forEach((task) => {
                const taskItem = createProjectTask(task.title);
                taskItem.dataset.taskId = taskid;
                taskid += 1;
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
    let id = 100;
    const project = createProject(Project.titlePreview.value.trim());
    project.dataset.projectId = id;
    id += 100;
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

    // const projectId = Date.now();
    // projectItem.dataset.projectId = projectId;
    // console.log(projectId);

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

    let taskId = 100;
    addTaskButton.addEventListener("click", () => {
        const text = "";
        const task = createProjectTask(text);
        task.dataset.taskId = taskId;
        taskId += 1;
        expandmenuContainer.appendChild(task);
        console.log(taskId);
        // const data = localStorage.getItem("projects");

        // const { projects } = JSON.parse(data);
        // const { projectId } = expandmenuContainer.parentNode.dataset;
        // console.log(projectId); // undefined
        // const projectIndex = projects.findIndex(
        //     (project) => project.id === projectId
        // );
        // console.log(projectIndex) // always returns 0
        // projects[projectIndex].tasks.push({ title: text, id: taskId });
        // localStorage.setItem("projects", JSON.stringify({ projects }));
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
        const data = localStorage.getItem("projects");
        const { projects } = JSON.parse(data);
        const { taskId } = e.target.parentNode.dataset; // saving the indexes correct but not getting them correct!
        console.log(`${taskId} taskId`);
        const { projectId } = e.target.parentNode.parentNode.parentNode.dataset;
        console.log(`${projectId} project id`);
        // console.log(projects[projectId]);
        return;
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

function saveProjectToLocalStorage() {
    const projectContainer = document.getElementById("project-container");

    const projects = [];
    let projectid = 0;
    let taskid = 0;
    projectContainer.childNodes.forEach((project) => {
        const projectTitle =
            project.querySelector(".project-title").textContent;
        const tasks = [];
        project.querySelectorAll(".task-container-left").forEach((task) => {
            const taskTitle = task.querySelector(
                ".project-task-title"
            ).textContent;
            tasks.push({ title: taskTitle, taskId: taskid });
            taskid += 1;
        });
        projects.push({ title: projectTitle, projectId: projectid, tasks });
        projectid += 1;
    });
    const data = JSON.stringify({ projects });
    localStorage.setItem("projects", data);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
