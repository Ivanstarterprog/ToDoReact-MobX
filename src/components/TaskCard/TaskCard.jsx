import styles from "./TaskCard.module.css";
import TaskCardInformation from "@components/TaskCardInformation";
import DeleteTaskButton from "@components/DeleteTaskButton";
import TaskCardButtonsHolder from "@components/TaskCardButtonsHolder";
import { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { taskStore } from "@stores/TaskStore";
import { modalStore } from "@stores/ModalStore";
export const TaskCard = observer(({ task }) => {
  const [isButtonsVisible, setIsButtonsVisible] = useState(false);
  const cardRef = useRef(null);

  const handleCardClick = (e) => {
    if (e.target.closest(`.${styles.delete__task__button}`)) {
      return;
    }
    setIsButtonsVisible(!isButtonsVisible);
  };

  const handleDeleteTask = async (e) => {
    e.stopPropagation();
    const confirmed = await modalStore.openConfirmModal({
      task: task,
      variant: "confirmModal",
      message: "Удалить задачу?",
      confirmText: "Да",
      cancelText: "Нет",
    });
    if (!confirmed) {
      return;
    }

    taskStore.deleteTask(task.id);
  };

  const handleEditTask = async (e) => {
    e.stopPropagation();
    const updatedTaskData = await modalStore.openConfirmModal({
      variant: "editModal",
      message: "",
      task: task,
      confirmText: "Сохранить",
      cancelText: "Отменить",
    });
    if (!updatedTaskData) {
      return;
    }

    taskStore.updateTask(task.id, updatedTaskData);
  };

  const handleShareTask = (e) => {
    e.stopPropagation();
    modalStore.openShareModal(task);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsButtonsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={cardRef}>
      <div className={styles.task_card_container} onClick={handleCardClick}>
        <div className={styles.task__card}>
          <TaskCardInformation task={task} />
          <DeleteTaskButton onClick={handleDeleteTask} />
        </div>
      </div>
      <TaskCardButtonsHolder
        task={task}
        onEditClick={handleEditTask}
        isVisible={isButtonsVisible}
        onShareTask={handleShareTask}
      ></TaskCardButtonsHolder>
    </div>
  );
});
