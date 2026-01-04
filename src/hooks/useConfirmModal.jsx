import { useState, useRef } from "react";
import ConfirmModal from "@components/ConfirmModal";

const useConfirmModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const resolveRef = useRef(null);
  const messageRef = useRef("Удалить задачу?");
  const variantRef = useRef("confirmModal");
  const taskRef = useRef(null);
  const cancelTextRef = useRef("Нет");
  const confirmTextRef = useRef("Да");

  const confirm = (
    variant = "confirmModal",
    message = "Удалить задачу?",
    task = null,
    cancelText = "Нет",
    confirmText = "Да"
  ) => {
    messageRef.current = message;
    variantRef.current = variant;
    taskRef.current = task;
    cancelTextRef.current = cancelText;
    confirmTextRef.current = confirmText;
    setIsOpen(true);
    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  };

  const handleClose = (result) => {
    setIsOpen(false);
    if (resolveRef.current) {
      resolveRef.current(result);
      resolveRef.current = null;
    }
  };

  const ConfirmModalWrapper = () => (
    <ConfirmModal
      isOpen={isOpen}
      onClose={handleClose}
      variant={variantRef.current}
      task={taskRef.current}
      cancelText={cancelTextRef.current}
      confirmText={confirmTextRef.current}
      message={messageRef.current}
    />
  );

  return {
    confirm,
    ConfirmModal: ConfirmModalWrapper,
  };
};

export default useConfirmModal;
