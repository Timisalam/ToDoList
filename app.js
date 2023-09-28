const addForm = document.querySelector('.add');
const list = document.querySelector('ul');
const search = document.querySelector('.search');
const toDos = document.querySelectorAll('LI');
const button = document.querySelector(".fav");
const clear = document.querySelector(".clear");
const popup = document.getElementById("popup");
const closePopupButton = document.getElementById("closePopup");
const done = document.querySelector('.done');


let todos = [];
let storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
//check if local storage exists if it does not make it an empty array   
let favourites = storedFavourites;


isDuplicate = (value, key) => {
    let added = false;
    if (localStorage.getItem(key)) {
        let stored = localStorage.getItem(key);
        stored = JSON.parse(stored);
        if (Array.isArray(stored)) {
            for (let i = 0; i < stored.length; i++) {
                console.log(stored[i]);
                if (stored[i].data.trim() === value) {
                    added = true;
                }
            }
        }
    }
    return added;
}


search.addEventListener('keyup', e => {
    SearchToDo();
})

search.addEventListener('input', e => {
    SearchToDo();
});



addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    if (!isDuplicate(todo, "todos")) {
        if (todo.length) {
            addToList(todo.toLowerCase());
        }
    }
    else {

    }

    addForm.reset();
})
    

button.addEventListener("click", e => {
    addFavourites();
})

list.addEventListener('click', e => {
    if (e.target.classList.contains("delete")) {
        removeTask(e);
    }
    if (e.target.classList.contains("star")) {
        if (!isDuplicate(e.target.parentElement.textContent.trim(), "favourites")) {
            favouriteTask(e);
        }
        else {
            unfavourite(e);
        }
    }
    if (e.target.classList.contains("pencil")) {
        edit(e.target.parentElement);

    }
})

clear.addEventListener("click", e => {
    removeAll();
})

popup.addEventListener("click", e => {
    if (e.target === popup) {
        popup.style.display = "none";
        list.style.display = "flex";

    }
    //if user clicks away from pop up remove pop up
});

closePopupButton.addEventListener("click", () => {
    popup.style.display = "none";
    list.style.display = "flex";
});


