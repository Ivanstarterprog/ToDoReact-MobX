import BaseModal from "@components/BaseModal";
import ConfirmDeleteModal from "@components/ConfirmDeleteModal";
import ConfirmEditModal from "@components/ConfirmEditModal";

export const ConfirmModal = ({
  isOpen,
  onClose,
  task = null,
  cancelText = "Нет",
  confirmText = "Да",
  message = "Удалить задачу?",
  variant = "confirmModal",
}) => {
  if (!isOpen) return null;

  return (
    <BaseModal onClose={() => onClose(false)} variant={variant}>
      {variant == "confirmModal" && (
        <ConfirmDeleteModal
          cancelText={cancelText}
          confirmText={confirmText}
          onClose={onClose}
          message={message}
        />
      )}
      {variant == "editModal" && (
        <ConfirmEditModal
          task={task}
          onClose={onClose}
          editable={true}
          cancelText={cancelText}
          confirmText={confirmText}
        />
      )}
    </BaseModal>
  );
};
