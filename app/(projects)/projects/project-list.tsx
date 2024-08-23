"use client";
import { useProject } from "@/hooks/use-project";
import { ProjectCard, ProjectCardSkeleton } from "./project-card";
import { ProjectPlaceholder } from "./project-placeholder";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export const ProjectsList = () => {
  const { projects, isLoading, isRefetching } = useProject();
  if (isLoading && !isRefetching)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
        {[...Array(4)].map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    );
  if (isRefetching) {
    return (
      <div className="flex flex-col space-y-2 p-4 bg-indigo-50 border-2 border-indigo-400 rounded-lg">
        <div className="flex items-center gap-x-2 font-bold">
          <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
          Loading
        </div>
        <p className="pl-8 text-sm">Please wait a moment...</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        projects?.length !== 0 &&
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      )}
    >
      {projects && projects.length !== 0 ? (
        projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))
      ) : (
        <ProjectPlaceholder />
      )}
    </div>
  );
};
