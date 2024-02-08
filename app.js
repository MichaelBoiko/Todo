const inputElement = document.getElementById('title');
const createBtn = document.getElementById('create');
const successBtn = document.getElementById('successNote');
const deleteBtn = document.getElementById('deleteNote');
const listElement = document.getElementById('list');
let notes = [
    {
        title: 'First note',
        completed: false,
    },
    {
        title: 'Second note',
        completed: false,
    },
    {
        title: 'Third note',
        completed: true,
    }
];

createBtn.onclick = function(){
    listElement.innerHTML = '';
    if(inputElement.value.length === 0){
        return;
    } 
    const newNote = {
        title: inputElement.value,
        comleted: false,
    }
    notes.push(newNote);
    render();
    inputElement.value = '';
}

function render(){
    if(notes.length == 0) {
        listElement.innerHTML = "<p class='text-center'>Заметок нет</p>"
    }
    for(let i = 0; i < notes.length; i++){
        listElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i));
    }
}

render();

listElement.onclick = function(event){
    if(event){
        listElement.innerHTML = '';
        const index = event.target.dataset.index;
        const type = event.target.dataset.type;
        if(type == "toggle"){
            notes[index].completed = !notes[index].completed;
        } else if(type == "remove"){
            notes.splice(index, 1);
        }
    }
    render();
}

function getNoteTemplate(note, index){
    return `
    <li class="list-group-item d-flex justify-content-between">
        <span class="${note.completed ? 'text-decoration-line-through' : ''}">${note.title}</span>
        <span class="btn-sm">
            <span class="btn btn-${note.completed ? 'warning' : 'success'}" id="successeNote" data-index=${index} data-type="toggle">
                &#10003;
            </span>
            <span class="btn btn-danger" id="deleteNote" data-index=${index} data-type="remove">
                &#10006;
            </span>
        </span>
    </li>
    `;
}