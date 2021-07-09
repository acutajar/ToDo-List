import './style.css';
import { masterTaskList, loadTasksFromStorage, saveTasks, deleteSingleTask } from './modules/taskManager.js';
import { submitTaskForm } from './modules/controller.js';
import './modules/guiManager.js';
import { format } from 'date-fns';

// adding in test tasks from localstorage //
let storagetest = [['task1name', '1995-05-20', "0", "my good Description", "undefined", false], ['task2name', '2021-01-30', "3", "my good Description", "projectnName", true], ['task2name', '2021-01-30', "3", "my good Description", "b", true], ['task2name', '2021-01-30', "3", "my good Description", "a", true]]
localStorage.setItem("savedTasks", JSON.stringify(storagetest));
//////////////

loadTasksFromStorage()
console.log("tasks loaded:", masterTaskList);

saveTasks();




