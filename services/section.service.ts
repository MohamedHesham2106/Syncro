import { db } from "@/database";
import { Section } from "@prisma/client";
import { getSelf } from "./auth.service";
export async function removeSection(
  projectId: string,
  sectionId: string
): Promise<Section> {
  const self = await getSelf();
  if (!self) throw new Error("Unauthorized");

  if (!projectId || !sectionId) throw new Error("Invalid input data");

  const isOwner = await db.project.findUnique({
    where: {
      id: projectId,
      ownerId: self.id,
    },
  });
  if (!isOwner) throw new Error("Not Found");

  const section = await db.section.update({
    where: {
      id: sectionId,
    },
    data: {
      deletedAt: new Date(),
      deleted: true,
    },
  });

  return section;
}
export async function addSection(
  sectionId: string,
  projectId: string
): Promise<Section> {
  const self = await getSelf();
  if (!self) throw new Error("Unauthorized");
  if (!projectId || !sectionId) throw new Error("Invalid input data");

  const isOwner = await db.project.findUnique({
    where: {
      id: projectId,
      ownerId: self.id,
    },
  });

  if (!isOwner) throw new Error("Not Found");

  const section = await db.section.update({
    where: {
      id: sectionId,
    },
    data: {
      deletedAt: null,
      deleted: false, // Set deleted to false to restore the section
    },
  });

  return section;
}
