import "./style.css";
import {
  masterTaskList,
  loadTasksFromStorage,
  saveTasks,
} from "./modules/taskManager.js";
import {
  projectList,
  loadProjectsFromStorage,
  saveProjects,
} from "./modules/projectManager.js";
import { populateProjectSidebar, populateTasks } from "./modules/guiManager.js";

// // setting up some default tasks and projects if user's local storage is empty //
const preLoadedTasks = [
  [
    "Test Task",
    "07/16/2021",
    "1",
    "test description",
    "undefined",
    false,
    "Test Taskundefined",
  ],
  [
    "do cool stuff",
    "07/29/2021",
    "0",
    "",
    "test project",
    false,
    "do cool stufftest project",
  ],
  [
    "do more cool stuff",
    "09/23/2021",
    "2",
    "really informative description",
    "random project #2",
    false,
    "do more cool stuffrandom project #2",
  ],
];
const preLoadedProjects = ["test project", "random project #2"];

if (localStorage.getItem("savedTasks") == null) {
  localStorage.setItem("savedTasks", JSON.stringify(preLoadedTasks));
}
if (localStorage.getItem("savedProjects") == null) {
  localStorage.setItem("savedProjects", JSON.stringify(preLoadedProjects));
}

// actual page code begins here
(function pageLoad() {
  loadProjectsFromStorage();
  populateProjectSidebar(projectList);
  loadTasksFromStorage();
  populateTasks("All Tasks");
  console.log("projects loaded", projectList);
  console.log("tasks loaded:", masterTaskList);
})();

function pageClose() {
  localStorage.clear();
  saveTasks();
  saveProjects();
  console.log("projects saved", projectList);
  console.log("tasks saved", masterTaskList);
  return null;
}

window.onbeforeunload = pageClose;
