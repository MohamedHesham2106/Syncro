"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";

import { SidebarItem } from "@/components/sidebar-item";
import { Separator } from "./ui/separator";
import { useParams } from "next/navigation";
type TProps = {
  className?: string;
};
export const Sidebar: FC<TProps> = ({ className }) => {
  const { projectId } = useParams();

  return (
    <div
      className={cn(
        "h-full lg:w-fit lg:fixed left-0 top-0 px-4 border-r flex-col mt-16 items-center pt-10 z-50 bg-white",
        className
      )}
    >
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="Home" icon="home" href="/projects" />
        {projectId && (
          <>
            <Separator className="my-2 bg-slate-300" />

            <SidebarItem
              label="Projects"
              icon="grid"
              href={`/projects/${projectId}`}
            />
          </>
        )}
      </div>
    </div>
  );
};
