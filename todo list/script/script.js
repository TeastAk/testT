const inp = document.querySelector('#input');
const form = document.querySelector('#form');
const addTasks = document.querySelector('.active-tasks__content');
const notTask = document.querySelector('.active-tasks__notTask');
const completed = document.querySelector('.completed__tasks');

let tasks = [];

if (localStorage.getItem('tasks')) {
   tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(e => {

    const add = `<div id=${e.id} data-action='add' data-actio='del' class="active-tasks__task">
        <button data-action="circle" class="active-tasks__click"></button>
        <div class="active-tasks__text">${e.text}</div>
    </div>`;

    addTasks.insertAdjacentHTML('beforeend', add);

    
    if(addTasks.children.length > 1) {
        notTask.classList.add('none');
    }
});

form.addEventListener('submit', addTask);
addTasks.addEventListener('click', addCompleted);
completed.addEventListener('click', del);

function addTask(e) {
    e.preventDefault()

    if(!inp.value || inp.value.trim() < 1) return;

    const newTask = {
        id: Date.now(),
        text: inp.value,
        done: false, 
    }

   tasks.push(newTask)

    saveLocal()

    const add = `<div id=${newTask.id} data-action='add' data-actio='del' class="active-tasks__task">
        <button data-action="circle" class="active-tasks__click"></button>
        <div class="active-tasks__text">${newTask.text}</div>
    </div>`;

    addTasks.insertAdjacentHTML('beforeend', add);

    inp.value = '';

    inp.focus();

    if(addTasks.children.length > 1) {
        notTask.classList.add('none');
    }


}

function addCompleted(el) {
    if (el.target.dataset.action !== 'add') return;

    const parentNode = el.target.closest('.active-tasks__task');

    
    completed.appendChild(parentNode);

    saveLocal()

    
    if(addTasks.children.length === 1) {
        notTask.classList.remove('none');
    }
}

function del(el) {
    if (el.target.dataset.action !== 'add') return;

    const parentDel = el.target.closest('.active-tasks__task');

    const id = parentDel.id;

    const delMass = tasks.findIndex(taskId => taskId.id === id)

    tasks.splice(delMass, 1)

    saveLocal()

    parentDel.remove()
}

console.log(tasks)

// сохраним 

function saveLocal() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
