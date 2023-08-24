const removeTask = e => {
    //function to remove task from todo list
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.classList.add('complete');
        setTimeout(function () {
            e.target.parentElement.remove();
        }, 1000);
        let tasks = localStorage.getItem("todos");
        tasks = JSON.parse(tasks);
        tasks = tasks.filter((task) => {
            return !(task.data.trim() === e.target.parentElement.textContent.trim());
        });
        //creating an array of local storage filtering that array based on the task you choose to delete then overwriting local storage
        localStorage.setItem(`todos`, JSON.stringify(tasks));
    }
}
const favouriteTask = e => {
    if (e.target.classList.contains("star")) {
        e.target.parentElement.classList.add('added');
        setTimeout(function () {
            e.target.parentElement.classList.remove('added');
        }, 1000);
        favourites.push({ data: e.target.parentElement.textContent.trim() });
        //adding todo to an array of objects 
        localStorage.setItem(`favourites`, JSON.stringify(favourites));
        //turning array of objects into json
    }

}
removeAll = () => {
    list.textContent = "";
    localStorage.clear();
}
addToList = (text) => {
    //function to add new todo to the list 
    html = `<li class="list-group-item d-flex  align-items-center">
    <span>${text}</span>
        <i class="bi bi-star yellow-color star"></i>
    <i class="far fa-trash-alt delete"></i>
</li>`
    todos.push({ data: text });
    //adding todo to an array of objects 
    list.innerHTML += html;
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

addFavourites = () => {

    if (localStorage.getItem("favourites")) {
        //checks if favourites key exists
        let stored = localStorage.getItem("favourites");
        stored = JSON.parse(stored);
        if (Array.isArray(stored)) {
            //checks if array is not empty
            stored.forEach(task => {
                addToList(task.data);
            });
        }
    }

}
if (localStorage.getItem("todos")) {
    //checks if todos key exists
    let stored = localStorage.getItem("todos");
    stored = JSON.parse(stored);
    if (Array.isArray(stored)) {
        //checks if array is not empty
        stored.forEach(task => {
            addToList(task.data);
        });
    }
}
