
import { masterTaskList, addTaskToMaster, deleteSingleTask, filterTasksByProject, sortTasks } from './taskManager.js';
import { projectList, addNewProject, loadProjectsFromStorage, deleteProject } from "./projectManager";
import { closeTaskForm, closeNewProject, populateProjectSidebar, populateTasks, navigateToPage } from "./guiManager";

let currentPage = "All Tasks"

function setCurrentPage(pageID) {
    currentPage = pageID;
}

function submitTaskForm(event) {
    //check if the same task name/project combo exists already
    // if (masterTaskList.some(taskObject => (taskObject.name == event.target.elements[0].value && taskObject.project == currentPage))) {
    //     alert('unable to reuse task names within the same project scope, please choose a different task name');
    //     event.target.elements[0].value = ""
    // } else {
    let taskArr = [];
    for (let i = 0; i <= 3; i++) {
        taskArr.push(event.target.elements[i].value)
    }
    if (currentPage == "All Tasks" || currentPage == "Today" || currentPage == "7 Days") {
        taskArr.push("undefined");
    }
    addTaskToMaster(taskArr);
    closeTaskForm();
    populateTasks(currentPage);
    // }
    event.preventDefault();
}

const taskForm = document.getElementById('taskForm');
taskForm.addEventListener('submit', submitTaskForm);


function submitNewProject(event) {
    const projectName = document.getElementById('newProjectName').value.trim();
    if (projectList.includes(projectName)) {
        alert('Project already exists. Please choose a different project name');
        document.getElementById('projectForm').reset();
    } else if (projectName == "undefined") {
        alert('The project name you\'ve chosen is invalid. Please choose a different project name');
        document.getElementById('projectForm').reset();
    } else {
        addNewProject(projectName);
        populateProjectSidebar(projectList);
        currentPage = projectName;
        navigateToPage(currentPage);
        closeNewProject();
    }
    event.preventDefault();
}

const projectForm = document.getElementById('projectForm');
projectForm.addEventListener('submit', submitNewProject);

const ddlSort = document.getElementById('ddlSort');
ddlSort.addEventListener('change', function () { populateTasks(currentPage) })





export { currentPage, setCurrentPage }
