"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { useSearchParams } from "next/navigation";
import { ProjectPlannerContent } from "./project-planner-content";

type TProps = {
  project: Project;
};

export const ProjectTabs = ({ project }: TProps) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "planner";

  const onTabChange = (value: string) => {
    // Create a URL object from the current URL
    const url = new URL(window.location.href);

    // Create a URLSearchParams object from the URL's search parameters
    const searchParams = new URLSearchParams(url.search);

    // Remove the `subTab` parameter
    searchParams.delete("subTab");

    // Update the `tab` parameter
    searchParams.set("tab", value);
    if (value === "planner") searchParams.set("subTab", "workflow");

    // Update the URL object with the new search parameters
    url.search = searchParams.toString();

    // Update the browser's URL without reloading the page
    window.history.pushState({}, "", url.toString());
  };

  return (
    <Tabs defaultValue={tab}>
      <div className="flex items-end">
        <TabsList className="grid grid-cols-2 p-0 h-fit sm:w-1/2 md:w-[250px] rounded-t-md">
          <TabsTrigger
            onClick={() => onTabChange("planner")}
            value="planner"
            className={cn(
              tab === "builder" && "border-b border-slate-200",
              "data-[state=active]:shadow-none rounded-t-md data-[state=active]:border-x data-[state=active]:border-t "
            )}
          >
            Planner
          </TabsTrigger>
          <TabsTrigger
            onClick={() => onTabChange("builder")}
            value="builder"
            className={cn(
              tab === "planner" && "border-b border-slate-200",
              "data-[state=active]:shadow-none rounded-t-md data-[state=active]:border-x data-[state=active]:border-t "
            )}
          >
            Builder
          </TabsTrigger>
        </TabsList>
        <Separator className="h-[1px] bg-slate-200 w-full" />
      </div>

      <TabsContent value="planner" className="py-4 bg-white">
        <ProjectPlannerContent sections={project.sections ?? []} />
      </TabsContent>
      <TabsContent value="builder" className="py-4 bg-white">
        Builder content
      </TabsContent>
    </Tabs>
  );
};
