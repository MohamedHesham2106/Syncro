import { db } from "@/database";
import { getSelf } from "./auth.service";
import { SectionType } from "@prisma/client";

import { add, differenceInDays } from "date-fns";

export async function addProject({ name, description, targetedDate }: Project) {
  try {
    const self = await getSelf();
    if (!self) throw new Error("Unauthorized");

    // Find the user in the database
    const user = await db.user.findUnique({
      where: { externalId: self.externalId },
    });

    if (!user) throw new Error("User not found");

    // Calculate the total project duration
    const startDate = new Date();
    const totalDays = differenceInDays(new Date(targetedDate), startDate);

    // Distribute time across sections
    const timeline = {
      PRD: Math.ceil(totalDays * 0.1), // 10% of total time
      UI_DESIGN: Math.ceil(totalDays * 0.15), // 15% of total time
      Technical_Design: Math.ceil(totalDays * 0.2), // 20% of total time
      Development: Math.ceil(totalDays * 0.4), // 40% of total time
      QA: Math.ceil(totalDays * 0.1), // 10% of total time
      Release: Math.ceil(totalDays * 0.05), // 5% of total time
    };

    // Adjust section dates cumulatively
    const sectionDates = {
      PRD: add(startDate, { days: timeline.PRD }),
      UI_DESIGN: add(startDate, { days: timeline.PRD + timeline.UI_DESIGN }),
      Technical_Design: add(startDate, {
        days: timeline.PRD + timeline.UI_DESIGN + timeline.Technical_Design,
      }),
      Development: add(startDate, {
        days:
          timeline.PRD +
          timeline.UI_DESIGN +
          timeline.Technical_Design +
          timeline.Development,
      }),
      QA: add(startDate, {
        days:
          timeline.PRD +
          timeline.UI_DESIGN +
          timeline.Technical_Design +
          timeline.Development +
          timeline.QA,
      }),
      Release: new Date(targetedDate), // Release is on the final targeted date
    };

    // Create the new project along with all sections
    const project = await db.project.create({
      data: {
        name,
        description,
        targetDate: new Date(targetedDate),
        owner: {
          connect: {
            id: user.id,
          },
        },
        sections: {
          create: [
            {
              name: "PRD",
              dueDate: sectionDates.PRD,
              type: SectionType.PRD,
            },
            {
              name: "UI DESIGN",
              dueDate: sectionDates.UI_DESIGN,
              type: SectionType.UI_DESIGN,
            },
            {
              name: "Technical Design",
              dueDate: sectionDates.Technical_Design,
              type: SectionType.Technical_Design,
            },
            {
              name: "Development",
              dueDate: sectionDates.Development,
              type: SectionType.Development,
            },
            {
              name: "QA",
              dueDate: sectionDates.QA,
              type: SectionType.QA,
            },
            {
              name: "Release",
              dueDate: sectionDates.Release,
              type: SectionType.Release,
            },
          ],
        },
      },
      include: {
        sections: true,
      },
    });

    return project;
  } catch (error) {
    throw new Error("Could not create project");
  }
}

export async function getProjects() {
  const self = await getSelf();
  if (!self) throw new Error("Unauthorized");

  // Find the user in the database
  const user = await db.user.findUnique({
    where: { externalId: self.externalId },
  });

  if (!user) throw new Error("User not found");

  // Fetch owned projects
  const ownedProjects = await db.project.findMany({
    where: { ownerId: user.id },
    include: {
      owner: { select: { name: true, email: true, imageUrl: true } }, // Include owner's name and email
    },
  });

  // Fetch shared projects where the user is a member
  const sharedProjects = await db.projectAssignment.findMany({
    where: { userId: user.id },
    include: {
      project: {
        include: {
          owner: { select: { name: true, email: true, imageUrl: true } }, // Include owner's name and email
        },
      },
    },
  });

  // Combine results
  const projects = [
    ...ownedProjects.map((project) => ({
      ...project,
      isOwner: true,
      owner: {
        name: project.owner.name,
        email: project.owner.email,
        imageUrl: project.owner.imageUrl,
      },
    })),
    ...sharedProjects.map((assignment) => ({
      ...assignment.project,
      isOwner: false,
      owner: {
        name: assignment.project.owner.name,
        email: assignment.project.owner.email,
        imageUrl: assignment.project.owner.imageUrl,
      },
    })),
  ];

  // Ensure targetDate is a Date object
  return projects.map((project) => ({
    ...project,
    targetDate: new Date(project.targetDate), // Ensure targetDate is a Date object
  }));
}

export async function getProject(projectId: string) {
  const self = await getSelf();
  if (!self) throw new Error("Unauthorized");

  // Find the user in the database
  const user = await db.user.findUnique({
    where: { externalId: self.externalId },
  });

  if (!user) throw new Error("User not found");

  // Fetch the project
  const project = await db.project.findFirst({
    where: {
      id: projectId,
      OR: [
        { ownerId: user.id }, // Owned by the user
        { assignedUsers: { some: { userId: user.id } } }, // Shared with the user
      ],
    },
    include: {
      owner: { select: { name: true, email: true, imageUrl: true } }, // Include owner's name and email
      sections: true,
    },
  });

  if (!project) throw new Error("Project not found");

  // Ensure targetDate is a Date object
  return {
    ...project,
    targetDate: new Date(project.targetDate), // Ensure targetDate is a Date object
  };
}
