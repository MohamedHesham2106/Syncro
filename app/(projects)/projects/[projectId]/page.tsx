import { getProject } from "@/services/project.service";
import { ProjectOptionButton } from "./project-option-button";
import { ProjectTabs } from "./project-tabs";

type TProps = {
  params: {
    projectId: string;
  };
};
export default async function ProjectPage({
  params: { projectId },
}: Readonly<TProps>) {
  const project = await getProject(projectId);
  return (
    <section className="p-5 flex flex-col space-y-2">
      <div className="flex items-center gap-x-2">
        <h1 className="text-2xl font-bold">Project: {project.name}</h1>
        <ProjectOptionButton projectId={projectId} />
      </div>
      <ProjectTabs project={project} />
    </section>
  );
}
