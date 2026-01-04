import ConfirmButtons from "@components/ConfirmButtons";

export const ConfirmDeleteModal = ({
  onClose,
  cancelText = "Нет",
  confirmText = "Да",
  message = "Удалить задачу?",
}) => {
  return (
    <div>
      <p>{message}</p>

      <ConfirmButtons
        onCancel={() => onClose(false)}
        onConfirm={() => onClose(true)}
        cancelText={cancelText}
        confirmText={confirmText}
      />
    </div>
  );
};
