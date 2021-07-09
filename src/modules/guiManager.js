import { masterTaskList, addTaskToMaster, deleteSingleTask, filterTasksByProject, sortTasks } from './taskManager.js';
import { projectList, addNewProject, loadProjectsFromStorage, deleteProject } from "./projectManager";
import { currentPage, setCurrentPage } from './controller.js';



////////////////////////////// Task Functions //////////////////////////////

const form = document.getElementById('taskForm')
const btnCloseTask = document.getElementById('btnCloseTask');

function generateTaskCard(task) {
    //create main container and sub containers
    const myCard = document.createElement('div');
    myCard.setAttribute('class', 'taskCard');
    const taskCompleteContainer = document.createElement('div');
    taskCompleteContainer.setAttribute('class', "taskComplete");
    const upperContainer = document.createElement('div');
    upperContainer.setAttribute('class', 'upperCardContainer');
    const lowerContainer = document.createElement('div');
    lowerContainer.setAttribute('class', 'lowerCardContainer');
    const cardButtons = document.createElement('div');
    cardButtons.setAttribute('class', 'cardButtons');
    myCard.appendChild(taskCompleteContainer);
    myCard.appendChild(upperContainer);
    myCard.appendChild(lowerContainer);
    myCard.appendChild(cardButtons);

    //populate each subcontainer with task info
    //task complete checkbox
    const taskComplete = document.createElement('img');
    taskComplete.setAttribute('id', 'taskComplete');
    if (task.complete == true) {
        taskComplete.setAttribute('src', './images/circle_checked.svg');
        myCard.style.opacity = '60%'
        upperContainer.style.textDecoration = "line-through";
        lowerContainer.style.textDecoration = "line-through";
    } else {
        taskComplete.setAttribute('src', './images/circle_unchecked.svg');
    }
    taskCompleteContainer.appendChild(taskComplete);

    //title and project names
    const taskName = document.createElement('div');
    taskName.innerHTML = task.name;
    const taskProject = document.createElement('div');
    taskProject.innerHTML = "Project: " + task.project;
    upperContainer.appendChild(taskName);
    upperContainer.appendChild(taskProject);

    //due date and priority
    const taskDueDate = document.createElement('div');
    taskDueDate.innerHTML = "Due date: " + task.dueDate;
    const taskPriority = document.createElement('div');
    const priorityMap = ["High", "Medium", "Low", "N/a"];
    const priorityColorsMap = ['rgb(209, 43, 2)', 'rgb(255, 165, 0)', 'rgb(30, 136, 27)', 'rgb(48, 71, 94)']
    taskPriority.innerHTML = "Priority: " + priorityMap[parseInt(task.priority)];
    taskPriority.style.color = priorityColorsMap[parseInt(task.priority)];
    lowerContainer.appendChild(taskDueDate);
    lowerContainer.appendChild(taskPriority);

    //buttons
    const btnEdit = Object.assign(document.createElement('button'), { id: 'editTask' });
    btnEdit.setAttribute('class', 'editTask');
    btnEdit.innerHTML = "View/Edit Task";
    const btnDelete = Object.assign(document.createElement('button'), { id: 'deleteTask' });
    btnDelete.setAttribute('class', 'deleteTask');
    btnDelete.innerHTML = "Delete Task";
    cardButtons.appendChild(btnEdit);
    cardButtons.appendChild(btnDelete);

    //Add the card to the main task display
    const taskDisplay = document.getElementById('taskDisplay')
    taskDisplay.appendChild(myCard);
}

function closeTaskForm() {
    form.reset();
    document.getElementById('popup').style.display = 'none';
    document.getElementById('content').style.opacity = '100%';
}

function populateTasks(pageName) {
    let sortSelection = document.getElementById('ddlSort').value;
    const taskContainer = document.getElementById('taskDisplay');
    taskContainer.innerHTML = ""
    let displayedTasks = sortTasks(filterTasksByProject(pageName), sortSelection);
    displayedTasks.forEach(task => generateTaskCard(task));
}


btnCloseTask.addEventListener('click', closeTaskForm);
document.addEventListener('click', function (event) {
    const myPopup = document.getElementById('popup');
    if (myPopup.style.display != "flex" && event.target.closest("#addTask")) {
        document.getElementById('popup').style.display = 'flex';
        document.getElementById('content').style.opacity = '60%';
        document.getElementById("content").style.pointerEvents = "none"
    } else if (!event.target.closest('.form-popup')) {
        closeTaskForm();
        document.getElementById("content").style.pointerEvents = "all"
    }
    // Opens & closes the task form with any click outside the form... there's likely a better way to do this but I dont know what it is.
});



///////////////////////////// Project Functions ///////////////////////

const projectForm = document.getElementById('projectForm');
const btnCloseNewProject = document.getElementById('closeNewProject');
const btnNewProject = document.getElementById('addProjectButton');


function closeNewProject() {
    projectForm.reset();
    projectForm.style.display = 'none';
    btnNewProject.style.display = 'flex';
}

function showNewProjectForm() {
    btnNewProject.style.display = 'none';
    projectForm.style.display = 'flex';
    document.getElementById('newProjectName').select();
}

function populateProjectSidebar(projectList) {
    clearSideBar();
    const projectNavBar = document.getElementById('lowerNavBar');
    projectList.forEach(project => {
        const aProject = document.createElement('div');
        aProject.setAttribute('id', project);
        aProject.setAttribute('class', 'navItem');
        aProject.textContent = project;
        projectNavBar.appendChild(aProject);
        aProject.addEventListener('click', function () { navigateToPage(aProject.id) })
    })
}


function clearSideBar() {
    const myNode = document.getElementById('lowerNavBar');
    const savedItem = myNode.children[0];
    myNode.innerHTML = ""
    myNode.appendChild(savedItem);
}


btnCloseNewProject.addEventListener('click', closeNewProject);
btnNewProject.addEventListener('click', showNewProjectForm);


function navigateToPage(pageID) {
    setCurrentPage(pageID)
    document.getElementById('title').innerHTML = currentPage;
    ddlSort.value = "default";
    populateTasks(currentPage);

}

const projectNavItems = document.querySelectorAll('.navItem');
projectNavItems.forEach(project => {
    if (project.id == 'addProjectButton') {
    } else {
        project.addEventListener('click', function () { navigateToPage(project.id) })
    }
});

export {
    closeTaskForm, closeNewProject, populateProjectSidebar,
    populateTasks, navigateToPage
}