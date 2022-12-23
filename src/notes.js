export default function createNoteDisplay() {
    const container = document.getElementById("content-container");
    const notesButton = document.getElementById("notes-button");

    notesButton.addEventListener("click", () => {
        if (container.hasChildNodes("noteContainer")) return;
        container.appendChild(createNoteContainer());
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

    addNoteButton.addEventListener("click", () => {
        noteContainer.appendChild(createNote());
    });

    return noteContainer;
}

function createNote() {
    const noteContainer = document.getElementById("note-container");
    const noteItem = document.createElement("div");
    noteItem.classList.add("note-item");

    const noteText = document.createElement("textarea");
    noteText.classList.add("note-text");
    noteText.spellcheck = false;
    noteText.style.backgroundColor = `hsl(${360 * Math.random()},${
        25 + 70 * Math.random()
    }%,${85 + 10 * Math.random()}%)`;

    const removeButton = document.createElement("button");
    removeButton.setAttribute("id", "remove-button");
    removeButton.classList.add("remove-button");
    removeButton.innerHTML = "X";

    removeButton.addEventListener("click", () => {
        noteContainer.removeChild(noteItem);
    });
    noteItem.appendChild(noteText);
    noteItem.appendChild(removeButton);

    return noteItem;
}
