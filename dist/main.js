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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _notes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notes */ \"./src/notes.js\");\n/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ \"./src/tasks.js\");\n\r\n\r\n\r\n(0,_notes__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n(0,_tasks__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\n\n\n//# sourceURL=webpack://patates/./src/index.js?");

/***/ }),

/***/ "./src/notes.js":
/*!**********************!*\
  !*** ./src/notes.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createNoteDisplay)\n/* harmony export */ });\nfunction createNoteDisplay() {\r\n    const container = document.getElementById(\"content-container\");\r\n    const notesButton = document.getElementById(\"notes-button\");\r\n\r\n    notesButton.addEventListener(\"click\", () => {\r\n        removeAllChildNodes(container);\r\n        container.appendChild(createNoteContainer());\r\n    });\r\n}\r\n\r\nfunction createNoteContainer() {\r\n    const container = document.getElementById(\"content-container\");\r\n    const noteContainer = document.createElement(\"div\");\r\n    noteContainer.setAttribute(\"id\", \"note-container\");\r\n\r\n    const addNoteButton = document.createElement(\"button\");\r\n    addNoteButton.classList.add(\"add-note-button\");\r\n    addNoteButton.setAttribute(\"id\", \"add-note-button\");\r\n    addNoteButton.innerHTML = \"+Add a new note\";\r\n\r\n    container.appendChild(addNoteButton);\r\n\r\n    addNoteButton.addEventListener(\"click\", () => {\r\n        const note = createNote(\r\n            \"\",\r\n            `hsl(${360 * Math.random()},${25 + 70 * Math.random()}%,${\r\n                85 + 10 * Math.random()\r\n            }%)`\r\n        );\r\n        const notes = JSON.parse(localStorage.getItem(\"notes\")) || [];\r\n        notes.push({ text: \"\", color: note.style.backgroundColor });\r\n        localStorage.setItem(\"notes\", JSON.stringify(notes));\r\n        noteContainer.appendChild(note);\r\n    });\r\n    noteContainer.addEventListener(\"click\", (e) => {\r\n        if (e.target.matches(\".remove-button\")) {\r\n            const note = e.target.parentNode;\r\n            noteContainer.removeChild(note);\r\n            removeNote(note);\r\n        }\r\n    });\r\n    noteContainer.addEventListener(\"input\", (e) => {\r\n        if (e.target.matches(\"textarea\")) {\r\n            updateNote(e.target.parentNode);\r\n        }\r\n    });\r\n    function loadSavedNotes() {\r\n        const notes = JSON.parse(localStorage.getItem(\"notes\")) || [];\r\n        // eslint-disable-next-line no-restricted-syntax\r\n        for (const note of notes) {\r\n            const stickyNote = createNote(note.text, note.color);\r\n            noteContainer.appendChild(stickyNote);\r\n        }\r\n    }\r\n    loadSavedNotes();\r\n    return noteContainer;\r\n}\r\nfunction createNote(text, color) {\r\n    const stickyNote = document.createElement(\"div\");\r\n    stickyNote.classList.add(\"note-item\");\r\n    stickyNote.style.backgroundColor = color;\r\n\r\n    const textArea = document.createElement(\"textarea\");\r\n    textArea.classList.add(\"note-text\");\r\n    textArea.spellcheck = false;\r\n    textArea.value = text;\r\n\r\n    const removeButton = document.createElement(\"button\");\r\n    removeButton.setAttribute(\"id\", \"remove-button\");\r\n    removeButton.classList.add(\"remove-button\");\r\n    removeButton.innerHTML = \"X\";\r\n\r\n    stickyNote.appendChild(textArea);\r\n    stickyNote.appendChild(removeButton);\r\n\r\n    return stickyNote;\r\n}\r\nfunction updateNote(note) {\r\n    const notes = JSON.parse(localStorage.getItem(\"notes\")) || [];\r\n    const index = notes.findIndex(\r\n        (savedNote) => savedNote.color === note.style.backgroundColor\r\n    );\r\n    if (index !== -1) {\r\n        notes[index].text = note.querySelector(\"textarea\").value;\r\n        localStorage.setItem(\"notes\", JSON.stringify(notes));\r\n    }\r\n}\r\nfunction removeNote(note) {\r\n    const notes = JSON.parse(localStorage.getItem(\"notes\")) || [];\r\n    const index = notes.findIndex(\r\n        (savedNote) => savedNote.color === note.style.backgroundColor\r\n    );\r\n    if (index !== -1) {\r\n        notes.splice(index, 1);\r\n        localStorage.setItem(\"notes\", JSON.stringify(notes));\r\n    }\r\n}\r\n\r\nfunction removeAllChildNodes(parent) {\r\n    while (parent.firstChild) {\r\n        parent.removeChild(parent.firstChild);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://patates/./src/notes.js?");

/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createTaskContainer\": () => (/* binding */ createTaskContainer),\n/* harmony export */   \"default\": () => (/* binding */ createTasksDisplay)\n/* harmony export */ });\nfunction createTasksDisplay() {\r\n    const container = document.getElementById(\"content-container\");\r\n    const tasksButton = document.getElementById(\"tasks-button\");\r\n\r\n    tasksButton.addEventListener(\"click\", () => {\r\n        removeAllChildNodes(container);\r\n        container.appendChild(createTaskContainer());\r\n    });\r\n}\r\n\r\nfunction createTaskContainer() {\r\n    const taskContainer = document.createElement(\"div\");\r\n    const text = document.createElement(\"p\");\r\n    text.innerHTML = \"i like potatoes\";\r\n    taskContainer.appendChild(text);\r\n\r\n    return taskContainer;\r\n}\r\n\r\nfunction removeAllChildNodes(parent) {\r\n    while (parent.firstChild) {\r\n        parent.removeChild(parent.firstChild);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://patates/./src/tasks.js?");

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