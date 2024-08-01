const addBox = document.querySelector(".add-box"),
    popupBox = document.querySelector(".popup-box"),
    popupTitle = popupBox.querySelector("header p"),
    closeIcon = popupBox.querySelector("header i"),
    titleTag = popupBox.querySelector("input"),
    descTag = popupBox.querySelector("textarea"),
    addBtn = popupBox.querySelector("button");
    form = document.querySelector('form');

let update = false, updateId;
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
const notesArr = JSON.parse(localStorage.getItem('notes') || '[]');

addBox.addEventListener('click', () => {
    popupTitle.innerHTML = 'Add a New Note';
    addBtn.innerHTML = 'Add Note';
    popupBox.classList.add('show');
    document.body.style = 'overflow:hidden';
    titleTag.focus();
})

closeIcon.addEventListener('click', () => {
    titleTag.value = descTag.value = '';
    popupBox.classList.remove('show');
    document.body.style = 'overflow:auto';
})

const postNotesData = (e) => {
    e.preventDefault();
    title = titleTag.value.trim();
    descrp = descTag.value.trim();
    date = new Date();
    currentYear = date.getFullYear();
    currentDate = date.getDate();
    currentMonth = months[date.getMonth()];
    notesInfo = { title, descrp, date: `${currentYear} ${currentDate}, ${currentMonth}` };
    if (!update) {
        notesArr.push(notesInfo)
    } else {
        update = false;
        notesArr[updateId] = notesInfo;
    }
    localStorage.setItem('notes', JSON.stringify(notesArr))
    showNotes();
    closeIcon.click();
}

function showNotes() {
    if (!notesArr) return;
    document.querySelectorAll('.note').forEach(li => li.remove());
    notesArr.forEach((note, id) => {
        let newNote = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.descrp}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${note.descrp}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;

        addBox.insertAdjacentHTML('afterend', newNote)
    })
}
showNotes();
form.addEventListener('submit', postNotesData);

function showMenu(targetElem) {
    targetElem.parentElement.classList.add('show');
    document.addEventListener('click', ({ target }) => {
        target.tagName !== 'I' && target !== targetElem && targetElem.parentElement.classList.remove('show');
    })
}
function deleteNote(id) {
    let confirmAction = confirm('Are you sure want to delete the notes');
    if (!confirmAction) return;
    notesArr.splice(id, 1);
    localStorage.setItem('notes', JSON.stringify(notesArr))
    showNotes();
}
function updateNote(id, title, descrp) {
    updateId = id;
    update = true;
    addBox.click();
    titleTag.value = title;
    descTag.value = descrp;
    popupTitle.innerHTML = 'Update a New Note';
    addBtn.innerHTML = 'Update Note';
}