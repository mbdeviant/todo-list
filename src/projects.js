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
    newItem.classList.add("new-item-display");

    const titlePreview = document.createElement("input");
    titlePreview.classList.add("new-project-title");
    titlePreview.placeholder = "Give a name to your project.";

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("project-button");

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("project-button");

    newItem.appendChild(titlePreview);
    newItem.appendChild(saveButton);
    newItem.appendChild(cancelButton);

    return { newItem, titlePreview, saveButton, cancelButton };
})();

function createProjectContainer() {
    const container = document.getElementById("content-container");
    const projectContainer = document.createElement("div");
    projectContainer.setAttribute("id", "project-container");

    const newProjectButton = document.createElement("button");
    newProjectButton.textContent = "+New project";
    newProjectButton.classList.add("new-project-button");
    container.appendChild(newProjectButton);

    projectContainer.addEventListener("click", (e) => {
        if (e.target !== Project.titlePreview) {
            projectContainer.removeChild(Project.newItem);
            Project.titlePreview.value = "";
        }
    });
    newProjectButton.addEventListener("click", () => {
        projectContainer.appendChild(Project.newItem);
    });

    return projectContainer;
}
Project.saveButton.addEventListener("click", () => {
    const container = document.getElementById("project-container");
    if (Project.titlePreview.value === "") return;
    const project = createProject(Project.titlePreview.value);
    container.appendChild(project);
    container.removeChild(Project.newItem);
    Project.titlePreview.value = "";
});
// Project.cancelButton.addEventListener("click", () => {
//     const container = document.getElementById("project-container");
//     container.removeChild(Project.newItem);
// });

function createProject(title) {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");

    const projectTitle = document.createElement("textarea");
    projectItem.classList.add("project-title");
    projectTitle.textContent = title;
    projectItem.contentEditable = true;

    projectItem.appendChild(projectTitle);

    return projectItem;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
