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
        bodyEl.classList.add('noteBody');
        noteEl.appendChild(titleEl);
        noteEl.appendChild(timeEl);
        noteEl.appendChild(bodyEl);
        noteEl.classList.add(data[i].color)

        let buttonsBar = document.createElement('div');
        buttonsBar.classList.add('buttonsBar');

        let editBtn = document.createElement('button');
        editBtn.classList.add('editBtn');
        editBtn.id = 'editBtn' + data[i].id;
        editBtn.innerText = 'Edit';
        buttonsBar.appendChild(editBtn);

        editBtn.addEventListener('click', function () {
            let noteTime = moment().calendar();

            fetch('http://localhost:3000/notes/' + data[i].id, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "title": window.prompt('Previous Title: ', data[i].title), "body": window.prompt('Previous note: ', data[i].body), 'time': noteTime, 'color': data[i].color
                })
            })
        })

        editBtn.setAttribute('onClick', 'window.location.reload()')

        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.id = 'deleteBtn' + data[i].id;
        deleteBtn.innerText = 'Delete';
        buttonsBar.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', function () {
            fetch('http://localhost:3000/notes/' + data[i].id, {
                method: 'DELETE'

            })
        })

        deleteBtn.addEventListener('click', function () {
            window.location.reload()
        })


        noteEl.appendChild(buttonsBar);
        noteEl.classList.add('note');
        notesAnchor.appendChild(noteEl);
    }
}



saveBtn.addEventListener('click', function () {

    let newNoteTitle = document.querySelector('#newNoteTitle').value;
    let newNoteBody = document.querySelector('#newNoteBody').value;
    let noteTime = moment().calendar();
    let noteColor = document.querySelector('#noteColor').value;

    fetch('http://localhost:3000/notes/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "title": newNoteTitle, "body": newNoteBody, 'time': noteTime, "color": noteColor })
    })
        .then(res => res.json())
        .then(function (data) {
            console.log(data);
            window.location.reload()

        })
})

let newNoteTitle = document.querySelector('#newNoteTitle');

newNoteTitle.addEventListener('focus', function () {
    let newNoteBody = document.querySelector('#newNoteBody');
    newNoteBody.style.display = 'unset'
})

let colorSelect = document.querySelector('#noteColor')
colorSelect.addEventListener('input', function () {
    this.className = '';
    colorSelect.classList.add('noteColor' + colorSelect.value)
})