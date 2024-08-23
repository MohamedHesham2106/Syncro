import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { format, isPast } from "date-fns"; // Import isPast to check the date
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"; // Import a Badge component or create one

type TProps = {
  project: Omit<
    Project & {
      isOwner: boolean;
    },
    "sections"
  >;
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const isProjectOverdue = (targetDate: Date) => {
  return isPast(targetDate);
};

export const ProjectCard = ({ project }: TProps) => {
  const truncatedDescription = truncateText(project.description, 200);
  const overdue = isProjectOverdue(new Date(project.targetDate));

  return (
    <Link
      href={{
        pathname: `/projects/${project.id}`,
        query: { tab: "planner" },
      }}
      className="flex flex-col border-2 border-slate-200 rounded-xl p-5 border-b-4 border-b-slate-300 hover:shadow-md transition-all w-full space-y-4"
    >
      <div className="flex items-center justify-between">
        <h1 className="font-extrabold tracking-wide text-xl capitalize">
          {project.name}
        </h1>
        {overdue ? (
          <Badge variant="destructive">Overdue</Badge>
        ) : (
          <Badge variant="default">On Track</Badge>
        )}
      </div>

      <Separator className="my-4 h-[1.5px]" />
      <div className="flex flex-col space-y-2">
        <h3 className="text-sm font-bold text-slate-400">Owner</h3>
        <div className="flex items-center gap-x-2 pl-2">
          <Image
            src={project.owner.imageUrl}
            alt={project.owner.name}
            width={30}
            height={30}
            className="rounded-lg"
          />
          <p className="text-sm font-semibold">{project.owner.name}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className="text-sm font-bold text-slate-400">Due Date</h3>
        <div className="flex items-center gap-x-2 pl-2">
          <time className="text-sm font-semibold">
            {format(new Date(project.targetDate), "MM/dd/yyyy")}
          </time>
          <Calendar className="w-4 h-4 text-slate-400" />
        </div>
      </div>
      <Separator className="my-4 h-[1.5px]" />
      <div className="flex flex-col space-y-2">
        <h3 className="text-sm font-bold text-slate-400">Description</h3>
        <p className="text-sm font-semibold pl-2">
          {truncatedDescription || "No description provided"}
        </p>
      </div>
    </Link>
  );
};

export const ProjectCardSkeleton = () => {
  return (
    <Skeleton className="w-full h-[350px]" style={{ borderRadius: "0.5rem" }} />
  );
};
