import { Modal } from "@/types/modal";
import { create } from "zustand";
export enum ModalType {
  ADDProject = "ADDProject",
}
export const useTriggerModal = create<Modal>((set) => ({
  isOpen: false,
  type: ModalType.ADDProject,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
