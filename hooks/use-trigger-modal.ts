import { Modal } from "@/types/modal";
import { create } from "zustand";
export enum ModalType {
  AddProject = "AddProject",
  CustomizeWorkflow = "CustomizeWorkflow",
}
export const useTriggerModal = create<Modal>((set) => ({
  isOpen: false,
  type: null,
  open: (type: ModalType) => set({ isOpen: true, type }),
  close: () => set({ isOpen: false, type: null }), // Reset type on close
}));
