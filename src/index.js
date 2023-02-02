import createNoteDisplay from "./notes";
import createProjectDisplay from "./projects";
import createTasksDisplay from "./tasks";
import createTodayDisplay from "./tasks-today";

createTasksDisplay();
createTodayDisplay();
createProjectDisplay();
createNoteDisplay();

const todayButton = document.getElementById("today-button");
window.onload = todayButton.click();
