import { differenceInDays, isToday, startOfToday } from 'date-fns';

/*
    Loads tasks from local storage,
    creates task objects, 
    updates the master task list,
    saves tasks to local storage
*/


let masterTaskList = [];


const taskFactory = (name, dueDate = "", priority = "N/a", description = "", project = "undefined", complete = false) => {
    const taskID = name + project;
    return { name, dueDate, priority, description, project, complete, taskID }
};

const addTaskToMaster = (taskArr) => {
    let myTask = taskFactory(...taskArr);
    masterTaskList.push(myTask);
}

const loadTasksFromStorage = () => {
    masterTaskList = [];
    if (localStorage.getItem("savedTasks") != null) {
        JSON.parse(localStorage.getItem("savedTasks")).forEach(element => {
            addTaskToMaster(element);
        });
    }
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
    localStorage.setItem("savedTasks", JSON.stringify(convertTaskAttributesToArray()));
}

const deleteSingleTask = (event) => {
    const deletedIndex = masterTaskList.findIndex(element => (element.taskID == event.path[2].id))
    masterTaskList.splice(deletedIndex, 1)
}

const deleteProjectTasks = (projectName) => {
    masterTaskList = masterTaskList.filter(task => (task.project != projectName));
}

const checkTaskComplete = (event) => {
    const checkedIndex = masterTaskList.findIndex(element => (element.taskID == event.path[2].id));
    if (masterTaskList[checkedIndex].complete == true) {
        masterTaskList[checkedIndex].complete = false;
    } else {
        masterTaskList[checkedIndex].complete = true;
    }
}

const filterTasksByProject = (projectName) => {
    let filteredList = []
    if (projectName == "All Tasks") {
        filteredList = masterTaskList.slice(0);
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
        sortedTasks = taskArray.sort((a, b) => {
            if (a.dueDate == "") {
                return 1;
            } else if (new Date(a.dueDate) > new Date(b.dueDate)) {
                return 1;
            } else {
                return -1;
            }
        });
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
    sortTasks, checkTaskComplete
};

export { masterTaskList };