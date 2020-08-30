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

        let noteEl = document.createElement('div');
        let titleEl = document.createElement('h2');
        let bodyEl = document.createElement('p');
        let timeEl = document.createElement('h3');
        timeEl.innerHTML = data[i].time;
        titleEl.innerHTML = data[i].title;
        bodyEl.innerHTML = data[i].body;
        noteEl.appendChild(titleEl);
        noteEl.appendChild(timeEl);
        noteEl.appendChild(bodyEl);

        //make a new div at the bottom of noteEl class='buttons' that lets the edit and delete (and save, when editing) buttons be flex-wrap: wrap, and spaced nicely.

        let editBtn = document.createElement('button');
        editBtn.classList.add('editBtn');
        editBtn.id = 'editBtn' + data[i].id;
        editBtn.innerText = 'Edit';
        noteEl.appendChild(editBtn);

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
    let noteTime = moment().calendar();

    fetch('http://localhost:3000/notes/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "title": newNoteTitle, "body": newNoteBody, 'time': noteTime })
    })

    let noteEl = document.createElement('div');
    let titleEl = document.createElement('h2');
    let bodyEl = document.createElement('p');
    let timeEl = document.createElement('h3');
    timeEl.innerHTML = noteTime;
    timeEl.id = 'timeEl';
    titleEl.innerHTML = document.querySelector('#newNoteTitle').value;
    bodyEl.innerHTML = document.querySelector('#newNoteBody').value;
    noteEl.appendChild(titleEl);
    noteEl.appendChild(timeEl);
    noteEl.appendChild(bodyEl);

    noteEl.classList.add('note');
    notesAnchor.appendChild(noteEl);

})


