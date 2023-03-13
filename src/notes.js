export default function createNoteDisplay() {
    const container = document.getElementById("content-container");
    const buttons = document.querySelectorAll(".nav-button");
    const notesButton = document.getElementById("notes-button");

    notesButton.addEventListener("click", () => {
        if (container.querySelector("#note-container")) return;
        buttons.forEach((button) => button.classList.remove("selected"));
        notesButton.classList.add("selected");
        removeAllChildNodes(container);
        container.appendChild(createNoteContainer());
    });
}

function createNoteContainer() {
    const container = document.getElementById("content-container");
    const noteContainer = document.createElement("div");
    noteContainer.setAttribute("id", "note-container");

    const newNoteButton = document.createElement("button");
    newNoteButton.classList.add("new-note-button");
    newNoteButton.setAttribute("id", "new-note-button");
    newNoteButton.innerHTML = "+New note";

    container.appendChild(newNoteButton);

    newNoteButton.addEventListener("click", () => {
        const note = createNote(
            "",
            `hsl(${360 * Math.random()},${25 + 70 * Math.random()}%,${
                85 + 10 * Math.random()
            }%)`
        );
        const notes = JSON.parse(localStorage.getItem("notes")) || []; // if notes are null don't return value, set it to an array
        notes.push({ text: "", color: note.style.backgroundColor });
        localStorage.setItem("notes", JSON.stringify(notes));
        noteContainer.appendChild(note);
        const message = document.getElementById("empty-data-message-notes");
        if (message) noteContainer.removeChild(message);
    });
    noteContainer.addEventListener("click", (e) => {
        if (e.target.matches(".remove-button")) {
            const note = e.target.parentNode;
            noteContainer.removeChild(note);
            removeNote(note);
            const notes = JSON.parse(localStorage.getItem("notes")) || [];
            if (notes.length === 0) noteContainer.appendChild(showMessage());
        }
    });
    noteContainer.addEventListener("input", (e) => {
        if (e.target.matches("textarea")) {
            updateNote(e.target.parentNode);
        }
    });
    function loadSavedNotes() {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        if (notes.length === 0) noteContainer.appendChild(showMessage());
        // eslint-disable-next-line no-restricted-syntax
        for (const note of notes) {
            const stickyNote = createNote(note.text, note.color);
            noteContainer.appendChild(stickyNote);
        }
    }
    loadSavedNotes();
    return noteContainer;
}
function createNote(text, color) {
    const stickyNote = document.createElement("div");
    stickyNote.classList.add("note-item");
    stickyNote.style.backgroundColor = color;

    const textArea = document.createElement("textarea");
    textArea.classList.add("note-text");
    textArea.spellcheck = false;
    textArea.value = text;

    const removeButton = document.createElement("button");
    removeButton.setAttribute("id", "remove-button");
    removeButton.classList.add("remove-button");
    removeButton.innerHTML = "X";

    stickyNote.appendChild(textArea);
    stickyNote.appendChild(removeButton);

    return stickyNote;
}
function updateNote(note) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const index = notes.findIndex(
        (savedNote) => savedNote.color === note.style.backgroundColor
    );
    if (index !== -1) {
        notes[index].text = note.querySelector("textarea").value;
        localStorage.setItem("notes", JSON.stringify(notes));
    }
}
function removeNote(note) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const index = notes.findIndex(
        (savedNote) => savedNote.color === note.style.backgroundColor
    );
    if (index !== -1) {
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
    }
}
function showMessage() {
    const emptyTaskMessage = document.createElement("p");
    emptyTaskMessage.classList.add("empty-data-message");
    emptyTaskMessage.setAttribute("id", "empty-data-message-notes");
    emptyTaskMessage.innerHTML = `You don't have any notes yet. You can create a new note from button above.`;

    return emptyTaskMessage;
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
