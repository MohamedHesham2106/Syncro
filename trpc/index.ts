import { addProject, getProjects } from "@/services/project.service";
import { privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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
    revalidatePath("/projects");
    return projects;
  }),
});

export type AppRouter = typeof appRouter;
