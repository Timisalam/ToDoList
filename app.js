const addForm = document.querySelector('.add');
const list = document.querySelector('ul');
const trash = document.querySelector('.far')
const search = document.querySelector('.search');
const toDos = document.querySelectorAll('LI');
let todos = [];

const removeTask = e => {
    //function to remove task from todo list
    if (e.target.tagName === 'I') {
        e.target.parentElement.remove();
        let tasks = localStorage.getItem("todos");
        tasks = JSON.parse(tasks);
        console.log(e.target.parentElement.textContent);
        tasks = tasks.filter((task) => {
            return !(task.data.trim() === e.target.parentElement.textContent.trim());
        });
        //creating an array of local storage filtering that array based on the task you choose to delete then overwriting local storage
        console.log(tasks)
        localStorage.setItem(`todos`, JSON.stringify(tasks));
    }
}


addToList = (text) => {
    //function to add new todo to the list 
    html = `<li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${text}</span>
    <i class="far fa-trash-alt delete"></i>
</li>`
    todos.push({ data: text });
    //adding todo to an array of objects 
    list.innerHTML += html;
    console.log(todos);
    localStorage.setItem(`todos`, JSON.stringify(todos));
    //turning array of objects into json
}


SearchToDo = () => {
    //function to search through current tasks and hide them if they dont match whats in search bar
    const toDos = document.querySelectorAll('LI');
    let tasks = [];
    let count = 0;
    const searchInput = document.querySelector('.search input');
    tasks = Array.from(toDos);
    const inputValue = searchInput.value.toLowerCase().trim();
    tasks.forEach(element => {
        if (!element.innerHTML.includes(inputValue)) {
            //hiding them if they dont include whats in searchbar
            toDos[count].classList.add('success');
        }
        else {
            toDos[count].classList.remove('success');

        }
        count++;
    })
}


if (localStorage.length) {
    //if local storage is not empty add whats in local storage to html
    let stored = localStorage.getItem("todos");

    stored = JSON.parse(stored);
    stored.forEach(task => {
        addToList(task.data);
    })

}


search.addEventListener('keyup', e => {
    SearchToDo();
})




addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    if (todo.length) {
        addToList(todo);
    }
    
    addForm.reset();
})


list.addEventListener('click', e => {
    removeTask(e);
})
