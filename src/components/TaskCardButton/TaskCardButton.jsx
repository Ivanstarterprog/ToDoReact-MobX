import styles from "./TaskCardButton.module.css";

export const TaskCardButton = ({ image, image_alt, onClick, task }) => {
  return (
    <button onClick={() => onClick(task)} className={styles.task__card__button}>
      <img src={image} alt={image_alt} />
    </button>
  );
};
