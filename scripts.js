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
        let noteTime = document.createElement('p');
        noteTime = new moment();
        let noteEl = document.createElement('div');
        let titleEl = document.createElement('h2');
        let bodyEl = document.createElement('p');
        titleEl.innerHTML = data[i].title;
        bodyEl.innerHTML = data[i].body;
        noteEl.appendChild(titleEl);
        noteEl.appendChild(bodyEl);

        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.id = 'deleteBtn' + data[i].id;
        deleteBtn.innerText = 'Delete';
        noteEl.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', function () {
            fetch('http://localhost:3000/notes/' + data[i].id, {
                method: 'DELETE'
            })
        })

        noteEl.classList.add('note');
        notesAnchor.appendChild(noteEl);
    }
}


saveBtn.addEventListener('click', function () {

    // event.preventDefault()

    let newNoteTitle = document.querySelector('#newNoteTitle').value;
    let newNoteBody = document.querySelector('#newNoteBody').value;

    fetch('http://localhost:3000/notes/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "title": newNoteTitle, "body": newNoteBody })
    })

    let noteEl = document.createElement('div');
    let titleEl = document.createElement('h2');
    let bodyEl = document.createElement('p');
    titleEl.innerHTML = document.querySelector('#newNoteTitle').value;
    bodyEl.innerHTML = document.querySelector('#newNoteBody').value;
    noteEl.appendChild(titleEl);
    noteEl.appendChild(bodyEl);

    noteEl.classList.add('note');
    notesAnchor.appendChild(noteEl);

})


