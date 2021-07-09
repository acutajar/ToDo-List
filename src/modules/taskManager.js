import { differenceInDays, format, isToday, startOfToday } from 'date-fns';
import { currentPage } from './controller';

/*
    Loads tasks from local storage,
    creates task objects, 
    updates the master task list,
    saves tasks to local storage
*/

// adding in test tasks from localstorage //
let masterTaskList = [];
let storagetest = [['task1name', '12/12/1222', , 'low', 'task1project', false], ['task2name', '12/12/1233', , 'medium', 'task2project', true], ['task3name', "N/a", "this is my long description", "12/12/333", 'high', false]]
localStorage.setItem("savedTasks", JSON.stringify(storagetest));
//////////////

const taskFactory = (name, dueDate = "", priority, description = "", project = "undefined", complete = false) => {
    return { name, dueDate, description, priority, project, complete }
};

const addTaskToMaster = (taskArr) => {
    if (taskArr[1].length > 0) {
        taskArr[1] = format(new Date(taskArr[1] + "T00:00"), "MM/dd/yyyy");
    } else {
        taskArr[1] = "N/a"
    }
    let myTask = taskFactory(...taskArr);
    masterTaskList.push(myTask);
}

const loadTasksFromStorage = () => {
    masterTaskList = [];
    JSON.parse(localStorage.getItem("savedTasks")).forEach(element => {
        addTaskToMaster(element)
    });
}

const convertTaskAttributesToArray = () => {
    let convertedTasks = []
    masterTaskList.forEach(obj => {
        let attributeArray = Object.values(obj);
        convertedTasks.push(attributeArray);
    });
    return convertedTasks;
}

const saveTasks = () => {
    localStorage.clear();
    localStorage.setItem("savedTasks", JSON.stringify(convertTaskAttributesToArray()));
}

const deleteSingleTask = (deletedTask) => {
    const deletedIndex = masterTaskList.findIndex(element => (element.name == deletedTask.name && element.project == deleteTask.project))
    masterTaskList.splice(deletedIndex, 1)
}

const deleteProjectTasks = (projectName) => {
    let i = 0
    masterTaskList.forEach(task => {
        if (task.project == projectName) {
            masterTaskList.splice(i, 1);
        }
        i++;
    });
}

const filterTasksByProject = (projectName) => {
    let filteredList = []
    console.log('current page set to: ' + currentPage)
    console.log("project name set to: " + projectName);
    if (projectName == "All Tasks") {
        filteredList = masterTaskList;
    } else if (projectName == "Today") {
        filteredList = masterTaskList.filter(task => isToday(new Date(task.dueDate)));
    } else if (projectName == "7 Days") {
        filteredList = masterTaskList.filter(task => {
            let numDays = differenceInDays(new Date(task.dueDate), startOfToday());
            return (numDays >= 0 && numDays <= 7);
        });
    } else {
        filteredList = masterTaskList.filter(task => (task.project == projectName));
    }
    return filteredList;
}



const sortTasks = (taskArray, selection) => {
    let sortedTasks = []
    if (selection == "default") {
        sortedTasks = taskArray;
    } else if (selection == "priority") {
        sortedTasks = taskArray.sort((a, b) => parseInt(a.priority) > parseInt(b.priority) ? 1 : -1)
    } else if (selection == "dueDate") {
        sortedTasks = taskArray.sort((a, b) => new Date(a.dueDate) > new Date(b.dueDate) ? 1 : -1);
    } else if (selection == "project") {
        sortedTasks = taskArray.sort((a, b) => {
            if (a.project == "undefined") {
                return 1;
            } else if (a.project > b.project) {
                return 1;
            } else {
                return -1;
            }
        });
    }
    return sortedTasks;
}



export {
    addTaskToMaster, loadTasksFromStorage, saveTasks,
    deleteSingleTask, deleteProjectTasks, filterTasksByProject,
    sortTasks
};

export { masterTaskList };