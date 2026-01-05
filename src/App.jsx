import AddTaskForm from "@components/AddTaskForm";
import ShareModal from "@components/ShareModal";
import TaskList from "@components/TaskList";
import useConfirmModal from "@hooks/useConfirmModal";
import useShareModal from "@hooks/useShareModal";
import Task from "@entities/task";
import { taskStore } from "@stores/TaskStore";
import { observer } from "mobx-react-lite";
export const App = observer(() => {
  const { confirm, ConfirmModal } = useConfirmModal();
  const { isOpen, taskTitle, taskBody, openShare, closeShare } =
    useShareModal();

  const handleDeleteTask = async (taskToBeDeleted) => {
    const confirmed = await confirm();
    if (!confirmed) {
      return;
    }

    taskStore.deleteTask(taskToBeDeleted.id);
  };

  const handleEditTask = async (taskToBeChanged) => {
    const updatedTaskData = await confirm(
      "editModal",
      "",
      taskToBeChanged,
      "Отменить",
      "Сохранить"
    );
    if (!updatedTaskData) {
      return;
    }

    taskStore.updateTask(taskToBeChanged.id, updatedTaskData);
  };

  const handleShareTask = (task) => {
    openShare(task);
  };

  return (
    <main>
      <ConfirmModal />
      <ShareModal
        isOpen={isOpen}
        onClose={closeShare}
        taskTitle={taskTitle}
        taskBody={taskBody}
      />
      <TaskList
        tasks={taskStore.tasks}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
        onShareTask={handleShareTask}
      />
      <AddTaskForm />
    </main>
  );
});

export default App;
