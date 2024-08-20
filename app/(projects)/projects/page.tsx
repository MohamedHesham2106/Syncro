import { ProjectModal } from "./project-modal";
import { ProjectsList } from "./project-list";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col p-5 gap-4">
      <section className="w-full flex items-center justify-center lg:justify-end">
        <ProjectModal />
      </section>
      <ProjectsList />
    </div>
  );
}
