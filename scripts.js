let newNote = document.querySelector('#newNote');
const notesAnchor = document.querySelector('#allNotesAnchor')
const saveBtn = document.querySelector('#saveNoteBtn');

window.addEventListener('load', function () {
    fetch('http://localhost:3000/notes/')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            displayNotes(data)
        })
})


function displayNotes(data) {
    for (let i = 0; i < data.length; i++) {
        let newNote = document.createElement('div');
        let newTitle = document.createElement('h2');
        let newBody = document.createElement('p');
        newTitle.innerHTML = data[i].title;
        newBody.innerHTML = data[i].body;
        newNote.appendChild(newTitle);
        newNote.appendChild(newBody);
        newNote.classList.add('note');
        notesAnchor.appendChild(newNote);
    }
}


saveBtn.addEventListener('click', function () {
    let newNoteTitle = document.querySelector('#newNoteTitle').innerHTML;
    let newNoteBody = document.querySelector('#newNoteBody').innerHTML;

    fetch('http://localhost:3000/notes/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "title": newNoteTitle, "body": newNoteBody })
    })

})