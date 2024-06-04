import type { ModalProps } from "@/shared/types";
import { Modal } from "@/ui";
import { UserForm } from "./user-form";

export const UserModal = ({ show, onClose }: ModalProps) => {
  return (
    <Modal
      show={show}
      title="Create User"
      description="Fill in the required details below to establish a new user profile."
      onClose={onClose}
    >
      <UserForm onClose={onClose} />
    </Modal>
  );
};
