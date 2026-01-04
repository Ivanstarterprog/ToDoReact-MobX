import styles from "./TaskCardInformation.module.css";
export const TaskCardInformation = ({ task }) => {
  return (
    <div className={styles.task__card__data}>
      <h3 className={styles.task__card__title}> {task.title} </h3>
      <p className={styles.task__card__description}> {task.body}</p>
      <h4 className={styles.task__card__deadline}> {task.deadLine()}</h4>
    </div>
  );
};
