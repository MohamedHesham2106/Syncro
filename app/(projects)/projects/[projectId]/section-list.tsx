"use client";
import { SectionCard } from "./section-card";

type TProps = {
  sections: Section[];
};
const url = [
  "prd?tab=continue-editing",
  "ui-design",
  "technical-design",
  "development",
  "qa",
  "release",
];

export const SectionList = ({ sections }: TProps) => {
  return (
    <div className="md:max-w-5xl grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
      {sections.map((section,i) => (
        <SectionCard key={section.id} section={section} href={url[i]} />
      ))}
    </div>
  );
};
