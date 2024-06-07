document.addEventListener('DOMContentLoaded', (event) => {
    const noteInput = document.getElementById('descri');
    const addNoteButton = document.getElementById('btn');
    const notesList = document.getElementById('listofNote');

    // Load notes from local storage on page load
    displayNotes();

    addNoteButton.addEventListener('click', () => {
        const text = noteInput.value.trim();
        if (text) {
            const note = {
                text: text,
                date: new Date().toLocaleString()
            };
            saveNoteToLocalStorage(note);
            noteInput.value = '';
            displayNotes();
        }
    });

    function saveNoteToLocalStorage(note) {
        let notes = localStorage.getItem('notes');
        if (!notes) {
            notes = [];
        } else {
            notes = JSON.parse(notes);
        }
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function displayNotes() {
        notesList.innerHTML = '';
        let notes = localStorage.getItem('notes');
        if (notes) {
            notes = JSON.parse(notes);
            notes.forEach((note, index) => {
                const noteDiv = document.createElement('div');
                noteDiv.className = 'note';
                noteDiv.innerHTML = `
                    <p>${note.text}</p>
                    <small>${note.date}</small>
                    <button class="deleteButton" data-index="${index}">Delete</button>
                `;
                notesList.appendChild(noteDiv);
            });

            // Add delete functionality
            document.querySelectorAll('.deleteButton').forEach(button => {
                button.addEventListener('click', () => {
                    deleteNote(button.getAttribute('data-index'));
                });
            });
        }
    }

    function deleteNote(index) {
        let notes = localStorage.getItem('notes');
        if (notes) {
            notes = JSON.parse(notes);
            notes.splice(index, 1);
            localStorage.setItem('notes', JSON.stringify(notes));
            displayNotes();
        }
    }
});
