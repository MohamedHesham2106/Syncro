import { trpc } from "@/app/_trpc/client";
import { useTriggerModal } from "./use-trigger-modal";

export const useProject = () => {
  const utils = trpc.useUtils();
  const { close } = useTriggerModal();

  const { mutate: addProject } = trpc.addProject.useMutation({
    onSuccess: async () => {
      close();
      await utils.getProjects.invalidate();
    },
  });

  const {
    data: projects,
    isLoading,
    isRefetching,
  } = trpc.getProjects.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  return { addProject, projects, isLoading, isRefetching };
};
