import { ModalType } from "@/hooks/use-trigger-modal";
type Modal = {
  isOpen: boolean;
  type: ModalType | null;
  open: (modalType: ModalType) => void;
  close: () => void;
};
