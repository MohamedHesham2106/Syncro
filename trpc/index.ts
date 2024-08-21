import {
  addProject,
  getProject,
  getProjects,
} from "@/services/project.service";
import { privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const appRouter = router({
  addProject: privateProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        targetedDate: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, description, targetedDate } = input;
      try {
        // create a new project
        await addProject({ name, description, targetedDate });
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not create project",
        });
      }
    }),
  getProjects: privateProcedure.query(async () => {
    const projects = await getProjects();
    if (!projects) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not fetch projects",
      });
    }
    return projects;
  }),
  getProject: privateProcedure
    .input(
      z.object({
        projectId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { projectId } = input;
      const project = await getProject(projectId);
      if (!project) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not fetch project",
        });
      }
      return project;
    }),
});

export type AppRouter = typeof appRouter;
