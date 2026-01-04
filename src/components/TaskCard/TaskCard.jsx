import styles from "./TaskCard.module.css";
import TaskCardInformation from "@components/TaskCardInformation";
import DeleteTaskButton from "@components/DeleteTaskButton";
import TaskCardButtonsHolder from "@components/TaskCardButtonsHolder";
import { useState, useRef, useEffect } from "react";
export const TaskCard = ({ task, onDeleteTask, onEditTask, onShareTask }) => {
  const [isButtonsVisible, setIsButtonsVisible] = useState(false);
  const cardRef = useRef(null);

  const handleCardClick = (e) => {
    if (e.target.closest(`.${styles.delete__task__button}`)) {
      return;
    }
    setIsButtonsVisible(!isButtonsVisible);
  };

  const handleDeleteTask = (e) => {
    e.stopPropagation();
    onDeleteTask(task);
  };

  const handleEditTask = (e) => {
    e.stopPropagation;
    onEditTask(task);
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
        onShareTask={onShareTask}
      ></TaskCardButtonsHolder>
    </div>
  );
};
