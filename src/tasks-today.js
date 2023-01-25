export default function createTodayDisplay() {
    const container = document.getElementById("content-container");
    const todayButton = document.getElementById("today-button");

    todayButton.addEventListener("click", () => {
        container.appendChild(createTodayContainer());
        console.log("hehe");
    });
}

function createTodayContainer() {
    const container = document.getElementById("content-container");

    const taskTodayContainer = document.createElement("div");
    taskTodayContainer.setAttribute("id", "task-today-container");
    const testButton = document.createElement("button");
    testButton.textContent = "test";

    const todaysDate = new Date();
    const yyyy = todaysDate.getFullYear();
    let mm = todaysDate.getMonth() + 1;
    let dd = todaysDate.getDate();
    if (dd < 10) dd = `0${dd}`;
    if (mm < 10) mm = `0${mm}`;
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    testButton.addEventListener("click", () => {
        console.log(tasks.filter((task) => task.date === formattedDate));
        // console.log(tasks[0].date);
        // console.log(formattedDate);
    });

    taskTodayContainer.appendChild(testButton);
    return taskTodayContainer;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
