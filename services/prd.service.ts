import { db } from "@/database";
import { getSelf } from "./auth.service";
import { SectionType } from "@prisma/client";

const getNextPrdVersion = async (sectionId: string): Promise<number> => {
  const lastPrdHistory = await db.pRDHistory.findFirst({
    where: { sectionId },
    orderBy: { version: "desc" },
    select: { version: true },
  });

  return lastPrdHistory ? lastPrdHistory.version + 1 : 1;
};

export const addPRD = async (projectId: string, prd: string) => {
  // Check if the user is authenticated
  const self = await getSelf();
  if (!self) throw new Error("Unauthorized");

  // Validate inputs
  if (!projectId || !prd) throw new Error("Invalid input data");

  // Check if the user is the owner of the project and find the relevant section
  const project = await db.project.findUnique({
    where: { id: projectId },
    select: {
      ownerId: true,
      sections: {
        where: { type: SectionType.PRD, deleted: false },
        select: { id: true, currentPRD: true },
      },
    },
  });

  if (!project) throw new Error("Project not found");
  if (project.ownerId !== self.id)
    throw new Error("User is not the owner of the project");

  // Retrieve the current PRD section
  const prdSection = await db.section.findFirst({
    where: { projectId, type: SectionType.PRD, deleted: false },
    select: { id: true, currentPRD: true },
  });

  if (!prdSection) throw new Error("PRD section not found");
  if (prdSection.currentPRD === prd)
    throw new Error("PRD content is the same as the current PRD");

  const { id } = prdSection;

  // Add the current PRD to the history before updating
  await db.pRDHistory.create({
    data: {
      content: prd,
      sectionId: id,
      version: await getNextPrdVersion(id),
    },
  });

  // Update the section with the new PRD content
  await db.section.update({
    where: { id: id },
    data: { currentPRD: prd },
  });
};

export const getPRDs = async (projectId: string) => {
  const self = await getSelf();
  if (!self) throw new Error("Unauthorized");

  // Validate input
  if (!projectId) {
    throw new Error("Invalid project ID");
  }

  // Fetch the PRD section for the specified project
  const prdSection = await db.section.findFirst({
    where: {
      projectId,
      type: SectionType.PRD,
      deleted: false,
    },
    select: { id: true },
  });

  // If no PRD section is found, throw an error
  if (!prdSection) {
    throw new Error("PRD section not found for the specified project.");
  }

  // Fetch all PRD history entries for the found PRD section, ordered by version in descending order
  const allPRDs = await db.pRDHistory.findMany({
    where: { sectionId: prdSection.id },
    orderBy: { version: "desc" },
    select: {
      id: true,
      content: true,
      version: true,
      createdAt: true,
    },
  });

  return allPRDs;
};
