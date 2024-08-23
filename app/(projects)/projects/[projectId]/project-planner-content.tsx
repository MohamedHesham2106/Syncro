"use client";
import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import qs from "query-string";
import { SectionList } from "./section-list";
import { WorkflowCustomizeModal } from "./workflow-customize-modal";

type TProps = {
  sections: Section[];
};
const order = [
  "PRD",
  "UI_DESIGN",
  "Technical_Design",
  "Development",
  "QA",
  "Release",
];

export const ProjectPlannerContent = ({ sections }: TProps) => {
  // Sort sections based on the defined order
  const sortedSections = useMemo(() => {
    return [...sections].sort(
      (a, b) => order.indexOf(a.type) - order.indexOf(b.type)
    );
  }, [sections]);
  const filteredSections = useMemo(() => {
    return sections.filter((section) => !section.deleted);
  }, [sections]);

  const searchParams = useSearchParams();

  const subTab = searchParams.get("subTab") ?? "workflow";
  const onSubTabChange = (value: string) => {
    const paramsObject = Object.fromEntries(searchParams.entries());
    const newParams = qs.stringify({ ...paramsObject, subTab: value });
    window.history.pushState({}, "", `?${newParams}`);
  };

  return (
    <Tabs defaultValue={subTab}>
      <div className="border-b">
        <TabsList className="grid grid-cols-2 p-0 h-fit sm:w-1/2 md:w-[250px] bg-white">
          <TabsTrigger
            onClick={() => onSubTabChange("workflow")}
            value="workflow"
            className="data-[state=active]:border-b-4 data-[state=active]:border-primary"
          >
            Project Workflow
          </TabsTrigger>
          <TabsTrigger
            onClick={() => onSubTabChange("info")}
            value="info"
            className="data-[state=active]:border-b-4 data-[state=active]:border-primary "
          >
            Project Info
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent
        value="workflow"
        className="flex flex-col space-y-5 bg-white py-4"
      >
        <WorkflowCustomizeModal sections={sortedSections} />
        <SectionList sections={filteredSections} />
      </TabsContent>
    </Tabs>
  );
};
