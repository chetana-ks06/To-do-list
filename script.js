const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList =  document.getElementById("taskList"); 



addButton.addEventListener("click", function() {

    const task = taskInput.value.trim(); // gets the  value from the input and stores it in task

    if(task !== ""){
    const listItem = document.createElement("li");
    listItem.textContent = task;

    const editButton = document.createElement("button");
    editButton.textContent="Edit";

    

    const deleteButton = document.createElement("button");
     deleteButton.textContent = "Delete"; 


      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);

      deleteButton.addEventListener("click", function() {
        listItem.remove();

      });

      listItem.addEventListener("click",function(){
        listItem.classList.toggle("completed");

      });
    taskList.appendChild(listItem); 
    taskInput.value=""; // sets the input value to empty so it clears the input box
    
    }

    

    
});

taskInput.addEventListener("keydown",function(event) {
  if(event.key === "Enter"){
    addButton.click();
  }

});

