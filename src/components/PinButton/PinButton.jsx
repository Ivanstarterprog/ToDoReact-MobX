import { observer } from "mobx-react-lite";
import { taskStore } from "@stores/TaskStore";
import pinImage from "@assets/img/pin.svg";
import pinFilledImage from "@assets/img/pin filled.svg";
import styles from "./PinButton.module.css";

export const PinButton = observer(({ taskId }) => {
  const task = taskStore.getTaskById(taskId);
  const shouldShowPinButton = taskStore.shouldShowPinButton(taskId);

  if (!task || !shouldShowPinButton) {
    return null;
  }

  const handleClick = (e) => {
    e.stopPropagation();
    taskStore.togglePinTask(taskId);
  };
  return (
    <img
      className={styles.pin_button}
      onClick={handleClick}
      src={task.isPinned ? pinFilledImage : pinImage}
      alt={task.isPinned ? "Открепить" : "Закрепить"}
    />
  );
});
