import { createTask } from "./tasks";

export default function createTodayDisplay() {
    const container = document.getElementById("content-container");
    const todayButton = document.getElementById("today-button");

    todayButton.addEventListener("click", () => {
        if (container.querySelector("#task-today-container")) return;
        removeAllChildNodes(container);
        container.appendChild(createTodayContainer());
        console.log("hehe");
    });
}

function createTodayContainer() {
    const taskTodayContainer = document.createElement("div");
    taskTodayContainer.setAttribute("id", "task-today-container");

    const todaysDate = new Date();
    const yyyy = todaysDate.getFullYear();
    let mm = todaysDate.getMonth() + 1;
    let dd = todaysDate.getDate();
    if (dd < 10) dd = `0${dd}`;
    if (mm < 10) mm = `0${mm}`;
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const filteredTasks = tasks.filter((task) => task.date === formattedDate);

    filteredTasks.forEach((task) => {
        const taskItem = createTask(
            task.desc,
            task.date,
            task.priority,
            task.check
        );
        taskTodayContainer.appendChild(taskItem);
    });

    return taskTodayContainer;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
