export default function createProjectDisplay() {
    const container = document.getElementById("content-container");
    const projectsButton = document.getElementById("projects-button");

    projectsButton.addEventListener("click", () => {
        console.log("ğü");
        if (container.querySelector("#project-container")) return;
        removeAllChildNodes(container);
        container.appendChild(createProjectContainer());
    });
}

const Project = (() => {
    const newItem = document.createElement("div");
    const projectTitle = document.createElement("textarea");
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    newItem.appendChild(projectTitle);
    newItem.appendChild(saveButton);
    newItem.appendChild(cancelButton);

    return { newItem, saveButton };
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
    });

    return projectContainer;
}

function createProject() {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");

    const projectTitle = document.createElement("textarea");
    projectItem.classList.add("project-title");
    projectTitle.placeholder = "Enter project title here";
    projectItem.contentEditable = true;

    projectItem.appendChild(projectTitle);

    return projectItem;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
