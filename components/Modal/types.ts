export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  initialFocusSelector?: string;
  returnFocusRef?: React.RefObject<HTMLElement>;
}
