const btnEl = document.getElementById("btn");
const appEl = document.getElementById("App");

initNotes();

function initNotes() {
    const notes = getNotes();
    notes.forEach(note => {
        const noteEl = createNoteElement(note.id, note.content);
        appEl.insertBefore(noteEl, btnEl);
    });
}

function createNoteElement(id, content) {
    const element = document.createElement("textarea");
    element.className = "note";
    element.placeholder = "Empty Note";
    element.value = content;

    element.addEventListener("dblclick", () => {
        if (confirm("Delete this note?")) {
            deleteNote(id, element);
        }
    });

    element.addEventListener("input", () => {
        updateNote(id, element.value);
    });

    return element;
}

function showPopupMessage(message) {
    const popup = document.getElementById('popupMessage');
    popup.textContent = message;
    popup.style.display = 'block';
    
    // Reset animation
    popup.style.animation = 'none';
    popup.offsetHeight; // Trigger reflow
    popup.style.animation = 'popupFade 3s ease-in-out forwards';
    
    // Hide after animation
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}

function deleteNote(id, element) {
    try {
        const currentNotes = getNotes();
        const updatedNotes = currentNotes.filter(note => note.id !== id);
        saveNotes(updatedNotes);
        appEl.removeChild(element);
    } catch (error) {
        console.error("Error deleting note:", error);
    }
}

function updateNote(id, newContent) {
    try {
        const notes = getNotes();
        const noteToUpdate = notes.find(note => note.id === id);
        if (noteToUpdate) {
            noteToUpdate.content = newContent;
            saveNotes(notes);
        }
    } catch (error) {
        console.error("Error updating note:", error);
    }
}

function addNote() {
    try {
        const newNote = {
            id: Date.now(),
            content: ""
        };
        const noteElement = createNoteElement(newNote.id, newNote.content);
        appEl.insertBefore(noteElement, btnEl);
        const currentNotes = getNotes();
        currentNotes.push(newNote);
        saveNotes(currentNotes);
    } catch (error) {
        console.error("Error adding note:", error);
    }
}

function getNotes() {
    try {
        const notes = localStorage.getItem("note-app");
        return notes ? JSON.parse(notes) : [];
    } catch (error) {
        console.error("Error reading notes:", error);
        return [];
    }
}

function saveNotes(notes) {
    try {
        localStorage.setItem("note-app", JSON.stringify(notes));
    } catch (error) {
        console.error("Error saving notes:", error);
    }
}

btnEl.addEventListener("click", () => {
    try {
        addNote();
    } catch (error) {
        console.error("Error in click handler:", error);
    }
});

console.log("Script loaded. Current notes:", getNotes());