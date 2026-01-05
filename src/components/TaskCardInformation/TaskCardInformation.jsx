import { PinButton } from "../PinButton/PinButton";
import styles from "./TaskCardInformation.module.css";
import { observer } from "mobx-react-lite";
export const TaskCardInformation = observer(({ task }) => {
  return (
    <div className={styles.task__card__data}>
      <div className={styles.task__card__title__row}>
        <h3 className={styles.task__card__title}> {task.title} </h3>
        <PinButton taskId={task.id} />
      </div>
      <p className={styles.task__card__description}> {task.body}</p>
      <h4 className={styles.task__card__deadline}> {task.deadLine()}</h4>
    </div>
  );
});
