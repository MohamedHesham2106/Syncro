import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { format, differenceInDays } from "date-fns";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type TProps = {
  section: Section;
  href: string;
};

const getDaysLeftText = (daysLeft: number, isFinished: boolean) => {
  if (isFinished) return "Completed";
  if (daysLeft < 0) return `${Math.abs(daysLeft)} days overdue`;
  return `${daysLeft} days left`;
};

export const SectionCard = ({ section, href }: TProps) => {
  const dueDate = new Date(section.dueDate);
  const daysLeft = differenceInDays(dueDate, new Date());
  const badgeText = section.isStarted ? "Started" : "Not Started";
  const badgeVariant = section.isStarted ? "default" : "notStarted";
  const daysLeftText = getDaysLeftText(daysLeft, section.isFinished);
  const daysLeftTextColor =
    daysLeft < 0 && !section.isFinished ? "text-red-500" : "text-green-500";

  return (
    <Link
      href={`/projects/${section.projectId}/${href}`}
      className="flex flex-col border-2 border-slate-200 rounded-xl p-5 border-b-4 border-b-slate-300 hover:shadow-md transition-all w-full space-y-4 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <h1 className="font-extrabold tracking-wide text-xl capitalize">
          {section.name}
        </h1>
        <Badge className="text-sm" variant={badgeVariant}>
          {badgeText}
        </Badge>
      </div>

      <Separator className="my-4 h-[1.5px]" />

      <div className="flex flex-col space-y-2">
        <h3 className="text-sm font-bold text-slate-400">Due Date</h3>
        <div className="flex items-center gap-x-2 pl-2">
          <time className="text-sm font-semibold">
            {format(dueDate, "MM/dd/yyyy")}
          </time>
          <Calendar className="w-4 h-4 text-slate-400" />
        </div>

        <div className="flex items-center gap-x-2">
          <h3 className="text-sm font-bold text-slate-400">Days Left:</h3>
          <span className={`text-sm font-semibold ${daysLeftTextColor}`}>
            {daysLeftText}
          </span>
        </div>
      </div>
    </Link>
  );
};
