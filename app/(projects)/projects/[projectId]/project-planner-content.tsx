"use client";
import { Section } from "@prisma/client";
import React from "react";
type TProps = {
  sections: Section[];
};
export const ProjectPlannerContent = ({ sections }: TProps) => {
  return <div>{sections[0].name}</div>;
};
