import { useState } from "react";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    projectSelectedId: undefined,
    projects: [],
    tasks: [],
  });

  function handleStartAddingProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        projectSelectedId: null,
      };
    });
  }

  function handleAddProject(project) {
    const newProject = {
      ...project,
      id: Math.random(),
    };

    setProjectsState((prevState) => {
      return {
        ...prevState,
        projectSelectedId: null,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleCancelProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        projectSelectedId: undefined,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        projectSelectedId: id,
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        projectSelectedId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.projectSelectedId
        ),
      };
    });
  }

  function handleAddTask(title) {
    const newTask = {
      title,
      id: Math.random(),
    };

    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: [
          { ...newTask, projectId: prevState.projectSelectedId },
          ...prevState.tasks,
        ],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  const project = projectsState.projects.find(
    (project) => project.id === projectsState.projectSelectedId
  );

  let content = (
    <SelectedProject
      project={project}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      tasks={projectsState.tasks}
      onDeleteTask={handleDeleteTask}
    />
  );
  if (projectsState.projectSelectedId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelProject} />
    );
  } else if (projectsState.projectSelectedId === undefined) {
    content = (
      <NoProjectSelected onStartAddingProject={handleStartAddingProject} />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        selectedProjectId={projectsState.projectSelectedId}
        onSelectedProject={handleSelectProject}
        onStartAddingProject={handleStartAddingProject}
        projects={projectsState.projects}
      />
      {content}
    </main>
  );
}

export default App;
