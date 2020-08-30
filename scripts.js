window.addEventListener('load', function () {
    fetch('http://localhost:3000/notes/')
        .then(response => response.json())
        .then(data => { console.log(data) })
        .then(data => {
            for () {









                let title = data.notes[i].title;
                let body = data.notes[i].body;
                let newNote = document.createElement('div');
                let newTitle = document.createElement('h2');
                let newBody = document.createElement('p');
                newTitle.innerHTML = title;
                newBody.innerHTML = body;
                newNote.appendChild(newTitle);
                newNote.appendChild(newBody);
                newNote.classList.add('note');
            }
        })
})









// function displayNotes() {
//     for (let note of data) {
//         let title = note.title;
//         let body = note.body;
//         let newNote = document.createElement('div');
//         let newTitle = document.createElement('h2');
//         let newBody = document.createElement('p');
//         newTitle.innerHTML = title;
//         newBody.innerHTML = body;
//         newNote.appendChild(newTitle);
//         newNote.appendChild(newBody);
//         newNote.classList.add('note');
//     }
// }


function postNewNote() {
    // const noteTitle = document.querySelector('#noteTitle');
    // const noteBody = document.querySelector('#noteBody');


    fetch('http://localhost:3000/notes/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "title": noteTitle, "body": noteBody })
    })
        .then(r => r.json())
        .then(
            // whatever you need to do next
        )
}

// const saveNoteBtn = document.querySelector('#saveNoteBtn');

// saveNoteBtn.addEventListener('click', saveNoteBtn())