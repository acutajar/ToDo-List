import { deleteProjectTasks } from "./taskManager";
let projectList = [];

const addNewProject = (projectName) => {
  if (projectName != "undefined") {
    projectList.push(projectName);
  }
};

const loadProjectsFromStorage = () => {
  projectList = [];
  if (localStorage.getItem("savedProjects") != null) {
    JSON.parse(localStorage.getItem("savedProjects")).forEach((project) => {
      addNewProject(project);
    });
  }
};

const saveProjects = () => {
  localStorage.setItem("savedProjects", JSON.stringify(projectList));
};

const deleteProject = (deletedProject) => {
  const projectIndex = projectList.indexOf(deletedProject);
  projectList.splice(projectIndex, 1);
  deleteProjectTasks(deletedProject);
};

export { addNewProject, loadProjectsFromStorage, deleteProject, saveProjects };

export { projectList };
