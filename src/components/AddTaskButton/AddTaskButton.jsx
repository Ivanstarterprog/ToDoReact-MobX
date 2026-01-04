import styles from "./AddTaskButton.module.css";
import unionImage from "@assets/img/union.svg";

export const AddTaskButton = () => {
  return (
    <button className={styles.add__task__button} id="addNewTaskButton">
      <img src={unionImage} alt="Добавить задачу" />
    </button>
  );
};
