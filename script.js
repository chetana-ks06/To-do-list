const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList =  document.getElementById("taskList"); 
const allButton = document.getElementById("allButton");
const pendingButton = document.getElementById("pendingButton");
const completedButton = document.getElementById("completedButton");
const counter = document.getElementById("counter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";



function showTasks(filter) {
    currentFilter = filter;
       taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {

        if (filter === "all") {
            displayTask(tasks[i], i);
        }

        if (filter === "pending" && !tasks[i].completed) {
            displayTask(tasks[i], i);
        }

        if (filter === "completed" && tasks[i].completed) {
            displayTask(tasks[i], i);
        }
    }
}


allButton.addEventListener("click", function() {
    showTasks("all");
});

pendingButton.addEventListener("click", function() {
    showTasks("pending");
});

completedButton.addEventListener("click", function() {
    showTasks("completed");
});

function updateCounter() {
    let completed = 0;

    for (let task of tasks) {
        if (task.completed) {
            completed++;
        }
    }

    let pending = tasks.length - completed;

    counter.textContent =
        `Total: ${tasks.length} | Completed: ${completed} | Pending: ${pending}`;
}


function displayTask(task, index){

  const listItem = document.createElement("li");

  const taskText = document.createElement("span");
  taskText.textContent = task.text;
if (task.completed) {
    listItem.classList.add("completed");
}

  listItem.appendChild(taskText);

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

 deleteButton.addEventListener("click", function(event){
    event.stopPropagation();

 tasks.splice(index, 1);

localStorage.setItem("tasks", JSON.stringify(tasks));

updateCounter();

showTasks(currentFilter);
});

   listItem.addEventListener("click", function(){
    task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateCounter();

    listItem.classList.toggle("completed");

    showTasks(currentFilter);
});

  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  editButton.addEventListener("click", function(event){
      event.stopPropagation();



     let updatedTask = prompt("Edit your task ", task.text);

     if(updatedTask !== null && updatedTask.trim() !== ""){
    task.text = updatedTask.trim();

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskText.textContent = task.text;
}
  });

  taskList.appendChild(listItem);

}
showTasks("all");
updateCounter();



addButton.addEventListener("click", function() {

    let task = taskInput.value.trim(); // gets the  value from the input and stores it in task

    if(task !== ""){
     tasks.push({
    text: task,
    completed: false
});

      localStorage.setItem("tasks",JSON.stringify(tasks));

    showTasks(currentFilter);
      updateCounter();
         taskInput.value=""; // sets the input value to empty so it clears the input box

    }

    

    
});



taskInput.addEventListener("keydown",function(event) {
  if(event.key === "Enter"){
    addButton.click();
  }

});

