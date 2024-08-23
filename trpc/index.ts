import {
  addProject,
  getProject,
  getProjects,
} from "@/services/project.service";
import { privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { addSection, removeSection } from "@/services/section.service";
import { addPRD, getPRDs } from "@/services/prd.service";

export const appRouter = router({
  addProject: privateProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        targetDate: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, description, targetDate } = input;
      try {
        // create a new project
        await addProject({ name, description, targetDate });
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

  removeSection: privateProcedure
    .input(
      z.object({
        projectId: z.string(),
        sectionId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { projectId, sectionId } = input;
      try {
        // remove a section
        await removeSection(projectId, sectionId);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not remove section",
        });
      }
    }),
  addSection: privateProcedure
    .input(
      z.object({
        projectId: z.string(),
        sectionId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { projectId, sectionId } = input;
      try {
        // add a section
        await addSection(sectionId, projectId);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not add section",
        });
      }
    }),
  addPRD: privateProcedure
    .input(
      z.object({
        projectId: z.string(),
        prd: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { projectId, prd } = input;
      try {
        // add a PRD
        await addPRD(projectId, prd);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not add PRD",
        });
      }
    }),
  getPRDs: privateProcedure
    .input(
      z.object({
        projectId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { projectId } = input;
      try {
        // get PRDs
        const prds = await getPRDs(projectId);
        return prds;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not get PRDs",
        });
      }
    }),
});

export type AppRouter = typeof appRouter;
