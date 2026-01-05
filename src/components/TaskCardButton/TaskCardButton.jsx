import styles from "./TaskCardButton.module.css";

export const TaskCardButton = ({ image, image_alt, onClick }) => {
  return (
    <button onClick={onClick} className={styles.task__card__button}>
      <img src={image} alt={image_alt} />
    </button>
  );
};
