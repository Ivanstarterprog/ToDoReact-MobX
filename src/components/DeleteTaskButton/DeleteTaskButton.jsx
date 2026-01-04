import styles from "./DeleteTaskButton.module.css";
import unionImage from "@assets/img/union.svg";

export const DeleteTaskButton = ({ onClick }) => {
  return (
    <button className={styles.delete__task__button} onClick={onClick}>
      <img src={unionImage} alt="Удалить" />
    </button>
  );
};
