// events.js
let tasks = [];

function renderTasks(tasks) {
    // get the list element from the DOM
    const todoList = document.getElementById("todoList"); // Identifies the element "todoList" (which is a <ul> element unordered list) and calls it 'todoList'
    todoList.innerHTML = ""; // the inner HTML (are below indented, otherwise known as containing) the 'todoList' element, is now equal to empty
    // loop through the tasks array. transform (map) each task object into the appropriate HTML to represent a to-do.
    tasks.forEach(task => { // performs a 'foreach' loop (like C#) on the tasks list (using a nifty arrow funtion to shorten it)
        const li = document.createElement("li");
        if (task.completed) {
            li.classList.add("Strike");
        }

        const p = document.createElement("p"); // Creates a paragraph element
        p.textContent = task.detail; // The detail contained within the task variable will be inserted into the paragraph element as 'textContent'

        const div = document.createElement("div"); // adds a <div> element container that will hold the "action" icons

        const deleteSpan = document.createElement("span"); // Makes the <span> element (tag?)
        deleteSpan.textContent = "❎"; // The "text" content inside it will be called ❎
        deleteSpan.dataset.action = "delete"; // Pulls up the info in deleteSpan and performs the action "delete" on it

        const completeSpan = document.createElement("span"); // Makes the <span> element (tag?) again
        completeSpan.textContent = "✅"; // calls it ✅ this time
        completeSpan.dataset.action = "complete"; // Pulls up the info in deleteSpan and performs the action "complete" on it

        div.appendChild(deleteSpan); // Performs an appendChild function (containing deletespan) to the div element
        div.appendChild(completeSpan); // Performs an appendChild function (containing completespan) to the div element

        li.appendChild(p); // Performs an appendChild function (holding the paragraph element) to the line item element
        li.appendChild(div); // Performs an appendChild function (holding the <div> element) to the line item element

        todoList.appendChild(li);
    });
}

function newTask() {
    const taskElement = document.getElementById("todo");    // get the value entered into the #todo input
    const taskValue = taskElement.value;  // holds the content entered by the user as a Constant (that can be used later)
    const newTask = { detail: taskValue, completed: false }; // The instance-object (which contains 2 properties: a detail called 'task, and a 'completed' check, set to false) is turned into a variable, called 'newTask' 
    tasks.push(newTask);    // Takes the 'tasks' list and runs the method (function) 'push' alongside 'newTask' (the instance-object-variable) to be run as a parameter for it
    renderTasks(tasks);    // Kind of equivalent to 'Console.ReadLine()' from C#, but it pertains only to the upcoming list (maybe below 'ul' class="todos"?)
}

function removeTask(taskElement) {
    // Note the use of Array.filter to remove the element from our task array
    // Notice also how we are using taskElement instead of document as our starting point?
    // This will restrict our search to the element instead of searching the whole document.
    tasks = tasks.filter(
        (task) => task.detail != taskElement.querySelector('p').innerText
    );

    // this line removes the HTML element from the DOM
    taskElement.remove();
}

function completeTask(taskElement) {
    // In this case we need to find the index of the task so we can modify it.
    const taskIndex = tasks.findIndex(
        (task) => task.detail === taskElement.childNodes[0].innerText
    );
    // once we have the index we can modify the complete field.
    // tasks[taskIndex].completed ? false : true is a ternary expression.
    // If the first part is true (left of the ?), then the value on the left of the : will get returned, otherwise the value on the right of the : will be returned.
    tasks[taskIndex].completed = tasks[taskIndex].completed ? false : true;
    // toggle adds a class if it is not there, removes it if it is.
    taskElement.classList.toggle("strike");
    console.log(tasks);
}

function manageTasks(event) { // Making the function called 'manageTasks' and passing 'event' in as a prameter
    // did they click the delete or complete icon?
    console.log(event.target); // console.log() being used to see what actually set off the event
    const parent = event.target.closest("li"); // Declare a constant called 'parent'. It'll look for the closest line item element of the clicked element within the event
    if (event.target.dataset.action === "delete") { // within the data set of the targeted event, if that is absolutely, case-sensitively equals to "delete"
        removeTask(parent); // Then run the 'removeTask' function on the parent constant (baleeted! Del Taco'd?)
    }
    if (event.target.dataset.action === "complete") { // within the data set of the targeted event, if that is absolutely, case-sensitively equals to "complete"
        completeTask(parent); // Then run the 'completeTask' function on the parent constant
    }

}

// Add your event listeners here
document.getElementById("submitTask").addEventListener("click", newTask) // When the type 'click' is heard by the button with the id 'submitTask' within the document, we want the listener method 'newTask' to be performed
document.getElementById("todoList").addEventListener("click", manageTasks); // When the type 'click' is heard by the button with the id 'todoList' within the document, we want the listener method 'manageTasks' to be performed

// We need to attach listeners to the submit button and the list. Listen for a click, call the 'newTask' function on submit and call the 'manageTasks' function if either of the icons are clicked in the list of tasks.