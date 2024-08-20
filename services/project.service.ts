import { db } from "@/database";
import { add } from "date-fns";
import { getSelf } from "./auth.service";
import { SectionType } from "@prisma/client";

export async function addProject({ name, description, targetedDate }: Project) {
  try {
    const self = await getSelf();
    if (!self) throw new Error("Unauthorized");

    // Find the user in the database
    const user = await db.user.findUnique({
      where: { externalId: self.externalId },
    });

    if (!user) throw new Error("User not found");

    // Create the new project along with all sections
    const project = await db.project.create({
      data: {
        name,
        description,
        targetDate: add(new Date(targetedDate), { days: 1 }),
        owner: {
          connect: {
            id: user.id,
          },
        },
        sections: {
          create: Object.values(SectionType).map((type) => ({
            name: type.replace(/_/g, " "),
            dueDate: add(new Date(targetedDate), { days: 7 }),
            type: type,
          })),
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
