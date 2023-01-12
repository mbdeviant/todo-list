/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _notes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notes */ \"./src/notes.js\");\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ \"./src/projects.js\");\n/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks */ \"./src/tasks.js\");\n\r\n\r\n\r\n\r\n(0,_notes__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n(0,_tasks__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\r\n(0,_projects__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\n\n\n//# sourceURL=webpack://patates/./src/index.js?");

/***/ }),

/***/ "./src/notes.js":
/*!**********************!*\
  !*** ./src/notes.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createNoteDisplay)\n/* harmony export */ });\nfunction createNoteDisplay() {\r\n    const container = document.getElementById(\"content-container\");\r\n    const notesButton = document.getElementById(\"notes-button\");\r\n    notesButton.addEventListener(\"click\", () => {\r\n        if (container.querySelector(\"#note-container\")) return;\r\n        removeAllChildNodes(container);\r\n        container.appendChild(createNoteContainer());\r\n    });\r\n}\r\n\r\nfunction createNoteContainer() {\r\n    const container = document.getElementById(\"content-container\");\r\n    const noteContainer = document.createElement(\"div\");\r\n    noteContainer.setAttribute(\"id\", \"note-container\");\r\n\r\n    const newNoteButton = document.createElement(\"button\");\r\n    newNoteButton.classList.add(\"new-note-button\");\r\n    newNoteButton.setAttribute(\"id\", \"new-note-button\");\r\n    newNoteButton.innerHTML = \"+Add a new note\";\r\n\r\n    container.appendChild(newNoteButton);\r\n\r\n    newNoteButton.addEventListener(\"click\", () => {\r\n        const note = createNote(\r\n            \"\",\r\n            `hsl(${360 * Math.random()},${25 + 70 * Math.random()}%,${\r\n                85 + 10 * Math.random()\r\n            }%)`\r\n        );\r\n        const notes = JSON.parse(localStorage.getItem(\"notes\")) || []; // if notes are null don't return value, set it to an array\r\n        notes.push({ text: \"\", color: note.style.backgroundColor });\r\n        localStorage.setItem(\"notes\", JSON.stringify(notes));\r\n        noteContainer.appendChild(note);\r\n    });\r\n    noteContainer.addEventListener(\"click\", (e) => {\r\n        if (e.target.matches(\".remove-button\")) {\r\n            const note = e.target.parentNode;\r\n            noteContainer.removeChild(note);\r\n            removeNote(note);\r\n        }\r\n    });\r\n    noteContainer.addEventListener(\"input\", (e) => {\r\n        if (e.target.matches(\"textarea\")) {\r\n            updateNote(e.target.parentNode);\r\n        }\r\n    });\r\n    function loadSavedNotes() {\r\n        const notes = JSON.parse(localStorage.getItem(\"notes\")) || [];\r\n        // eslint-disable-next-line no-restricted-syntax\r\n        for (const note of notes) {\r\n            const stickyNote = createNote(note.text, note.color);\r\n            noteContainer.appendChild(stickyNote);\r\n        }\r\n    }\r\n    loadSavedNotes();\r\n    return noteContainer;\r\n}\r\nfunction createNote(text, color) {\r\n    const stickyNote = document.createElement(\"div\");\r\n    stickyNote.classList.add(\"note-item\");\r\n    stickyNote.style.backgroundColor = color;\r\n\r\n    const textArea = document.createElement(\"textarea\");\r\n    textArea.classList.add(\"note-text\");\r\n    textArea.spellcheck = false;\r\n    textArea.value = text;\r\n\r\n    const removeButton = document.createElement(\"button\");\r\n    removeButton.setAttribute(\"id\", \"remove-button\");\r\n    removeButton.classList.add(\"remove-button\");\r\n    removeButton.innerHTML = \"X\";\r\n\r\n    stickyNote.appendChild(textArea);\r\n    stickyNote.appendChild(removeButton);\r\n\r\n    return stickyNote;\r\n}\r\nfunction updateNote(note) {\r\n    const notes = JSON.parse(localStorage.getItem(\"notes\")) || [];\r\n    const index = notes.findIndex(\r\n        (savedNote) => savedNote.color === note.style.backgroundColor\r\n    );\r\n    if (index !== -1) {\r\n        notes[index].text = note.querySelector(\"textarea\").value;\r\n        localStorage.setItem(\"notes\", JSON.stringify(notes));\r\n    }\r\n}\r\nfunction removeNote(note) {\r\n    const notes = JSON.parse(localStorage.getItem(\"notes\")) || [];\r\n    const index = notes.findIndex(\r\n        (savedNote) => savedNote.color === note.style.backgroundColor\r\n    );\r\n    if (index !== -1) {\r\n        notes.splice(index, 1);\r\n        localStorage.setItem(\"notes\", JSON.stringify(notes));\r\n    }\r\n}\r\n\r\nfunction removeAllChildNodes(parent) {\r\n    while (parent.firstChild) {\r\n        parent.removeChild(parent.firstChild);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://patates/./src/notes.js?");

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createProjectDisplay)\n/* harmony export */ });\nfunction createProjectDisplay() {\r\n    const container = document.getElementById(\"content-container\");\r\n    const projectsButton = document.getElementById(\"projects-button\");\r\n\r\n    projectsButton.addEventListener(\"click\", () => {\r\n        console.log(\"ğü\");\r\n        if (container.querySelector(\"#project-container\")) return;\r\n        removeAllChildNodes(container);\r\n        container.appendChild(createProjectContainer());\r\n    });\r\n}\r\n\r\nconst Project = (() => {\r\n    const newItem = document.createElement(\"div\");\r\n    const projectTitle = document.createElement(\"textarea\");\r\n    const saveButton = document.createElement(\"button\");\r\n    saveButton.textContent = \"Save\";\r\n    const cancelButton = document.createElement(\"button\");\r\n    cancelButton.textContent = \"Cancel\";\r\n    newItem.appendChild(projectTitle);\r\n    newItem.appendChild(saveButton);\r\n    newItem.appendChild(cancelButton);\r\n\r\n    return { newItem, saveButton };\r\n})();\r\n\r\nfunction createProjectContainer() {\r\n    const container = document.getElementById(\"content-container\");\r\n    const projectContainer = document.createElement(\"div\");\r\n    projectContainer.setAttribute(\"id\", \"project-container\");\r\n\r\n    const newProjectButton = document.createElement(\"button\");\r\n    newProjectButton.textContent = \"+New project\";\r\n    newProjectButton.classList.add(\"new-project-button\");\r\n    container.appendChild(newProjectButton);\r\n\r\n    newProjectButton.addEventListener(\"click\", () => {\r\n        projectContainer.appendChild(Project.newItem);\r\n    });\r\n\r\n    return projectContainer;\r\n}\r\n\r\nfunction createProject() {\r\n    const projectItem = document.createElement(\"div\");\r\n    projectItem.classList.add(\"project-item\");\r\n\r\n    const projectTitle = document.createElement(\"textarea\");\r\n    projectItem.classList.add(\"project-title\");\r\n    projectTitle.placeholder = \"Enter project title here\";\r\n    projectItem.contentEditable = true;\r\n\r\n    projectItem.appendChild(projectTitle);\r\n\r\n    return projectItem;\r\n}\r\n\r\nfunction removeAllChildNodes(parent) {\r\n    while (parent.firstChild) {\r\n        parent.removeChild(parent.firstChild);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://patates/./src/projects.js?");

/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createTasksDisplay)\n/* harmony export */ });\nfunction createTasksDisplay() {\r\n    const container = document.getElementById(\"content-container\");\r\n    const tasksButton = document.getElementById(\"tasks-button\");\r\n\r\n    tasksButton.addEventListener(\"click\", () => {\r\n        if (container.querySelector(\"#task-item-container\")) return;\r\n        removeAllChildNodes(container);\r\n        container.appendChild(createTaskContainer());\r\n    });\r\n}\r\n\r\nconst Overlay = (() => {\r\n    const taskFormOverlay = document.getElementById(\"task-form-overlay\");\r\n    taskFormOverlay.addEventListener(\"click\", (e) => {\r\n        if (e.target === taskFormOverlay)\r\n            taskFormOverlay.style.display = \"none\";\r\n    });\r\n    function close() {\r\n        taskFormOverlay.style.display = \"none\";\r\n    }\r\n    function show() {\r\n        taskFormOverlay.style.display = \"block\";\r\n    }\r\n    return {\r\n        close,\r\n        show,\r\n    };\r\n})();\r\nconst Form = (() => {\r\n    const formContainer = document.getElementById(\"task-form-container\");\r\n    const formTitle = document.getElementById(\"form-title\");\r\n    const form = document.getElementById(\"task-form\");\r\n    const description = document.getElementById(\"task-desc\");\r\n    const date = document.getElementById(\"task-due-date\");\r\n    const priority = document.getElementById(\"task-priority-dropdown\");\r\n    const formWarning = document.createElement(\"p\");\r\n    const addTaskButton = document.getElementById(\"add-task-button\");\r\n\r\n    formWarning.setAttribute(\"id\", \"form-warning\");\r\n    let empty = true;\r\n\r\n    description.addEventListener(\"keydown\", () => {\r\n        if (!formContainer.querySelector(\"#form-warning\")) return;\r\n        formContainer.removeChild(formWarning);\r\n    });\r\n    date.addEventListener(\"click\", () => {\r\n        if (!formContainer.querySelector(\"#form-warning\")) return;\r\n        formContainer.removeChild(formWarning);\r\n    });\r\n\r\n    function reset() {\r\n        formTitle.textContent = \"Add a new task\";\r\n        addTaskButton.style.display = \"block\";\r\n        form.reset();\r\n    }\r\n    function focus() {\r\n        description.focus();\r\n    }\r\n\r\n    function showWarning() {\r\n        if (formContainer.querySelector(\"#form-warning\")) return;\r\n        formWarning.textContent = \"Please fill all the blanks.\";\r\n        formContainer.appendChild(formWarning);\r\n    }\r\n    function removeWarning() {\r\n        if (!formContainer.querySelector(\"#form-warning\")) return;\r\n        formContainer.removeChild(formWarning);\r\n    }\r\n    function isEmpty() {\r\n        if (description.value === \"\" || date.value === \"\") empty = true;\r\n        if (description.value !== \"\" && date.value !== \"\") empty = false;\r\n        return empty;\r\n    }\r\n    return {\r\n        reset,\r\n        showWarning,\r\n        isEmpty,\r\n        removeWarning,\r\n        focus,\r\n        description,\r\n        date,\r\n        priority,\r\n        addTaskButton,\r\n    };\r\n})();\r\n\r\nfunction createTaskContainer() {\r\n    const container = document.getElementById(\"content-container\");\r\n    const taskItemContainer = document.createElement(\"div\");\r\n    taskItemContainer.setAttribute(\"id\", \"task-item-container\");\r\n\r\n    const newTaskButton = document.createElement(\"button\");\r\n    newTaskButton.textContent = \"+New task\";\r\n    newTaskButton.classList.add(\"new-task-button\");\r\n    container.appendChild(newTaskButton);\r\n\r\n    newTaskButton.addEventListener(\"click\", () => {\r\n        Overlay.show();\r\n        Form.reset();\r\n        Form.removeWarning();\r\n        Form.focus();\r\n    });\r\n\r\n    taskItemContainer.addEventListener(\"click\", (e) => {\r\n        const tasks = JSON.parse(localStorage.getItem(\"tasks\")) || [];\r\n        const index = Array.from(taskItemContainer.childNodes).indexOf(\r\n            e.target.parentNode.parentNode.parentNode\r\n        );\r\n        if (e.target.matches(\".remove-button\")) {\r\n            taskItemContainer.removeChild(\r\n                e.target.parentNode.parentNode.parentNode\r\n            );\r\n            tasks.splice(index, 1);\r\n        }\r\n        if (e.target.matches(\".checkbox\")) {\r\n            tasks[index].check = !tasks[index].check;\r\n        }\r\n        localStorage.setItem(\"tasks\", JSON.stringify(tasks));\r\n    });\r\n\r\n    function loadSavedTasks() {\r\n        const tasks = JSON.parse(localStorage.getItem(\"tasks\")) || [];\r\n        // eslint-disable-next-line no-restricted-syntax\r\n        for (const task of tasks) {\r\n            const taskItem = createTask(\r\n                task.desc,\r\n                task.date,\r\n                task.priority,\r\n                task.check\r\n            );\r\n\r\n            taskItemContainer.appendChild(taskItem);\r\n        }\r\n    }\r\n\r\n    loadSavedTasks();\r\n    return taskItemContainer;\r\n}\r\n\r\nForm.addTaskButton.addEventListener(\"click\", (e) => {\r\n    const taskItemContainer = document.getElementById(\"task-item-container\");\r\n    e.preventDefault();\r\n\r\n    if (Form.isEmpty()) {\r\n        Form.showWarning();\r\n        return;\r\n    }\r\n    const checkInit = false;\r\n    const task = createTask(\r\n        Form.description.value,\r\n        Form.date.value,\r\n        Form.priority.value,\r\n        checkInit\r\n    );\r\n    const tasks = JSON.parse(localStorage.getItem(\"tasks\")) || [];\r\n    tasks.push({\r\n        desc: Form.description.value,\r\n        date: Form.date.value,\r\n        priority: Form.priority.value,\r\n        check: checkInit,\r\n    });\r\n\r\n    localStorage.setItem(\"tasks\", JSON.stringify(tasks));\r\n    taskItemContainer.appendChild(task);\r\n    Overlay.close();\r\n});\r\n\r\nfunction createTask(desc, due, priorityValue, check) {\r\n    const taskItem = document.createElement(\"div\");\r\n    taskItem.classList.add(\"task-item\");\r\n    const taskInfo = document.createElement(\"div\");\r\n    taskInfo.classList.add(\"task-info\");\r\n    const right = document.createElement(\"div\");\r\n    right.classList.add(\"right\");\r\n    const left = document.createElement(\"div\");\r\n    left.classList.add(\"left\");\r\n\r\n    const checkbox = document.createElement(\"input\");\r\n    checkbox.setAttribute(\"type\", \"checkbox\");\r\n    checkbox.classList.add(\"checkbox\");\r\n    checkbox.checked = check;\r\n\r\n    const description = document.createElement(\"p\");\r\n    description.classList.add(\"task-desc-preview\");\r\n    description.textContent = desc;\r\n\r\n    const dateValue = new Date(due);\r\n    const yyyy = dateValue.getFullYear();\r\n    let mm = dateValue.getMonth() + 1;\r\n    let dd = dateValue.getDate();\r\n    if (dd < 10) dd = `0${dd}`;\r\n    if (mm < 10) mm = `0${mm}`;\r\n    const formattedDate = `Due Date: ${dd}/${mm}/${yyyy}`;\r\n    const date = document.createElement(\"p\");\r\n    date.classList.add(\"task-date-preview\");\r\n    date.textContent = formattedDate;\r\n\r\n    const priority = document.createElement(\"p\");\r\n    priority.classList.add(\"task-priority-preview\");\r\n    priority.textContent = `Priority: ${priorityValue}`;\r\n\r\n    if (priorityValue === \"High\") priority.style.color = \"maroon\";\r\n    if (priorityValue === \"Medium\") priority.style.color = \"orange\";\r\n    if (priorityValue === \"Low\") priority.style.color = \"green\";\r\n\r\n    const removeButton = document.createElement(\"button\");\r\n    removeButton.setAttribute(\"id\", \"remove-button\");\r\n    removeButton.classList.add(\"remove-button\");\r\n    removeButton.innerHTML = \"X\";\r\n\r\n    checkbox.addEventListener(\"click\", () => {\r\n        left.classList.toggle(\"completed\");\r\n        right.classList.toggle(\"completed\");\r\n        taskItem.classList.toggle(\"completed\");\r\n        taskInfo.classList.toggle(\"completed\");\r\n    });\r\n    if (check) {\r\n        left.classList.add(\"completed\");\r\n        right.classList.add(\"completed\");\r\n        taskItem.classList.add(\"completed\");\r\n        taskInfo.classList.add(\"completed\");\r\n    }\r\n    left.appendChild(checkbox);\r\n    left.appendChild(description);\r\n    right.appendChild(date);\r\n    right.appendChild(priority);\r\n    right.appendChild(removeButton);\r\n    taskInfo.appendChild(left);\r\n    taskInfo.appendChild(right);\r\n    taskItem.appendChild(taskInfo);\r\n\r\n    return taskItem;\r\n}\r\n\r\nfunction removeAllChildNodes(parent) {\r\n    while (parent.firstChild) {\r\n        parent.removeChild(parent.firstChild);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://patates/./src/tasks.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;