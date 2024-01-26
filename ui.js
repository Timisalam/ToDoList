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
        updateCompletedTasks()
    }
}
const updateCompletedTasks = e => {
    console.log(count)

    count++;
    html = `Completed tasks today : ${count}`;
    noOfTasks.innerHTML = html;
    localStorage.setItem('count', count);

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
unfavourite = (e) => {
    e.target.parentElement.classList.add('removed');
    setTimeout(function () {
        e.target.parentElement.classList.remove('removed');
    }, 1000);
    let tasks = localStorage.getItem("favourites");
    tasks = JSON.parse(tasks);
    tasks = tasks.filter((task) => {
        return !(task.data.trim() === e.target.parentElement.textContent.trim());
    });
    //creating an array of local storage filtering that array based on the task you choose to delete then overwriting local storage
    localStorage.setItem(`favourites`, JSON.stringify(tasks));
}

removeAll = () => {
    list.textContent = "";
    localStorage.clear();
}
addToList = (text) => {
    //function to add new todo to the list 
    html = `<li class="list-group-item d-flex  align-items-center">
    <span>${text}</span>
    <i class="bi bi-pencil-square pencil"></i>
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


function removeItemsWithKey(key) {
    for (let i = 0; i < localStorage.length; i++) {
        const itemKey = localStorage.key(i);
        if (itemKey.startsWith(key)) {
            localStorage.removeItem(itemKey);
        }
    }
}

const edit = (element) => {
    const oldData = element.textContent.trim(); // Get the old text content

    const html = `
        <form class="edit text-center my-4">
            <input class="form-control m-auto" type="text" name="add" />
        </form>`;

    const listItem = element.closest('li');
    // Find the parent li element

    listItem.innerHTML = html;
    // Replace the content with the form

    const editForm = listItem.querySelector('.edit');

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTodo = editForm.add.value.trim();

        if (newTodo) {
            editForm.remove();
            // Remove the form element

            listItem.innerHTML = `<span>${newTodo}</span>
                <i class="bi bi-pencil-square pencil"></i>
                <i class="bi bi-star yellow-color star"></i>
                <i class="far fa-trash-alt delete"></i>`;
            // Update the content of the parent li element

            let tasks = JSON.parse(localStorage.getItem("todos") || '[]');
            tasks = tasks.map((task) => {
                if (task.data.trim() === oldData) {
                    task.data = newTodo;
                }
                return task;
            });
            localStorage.setItem('todos', JSON.stringify(tasks));
            // Update the data in localStorage
        }
    });
};




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

if (localStorage.getItem("count")) {
    // Get the current date
    var currentDate = new Date();

    // Format the date as YYYY-MM-DD (e.g., 2024-01-26)
    var formattedDate = currentDate.toISOString().slice(0, 10);

    // Check if there is a stored date in local storage
    var storedDate = localStorage.getItem("resetDate");

    // If there is no stored date or the stored date is not the current date, reset the variable
    if (!storedDate || storedDate !== formattedDate) {
        // Reset the variable to 0
        count = 0
        localStorage.setItem('count', count);

        // Store the current date in local storage
        localStorage.setItem("resetDate", formattedDate);
    }

        let stored = localStorage.getItem("count");
        if (stored != 0) {
            html = `Completed tasks today : ${stored}`;
            noOfTasks.innerHTML = html;
            localStorage.setItem('count', stored);
            count = stored
        }

    }



