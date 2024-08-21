"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Project, Section } from "@prisma/client";
import { Separator } from "@radix-ui/react-separator";
import { useSearchParams } from "next/navigation";
import qs from "query-string";
import { ProjectPlannerContent } from "./project-planner-content";

type TProps = {
  project: Project & { sections: Section[] };
};

export const ProjectTabs = ({ project }: TProps) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "planner";
  // const subTab = searchParams.get("subTab") || "workflow";

  const onTabChange = (value: string) => {
    const paramsObject = Object.fromEntries(searchParams.entries());
    const newParams = qs.stringify({ ...paramsObject, tab: value });
    window.history.pushState({}, "", `?${newParams}`);
  };

  //   const onSubTabChange = (value: string) => {
  //     const paramsObject = Object.fromEntries(searchParams.entries());
  //     const newParams = qs.stringify({ ...paramsObject, subTab: value });
  //     window.history.pushState({}, "", `?${newParams}`);
  //   };

  return (
    <Tabs defaultValue={tab}>
      <div className={"flex items-end"}>
        <TabsList className="grid grid-cols-2 p-0 h-fit sm:w-1/2 md:w-[250px] rounded-t-md">
          <TabsTrigger
            onClick={() => onTabChange("planner")}
            value="planner"
            className={cn(
              tab === "builder" && "border-b border-slate-200",
              "data-[state=active]:shadow-none rounded-t-md data-[state=active]:border-x data-[state=active]:border-t"
            )}
          >
            Planner
          </TabsTrigger>
          <TabsTrigger
            onClick={() => onTabChange("builder")}
            value="builder"
            className={cn(
              tab === "planner" && "border-b border-slate-200",
              "data-[state=active]:shadow-none rounded-t-md data-[state=active]:border-x data-[state=active]:border-t"
            )}
          >
            Builder
          </TabsTrigger>
        </TabsList>
        <Separator className="h-[1px] bg-slate-200 w-full" />
      </div>

      <TabsContent value="planner" className="p-4 bg-white">
        <ProjectPlannerContent sections={project.sections} />
      </TabsContent>
      <TabsContent value="builder" className="p-4  bg-white">
        Builder content
      </TabsContent>
    </Tabs>
  );
};
