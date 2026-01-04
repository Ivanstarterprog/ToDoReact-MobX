import AddTaskForm from "@components/AddTaskForm";
import ShareModal from "@components/ShareModal";
import TaskList from "@components/TaskList";
import useConfirmModal from "@hooks/useConfirmModal";
import useShareModal from "@hooks/useShareModal";
import Task from "@entities/task";
import { useEffect, useState } from "react";
function App() {
  const [tasks, setTasks] = useState([]);
  const { confirm, ConfirmModal } = useConfirmModal();
  const { isOpen, taskTitle, taskBody, openShare, closeShare } =
    useShareModal();

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks.length === 0) return;

    const tasksArray = JSON.parse(savedTasks);
    const taskInstances = tasksArray.map((item) => Task.objectToTask(item));
    setTasks(taskInstances);
    if (tasksArray.length > 0) {
      const maxId = Math.max(...tasksArray.map((task) => task.id));
      Task.setNextId(maxId);
    }
  }, []);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDeleteTask = async (taskToBeDeleted) => {
    const confirmed = await confirm();
    if (!confirmed) {
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskToBeDeleted.id)
    );
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

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskToBeChanged.id ? updatedTaskData : task
      )
    );
  };

  const handleShareTask = (task) => {
    console.log(task);
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
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
        onShareTask={handleShareTask}
      />
      <AddTaskForm onAddTask={handleAddTask} />
    </main>
  );
}

export default App;
