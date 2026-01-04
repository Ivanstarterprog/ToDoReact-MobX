import styles from "./NoTasksCard.module.css";

export const NoTasksCard = () => {
  return (
    <div id="noTasksCard" className={styles.tasks__no_tasks}>
      <div className={styles.tasks__no_task__separator}></div>
      <p>Все задачи выполнены</p>
      <div className={styles.tasks__no_task__separator}></div>
    </div>
  );
};
