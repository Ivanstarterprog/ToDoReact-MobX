import NoTasksCard from "@components/NoTasksCard";
import TaskCard from "@components/TaskCard";
import { observer } from "mobx-react-lite";
import { taskStore } from "@stores/TaskStore";
import styles from "./TaskList.module.css";

export const TaskList = observer(
  ({ onDeleteTask, onEditTask, onShareTask }) => {
    if (taskStore.tasks.length === 0) {
      return <NoTasksCard />;
    }
    return (
      <div className={styles.tasks}>
        {taskStore.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
            onShareTask={onShareTask}
          />
        ))}
      </div>
    );
  }
);
