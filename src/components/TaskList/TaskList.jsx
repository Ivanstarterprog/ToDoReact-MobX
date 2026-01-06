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

    const tasksSorted = taskStore.sortedTasks;
    return (
      <div className={styles.tasks}>
        {tasksSorted.map((task, index) => {
          const unpinnedIndex = taskStore.getUnpinnedTaskIndex(task.id);
          const displayIndex = task.isPinned ? index : unpinnedIndex;
          return (
            <TaskCard
              key={task.id}
              task={task}
              index={displayIndex}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
              onShareTask={onShareTask}
            />
          );
        })}
      </div>
    );
  }
);
