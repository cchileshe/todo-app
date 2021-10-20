const taskInput = document.getElementById("new-task"); //new-task element
const addButton = document.getElementsById("add-task"); // add task button
const incompleteTasksHolder = document.getElementById("incomplete-tasks"); // incomplete-tasks
const completedTasksHolder = document.getElementById("completed-tasks"); // completed-tasks


//Task Categories
let categoriesList = [
    {
      
      "id": "wellbeing",
      "name": "Wellbeing",
      "color": "#4fc1e8"
    },
    {
        "id": "school",
        "name": "School",
        "color": "#face53"
    },
    {
        "id": "errands",
        "name": "Errands",
        "color": "#a0d568"
      },
      {
        "id": "self-dev",
        "name": "Self-Development",
        "color": "#ac92eb"
      },
      {
        "id": "work",
        "name": "Work",
        "color": "#ed5564"
      }
  ]

 
// New Task List Item

const createNewTaskElement = function(taskString) {
	// Create list item
	const listItem = document.createElement("li");
	// input (checkbox) 
	const checkBox = document.createElement("input"); // checkbox
	// label
	const label = document.createElement("label"); // label
	// input (text)
	const editInput = document.createElement("input"); //text
	// button.edit
	const editButton = document.createElement("button"); 
	// button.delete
	const deleteButton = document.createElement("button");
			
	// Each of these elements needs modifying
	
	checkBox.type = "checkbox";
	editInput.type = "text";
	
	editButton.innerText = "Edit";
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";
	
	label.innerText = taskString;
	
	
	// Each element needs appending		
	
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}

// Add a new task.

const addTask = function() {
	console.log("Add task...");
		// Create a new list item with the text from #new-task:
	const listItem = createNewTaskElement(taskInput.value);
	
	// Append listItem to incompleteTasksHolder
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);	
}

const editTask = function() {
	console.log("Edit task...");

	const listItem = this.parentNode;
	
	const editInput = listItem.querySelector("input[type=text]");
	const label = listItem.querySelector("label");
	
	const containsClass = listItem.classList.contains("editMode");

	// if the class of the parent list item is .editMode
	if(containsClass) {
				// we want to switch from .editMode
				// label text become the input's value
				label.InnerText = editInput.value;
			} else  {
				// Switch to .editMode
				// input value become the label's text
				
				editInput.value = label.innerText;
				}
		
		listItem.classList.toggle("editMode");
		// toggle Edit Mode on the list item 
		
}

const deleteTask = function() {
	console.log("Delete task...");
	const listItem = this.parentNode;
	const ul = listItem.parentNode;
	
	// Remove the parent list item from our unordered list.
	
	ul.removeChild(listItem);	
}

// Mark a task as complete.
const taskCompleted = function() {
	console.log("Task complete...");
	// Append to the #completed-tasks class 
	const listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
			
}

const taskIncomplete = function() {	
	console.log("Task incomplete...");		
	// Append this to #incomplete-tasks.
	const listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);		
			
}
			
const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	console.log("Bind list item events.");
	
	const checkbox = taskListItem.querySelector("input[type=checkbox]");
	const editButton = taskListItem.querySelector("button.edit");
	const deleteButton = taskListItem.querySelector("button.delete");
	
	// bind editTask to edit button
	editButton.onclick = editTask;
	
	// bind deleteTask to the delete button
	deleteButton.onclick = deleteTask;
	
	checkbox.onchange = checkBoxEventHandler;
		// bind checkBoxEventHandler to checkbox
}
// set the click handler to the addTask function
addButton.onclick = addTask;

// Cycle over incompleteTaksHolder ul list items
	for(const i = 0; i < incompleteTasksHolder.children.length; i++) {
		bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
	
	for(const i = 0; i < completedTasksHolder.children.length; i++) {
		bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

	var listItem=document.createElement("li");

	//input (checkbox)
	var checkBox=document.createElement("input");//checkbx
	//label
	var label=document.createElement("label");//label
	//input (text)
	var editInput=document.createElement("input");//text
	//button.edit
	var editButton=document.createElement("button");//edit button

	//button.delete
	var deleteButton=document.createElement("button");//delete button

	label.innerText=taskString;

	//Each elements, needs appending
	checkBox.type="checkbox";
	editInput.type="text";

	editButton.innerText="Edit";//innerText encodes special characters, HTML does not.
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";



	//and appending.
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}



var addTask=function(){
	console.log("Add Task...");
	//Create a new list item with the text from the #new-task:
	var listItem=createNewTaskElement(taskInput.value);

	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");


var listItem=this.parentNode;

var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
		//If class of the parent is .editmode
		if(containsClass){

		//switch to .editmode
		//label becomes the inputs value.
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}

		//toggle .editmode on the parent.
		listItem.classList.toggle("editMode");
}




//Delete task.
var deleteTask=function(){
		console.log("Delete Task...");

		var listItem=this.parentNode;
		var ul=listItem.parentNode;
		//Remove the parent list item from the ul.
		ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
		console.log("Complete Task...");
	
	//Append the task list item to the #completed-tasks
	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
		console.log("Incomplete Task...");
//Mark task as incomplete.
	//When the checkbox is unchecked
		//Append the task list item to the #incomplete-tasks.
		var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
	console.log("AJAX Request");
}