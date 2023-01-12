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
function createProjectContainer() {
    const container = document.getElementById("content-container");
    const projectContainer = document.createElement("div");
    projectContainer.setAttribute("id", "project-container");

    const newProjectButton = document.createElement("button");
    newProjectButton.textContent = "+New project";
    newProjectButton.classList.add("new-project-button");
    container.appendChild(newProjectButton);

    newProjectButton.addEventListener("click", () => {
        const project = createProject();

        projectContainer.appendChild(project);
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
