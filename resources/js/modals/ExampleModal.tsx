import { Modal } from "@/ui";

interface ExampleModalProps {
  show: boolean;
  onClose: () => void;
}

export const ExampleModal = ({ show, onClose }: ExampleModalProps) => {
  return (
    <Modal
      show={show}
      title="Example modal"
      description="Lorem ipsum dolor sit consectetur ipsum dolor. Lorem ipsum dolor sit consectetur ipsum."
      onClose={onClose}
    />
  );
};
