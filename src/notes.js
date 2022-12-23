export default function createNoteDisplay() {
    const container = document.getElementById("content-container");
    const notesButton = document.getElementById("notes-button");

    notesButton.addEventListener("click", () => {
        removeAllChildNodes(container);

        createNoteContainer();
        createNote();
    });
}

function createNoteContainer() {
    const container = document.getElementById("content-container");
    const noteContainer = document.createElement("div");
    noteContainer.setAttribute("id", "note-container");

    const addNoteButton = document.createElement("button");
    addNoteButton.classList.add("add-note-button");
    addNoteButton.setAttribute("id", "add-note-button");
    addNoteButton.innerHTML = "+";

    container.appendChild(addNoteButton);
    container.appendChild(noteContainer);

    addNoteButton.addEventListener("click", () => {
        console.log("ptats");
        const note = createNote(
            "",
            `hsl(${360 * Math.random()},${25 + 70 * Math.random()}%,${
                85 + 10 * Math.random()
            }%)`
        );
    });
    return noteContainer;
}
function createNote(text, color) {
    // refactor to localStorage
    const noteContainer = document.getElementById("note-container");
    const noteItem = document.createElement("div");
    noteItem.classList.add("note-item");
    noteItem.style.backgroundColor = color;
    const notes = [];
    const textArea = document.createElement("textarea");
    textArea.value = text;

    noteItem.addEventListener("click", (e) => {
        if (e.target !== noteItem) {
            updateNote(noteItem);
            console.log(notes);
        }
    });

    const removeButton = document.createElement("button");
    removeButton.setAttribute("id", "remove-button");
    removeButton.classList.add("remove-button");
    removeButton.innerHTML = "X";

    removeButton.addEventListener("click", () => {
        console.log(notes);
        removeNote(noteItem);
        noteContainer.removeChild(noteItem);
    });
    function updateNote(note) {
        const index = notes.findIndex(
            (savedNote) => savedNote.color === note.style.backgroundColor
        );
        if (index !== -1) {
            notes[index].text = note.querySelector("textarea").value;
        }
    }
    function removeNote(note) {
        const index = notes.findIndex(
            (savedNote) => savedNote.color === note.style.backgroundColor
        );
        if (index !== -1) {
            notes.splice(index, 1);
        }
    }
    function loadSavedNotes() {
        // eslint-disable-next-line no-restricted-syntax
        for (let i = 0; i < notes.length; i++) {
            const stickyNote = createNote(notes[i].text, notes[i].color);
            noteContainer.appendChild(stickyNote);
        }
    }

    noteContainer.appendChild(noteItem);
    noteItem.appendChild(textArea);
    noteItem.appendChild(removeButton);

    return { notes, loadSavedNotes, removeNote };
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
