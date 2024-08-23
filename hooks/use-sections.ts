import { trpc } from "@/app/_trpc/client";
import { useTriggerModal } from "./use-trigger-modal";

export const useSections = () => {
  const { close } = useTriggerModal();
  const utils = trpc.useUtils();

  const { mutate: removeSection } = trpc.removeSection.useMutation({
    onSuccess: async () => {
      close();
      utils.getProject.invalidate();
    },
  });
  const { mutate: addSection } = trpc.addSection.useMutation({
    onSuccess: async () => {
      close();
      utils.getProject.invalidate();
    },
  });

  return { removeSection, addSection };
};
