import { trpc } from "@/app/_trpc/client";

export const usePRD = () => {
  const utils = trpc.useUtils();
  const { mutate: addPRD } = trpc.addPRD.useMutation({
    onSuccess: async () => {
      await utils.getPRDs.invalidate();
    },
  });
  return { addPRD };
};
