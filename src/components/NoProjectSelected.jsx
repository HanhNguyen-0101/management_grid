import Button from "./Button";
import noProject from "./../assets/no-projects.png";

export default function NoProjectSelected({onStartAddingProject}) {
  return (
    <div className="mt-24 text-center w-2/3">
      <img
        className="w-16 h-16 object-contain mx-auto"
        src={noProject}
        alt="An empty task list"
      />
      <h2 className="text-xl font-bold text-stone-700 my-4">
        No project selected
      </h2>
      <p className="mb-4 text-stone-400">
        Select a project or get started with a new one
      </p>
      <p className="mt-8">
        <Button onClick={onStartAddingProject}>Create new project</Button>
      </p>
    </div>
  );
}
