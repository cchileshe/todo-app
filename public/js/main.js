let taskList = [];

class Task {
    id= new Date().getTime();
    title = '';
    category = 0;
    dueDate = '';
    doDate = '';
    description = '';
    state = 1;
}
 
//Task Categories
let categoryList = [
    {
      
      "id": "1",
      "name": "Wellbeing",
      "color": "blue"
    },
    {
        "id": "2",
        "name": "School",
        "color": "yellow"
    },
    {
        "id": "3",
        "name": "Errands",
        "color": "green"
      },
      {
        "id": "4",
        "name": "Self-Development",
        "color": "purple"
      },
      {
        "id": "5",
        "name": "Work",
        "color": "red"
      }
  ]

function addTask() {
   
    const task = new Task();
    task.title = document.getElementById('title').value;
    task.category = document.getElementById('category').value;
    task.dueDate = document.getElementById('dueDate').value;
    task.doDate = document.getElementById('doDate').value;
    task.description = document.getElementById('description').value;
    updateTaskList(task);


    console.log(task);

}


function updateTaskList(task){
    if (localStorage.getItem('taskList')) {
        getTasksFromStorage();
    }
    taskList.push(task);
    localStorage.setItem('taskList', JSON.stringify(taskList));

console.log(taskList);
}

function getTasksFromStorage() {
    taskList = JSON.parse(localStorage.getItem('taskList'));
}

function viewTasks(){
    const taskView = document.getElementById('taskView');
    getTasksFromStorage();
    categoryList.forEach(category =>{
        let singleTask = document.createElement('div');
        singleTask.className = category.color;

        let header = document.createElement('h2');
        
        let hr =  document.createElement('hr');
        hr.className = 'hr';
        
        let ulElment = document.createElement('ul');
        let items = taskList.filter(task => task.category == category.id);
        if(items.length < 1) {
            return;
        }

        items.forEach(item => {
            let liElement = document.createElement('li');
            liElement.className = 'checkbox';


            let title = document.createElement('span');
            title.innerHTML = item.title;

            //side navigation edit and delete
            let taskActions = document.createElement('select');
            taskActions.id = "task";

            let option = document.createElement("option");
            option.value = 'edit';
            option.text = 'edit';
            taskActions.appendChild(option);
            option = document.createElement("option");
            option.value = 'delete';
            option.text = 'delete';
            taskActions.appendChild(option);

            //create check box
            taskActions.appendChild(option);
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = category.color+'-checkmark';
            
    
            liElement.appendChild(checkbox);
            liElement.appendChild(title)
            liElement.appendChild(taskActions);
            ulElment.appendChild(liElement);
        });

        header.innerHTML = category.name;
        singleTask.appendChild(header);
        singleTask.appendChild(hr);
        singleTask.appendChild(ulElment);
        taskView.appendChild(singleTask);
    });
}