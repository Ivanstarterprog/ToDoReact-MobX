import styles from "./TaskCard.module.css";
import TaskCardInformation from "@components/TaskCardInformation";
import DeleteTaskButton from "@components/DeleteTaskButton";
import TaskCardButtonsHolder from "@components/TaskCardButtonsHolder";
import { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { taskStore } from "@stores/TaskStore";
import { modalStore } from "@stores/ModalStore";
import { useDragAndDrop } from "@hooks/useDragAndDrop";

export const TaskCard = observer(({ task }) => {
  const [isButtonsVisible, setIsButtonsVisible] = useState(false);
  const cardRef = useRef(null);
  const {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    isDragging,
    handleDragLeave,
    draggedTaskId,
  } = useDragAndDrop();

  const isDragged = draggedTaskId === task.id;

  const unpinnedIndex = taskStore.getUnpinnedTaskIndex(task.id);
  const showDragAndDrop = !task.isPinned && unpinnedIndex !== -1; //Очень хотел назвать переменную showDnD

  const handleCardClick = (e) => {
    if (isDragging) return;
    if (
      e.target.closest(`.${styles.delete__task__button}`) ||
      e.target.closest(".task__card__pin_button") ||
      e.target.closest(`.${styles.drag_handle}`)
    ) {
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

  const handleDragStartLocal = (e) => {
    if (!showDragAndDrop) return;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", task.id);

    setTimeout(() => {
      cardRef.current?.classList.add(styles.dragging);
    }, 0);

    handleDragStart(task.id);
  };

  const handleDragOverLocal = (e) => {
    if (!showDragAndDrop || isDragged) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    e.dataTransfer.dropEffect = "move";

    handleDragOver(e, task.id);
  };

  const handleDragEndLocal = (e) => {
    cardRef.current?.classList.remove(styles.dragging);
    handleDragEnd();
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
    <div
      ref={cardRef}
      className={`
        ${styles.task_card_wrapper}
        ${isDragged ? styles.dragged : ""}
      `}
      draggable={showDragAndDrop}
      onDragStart={handleDragStartLocal}
      onDragOver={handleDragOverLocal}
      onDragEnd={handleDragEndLocal}
      onDragLeave={handleDragLeave}
      onClick={handleCardClick}
      data-task-id={task.id}
      data-unpinned-index={unpinnedIndex}
    >
      <div className={styles.task_card_container}>
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
