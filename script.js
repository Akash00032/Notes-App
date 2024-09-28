const notesContainer = document.getElementById("notes-container");
const addNoteBtn = document.getElementById("add-note-btn");
const clearAllBtn = document.getElementById("clear-all-btn");
const noteInput = document.getElementById("note-input");

// Load notes from localStorage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesContainer.innerHTML = ""; // Clear existing notes
    notes.forEach(note => addNoteToDOM(note));
}

// Add a new note to the DOM
function addNoteToDOM(noteContent) {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    const noteText = document.createElement("p");
    noteText.textContent = noteContent;

    const deleteBtn = document.createElement("button");
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "del.png"; // Make sure to have a delete icon image
    deleteIcon.alt = "Delete Note";
    deleteBtn.appendChild(deleteIcon);
    
    deleteBtn.addEventListener("click", () => {
        noteDiv.remove();
        updateLocalStorage();
    });

    noteDiv.appendChild(noteText);
    noteDiv.appendChild(deleteBtn);
    notesContainer.appendChild(noteDiv);
}

// Update localStorage after adding/removing a note
function updateLocalStorage() {
    const notes = Array.from(notesContainer.querySelectorAll(".note p")).map(note => note.textContent);
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Add a new note when the Create Note button is clicked
addNoteBtn.addEventListener("click", () => {
    const noteContent = noteInput.value.trim();
    if (noteContent !== "") {
        addNoteToDOM(noteContent);
        updateLocalStorage();
        noteInput.value = ""; // Clear input field
    }
});

// Clear all notes
clearAllBtn.addEventListener("click", () => {
    notesContainer.innerHTML = "";
    localStorage.removeItem("notes");
});

// Load existing notes when the page is loaded
document.addEventListener("DOMContentLoaded", loadNotes);
