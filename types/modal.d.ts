import { ModalType } from "@/hooks/use-trigger-modal";
type Modal = {
  isOpen: boolean;
  type: ModalType;
  open: () => void;
  close: () => void;
};