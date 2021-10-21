// ========================
//      MODELS
//=========================

let taskList = [];

class Task{
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

// ========================
//    CONTROLLERS
//=========================

//   add task
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

//delete task
function deleteTask(event) {
    let target = event.target;
    let id = target.id.split('-')[1];
    let index = taskList.findIndex(item => item.id == id);
    taskList.splice(index, 1);
    target.closest('ul').closest('li').remove();
    updateStorage()
    if(taskList.length < 1) {
        window.location.href = 'views/add-task.html';
    }
}

function editTask() {
    console.log('edit task');
}

// update task
function updateTaskList(task){
    if (localStorage.getItem('taskList')) {
        getTasksFromStorage();
    }
    taskList.push(task);
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

function updateStorage(){
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

function redirectToAddTask(){
    
}

function getTasksFromStorage() {
    taskList = JSON.parse(localStorage.getItem('taskList'));
    console.log(taskList);
}



let visible = false;
// sub nav controller
function showMenu(e) {
    let el = document.querySelector('.more');
    let btn = el.querySelector('.more-btn');
    let menu = el.querySelector('.more-menu');
    
    //e.preventDefault();
    if (!visible) {
        visible = true;
        el.classList.add('show-more-menu');
        menu.setAttribute('aria-hidden', false);
        // document.addEventListener('mousedown', hideMenu, false);
    }
}

function hideMenu() {
    let el = document.querySelector('.more');
    let btn = el.querySelector('.more-btn');
    let menu = el.querySelector('.more-menu');
    if (visible) {
        visible = false;
        el.classList.remove('show-more-menu');
        menu.setAttribute('aria-hidden', true);
        document.removeEventListener('mousedown', hideMenu);
    }
}



// ========================
//      VIEWS
//=========================
function viewTasks(){
    const taskView = document.getElementById('taskView');

    getTasksFromStorage();
    categoryList.forEach(category =>{
        let singleTask = document.createElement('div');
        singleTask.classList.add(category.color, 'categoryList');

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
            //create check box
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = category.color+'-checkmark';


            let title = document.createElement('span');
            title.innerHTML = item.title;

            //sub navigation edit and delete
            let taskActions = document.createElement('div');
            taskActions.className='more';
            taskActions.addEventListener('click', showMenu, false)

            let moreBtn = document.createElement("button");
                moreBtn.id = 'more-btn';
                moreBtn.className = 'more-btn';
            taskActions.appendChild(moreBtn);

            let moreBtnImg = document.createElement("img");
            moreBtnImg.id = 'moreimg';
            moreBtnImg.className = 'moreimg';
            moreBtnImg.src ='/public/assets/menu.png';
                moreBtn.appendChild(moreBtnImg);

            

            let moreMenu = document.createElement('div');
                moreMenu.className = 'more-menu';

             taskActions.appendChild(moreMenu);

            let moreMenuCaret = document.createElement('div');
            moreMenuCaret.className = 'more-menu-caret';
            moreMenu.appendChild(moreMenuCaret);

            let moreMenuCaretOuter = document.createElement('div');
            moreMenuCaretOuter.className = 'more-menu-caret-outer';
            moreMenuCaret.appendChild(moreMenuCaretOuter);

            let moreMenuCaretInner = document.createElement('div');
            moreMenuCaretInner.className = 'more-menu-caret-inner';
            moreMenuCaret.appendChild(moreMenuCaretInner);

            let moreMenuItems = document.createElement('ul');
            moreMenuItems.className = 'more-menu-items';
            moreMenuItems.tabindex = '-1';
            moreMenuItems.ariaHidden = 'true';
            moreMenuItems.ariaLabelledby = 'more-btn';
            moreMenuItems.role = 'more-menu-items';
            moreMenu.appendChild(moreMenuItems);

            let moreMenuItem = document.createElement('li');
            moreMenuItem.className = 'more-menu-item';
            moreMenuItem.role = 'presentation';
            moreMenuItem.value = 'edit';
            moreMenuItems.appendChild(moreMenuItem);

            let moreMenuBtn = document.createElement('button');
            moreMenuBtn.className = 'more-menu-btn';
            moreMenuBtn.id='edit-' + item.id;
            moreMenuBtn.innerText = 'Edit';
            moreMenuBtn.role = 'menuitem';
            moreMenuBtn.type = 'button';
            moreMenuBtn.value = 'edit';
            moreMenuBtn.addEventListener('click', editTask, false);
            moreMenuItem.appendChild(moreMenuBtn);

            moreMenuBtn = document.createElement('button');
            moreMenuBtn.className = 'more-menu-btn';
            moreMenuBtn.id='delete-' + item.id;
            moreMenuBtn.innerText='Delete';
            moreMenuBtn.role = 'menuitem';
            moreMenuBtn.type = 'button';
            moreMenuBtn.value = 'delete';
            moreMenuBtn.addEventListener('click', deleteTask, false);
            moreMenuItem.appendChild(moreMenuBtn);

                    

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



