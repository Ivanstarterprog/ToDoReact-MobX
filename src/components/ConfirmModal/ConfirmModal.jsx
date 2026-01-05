import BaseModal from "@components/BaseModal";
import ConfirmDeleteModal from "@components/ConfirmDeleteModal";
import ConfirmEditModal from "@components/ConfirmEditModal";
import { observer } from "mobx-react-lite";
import { modalStore } from "@stores/ModalStore";

export const ConfirmModal = observer(() => {
  const { confirmModal } = modalStore;
  const { isOpen, variant, task, cancelText, confirmText, message } =
    confirmModal;
  if (!isOpen) return null;
  const handleClose = (result) => {
    modalStore.handleConfirm(result);
  };
  return (
    <BaseModal onClose={() => handleClose(false)} variant={variant}>
      {variant == "confirmModal" && (
        <ConfirmDeleteModal
          cancelText={cancelText}
          confirmText={confirmText}
          onClose={handleClose}
          message={message}
        />
      )}
      {variant == "editModal" && (
        <ConfirmEditModal
          task={task}
          onClose={handleClose}
          editable={true}
          cancelText={cancelText}
          confirmText={confirmText}
        />
      )}
    </BaseModal>
  );
});
