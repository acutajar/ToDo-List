
import { masterTaskList, addTaskToMaster } from './taskManager.js';
import { projectList, addNewProject } from "./projectManager";
import { closeTaskForm, closeNewProject, populateProjectSidebar, populateTasks, navigateToPage, newTaskOrEditTask } from "./guiManager";
import format from 'date-fns/format';

let currentPage = "All Tasks"

function setCurrentPage(pageID) {
    currentPage = pageID;
}

function submitTaskForm(event, newTaskOrEditTask) {
    // check if the same task name / project combo exists already
    let myProjectPage = ""
    if (currentPage == "All Tasks" || currentPage == "Today" || currentPage == "7 Days") {
        myProjectPage = "undefined";
    } else {
        myProjectPage = currentPage;
    }
    if (newTaskOrEditTask == "newTask") {
        if (masterTaskList.some(taskObject => (taskObject.taskID == event.target.elements[0].value + myProjectPage))) {
            alert('unable to reuse task names within the same project scope, please choose a different task name');
            event.target.elements[0].value = ""
            event.preventDefault();
            return;
        } else {
            let taskArr = [];
            for (let i = 0; i <= 3; i++) {
                taskArr.push(event.target.elements[i].value)
            }
            if (taskArr[1] !== "") {
                taskArr[1] = format(new Date(taskArr[1] + "T00:00"), "MM/dd/yyyy");
            }
            taskArr.push(myProjectPage);
            addTaskToMaster(taskArr);
        }
    } else {
        const editedIndex = masterTaskList.findIndex(element => (element.taskID == newTaskOrEditTask.id))
        const taskObjectMap = ['name', 'dueDate', 'priority', 'description'];
        for (let i = 0; i <= 3; i++) {
            masterTaskList[editedIndex][taskObjectMap[i]] = event.target.elements[i].value;
        }
        if (masterTaskList[editedIndex].dueDate != "") {
            masterTaskList[editedIndex].dueDate = format(new Date(masterTaskList[editedIndex].dueDate + "T00:00"), "MM/dd/yyyy");
        }
        masterTaskList[editedIndex].taskID = masterTaskList[editedIndex].name + masterTaskList[editedIndex].project;
    }
    closeTaskForm();
    populateTasks(currentPage);
    event.preventDefault();
}


const taskForm = document.getElementById('taskForm');
taskForm.addEventListener('submit', function () { submitTaskForm(event, newTaskOrEditTask) });


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
