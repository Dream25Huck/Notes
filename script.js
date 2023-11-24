let input = document.getElementById("input");

document.addEventListener('DOMContentLoaded', function() {
  loadNotes();
});

function addNote() {
  if (input.value === "") {
    alert("You must write something!");
  } else {
    createNote(input.value);
    input.value = ""; 
  }
}

function createNote(text) {
  let noteDiv = document.createElement('div');
  noteDiv.className = 'divNotes';

  let noteText = document.createElement('span');
  noteText.textContent = text;
  noteDiv.appendChild(noteText);

  addEditButton(noteDiv, noteText);
  addDeleteButton(noteDiv);

  document.getElementById("notes").appendChild(noteDiv);
  updateLocalStorage();
}

function addEditButton(noteDiv, noteText) {
  let editBtn = document.createElement('img');
  editBtn.src = 'pencil.png';
  editBtn.className = 'editBtn';
  editBtn.onclick = function() {
    let newText = prompt("Change the Note!", noteText.textContent);
    if (newText !== null && newText !== "") {
      noteText.textContent = newText;
      updateLocalStorage();
    }
  };
  noteDiv.appendChild(editBtn);
}

function addDeleteButton(noteDiv) {
  let deleteBtn = document.createElement('img');
  deleteBtn.src = 'remove.png'; 
  deleteBtn.className = 'deleteBtn';
  deleteBtn.onclick = function() {
    this.parentElement.remove();
    updateLocalStorage();
  };
  noteDiv.appendChild(deleteBtn);
}

function updateLocalStorage() {
  let notes = document.querySelectorAll('.divNotes span');
  let allNotes = Array.from(notes).map(span => span.textContent);
  localStorage.setItem('notes', JSON.stringify(allNotes));
}

function loadNotes() {
  let storedNotes = JSON.parse(localStorage.getItem('notes'));
  if (storedNotes) {
    storedNotes.forEach(function(note) {
      createNote(note);
    });
  }
}
