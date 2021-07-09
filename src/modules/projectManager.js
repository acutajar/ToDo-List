import { deleteProjectTasks } from './taskManager'
let projectList = [];

const addNewProject = (projectName) => {
    projectList.push(projectName);
}

const loadProjectsFromStorage = () => {
    projectList = [];
    JSON.parse(localStorage.getItem("savedProjects")).forEach(project => {
        addNewProject(project);
    });
}

const saveProjects = () => {
    localStorage.setItem("savedProjects", JSON.stringify(projectList));
}

const deleteProject = (deletedProject) => {
    const projectIndex = projectList.indexOf(deletedProject)
    projectList.splice(projectIndex, 1);
    deleteProjectTasks(deletedProject);
}

export {
    addNewProject, loadProjectsFromStorage, deleteProject
};

export { projectList };