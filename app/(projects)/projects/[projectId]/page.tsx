// import { getProject } from "@/services/project.service";
"use client";
import { trpc } from "@/app/_trpc/client";
import { ProjectOptionButton } from "./project-option-button";
import { ProjectTabs } from "./project-tabs";
import Lottie from "lottie-react";
import LoadingSections from "@/public/load-sections.json";

type TProps = {
  params: {
    projectId: string;
  };
};
export default function ProjectPage({
  params: { projectId },
}: Readonly<TProps>) {
  const { data: project, isLoading } = trpc.getProject.useQuery(
    { projectId },
    {
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading) {
    return (
      <section className="w-full flex flex-col items-center justify-center min-h-[80dvh]">
        <Lottie
          animationData={LoadingSections}
          loop
          className="w-[450px] h-[250px]"
        />
        <h1 className="text-3xl font-bold mt-4 animate-pulse">
          Please wait while we load your project
        </h1>
      </section>
    );
  }

  return (
    <section className="p-5 flex flex-col space-y-2">
      <div className="flex items-center gap-x-2">
        <h1 className="text-2xl font-bold">Project: {project?.name}</h1>
        <ProjectOptionButton projectId={projectId} />
      </div>
      {project && <ProjectTabs project={project} />}
    </section>
  );
}
