import { useState } from "react";
import AddTaskButton from "@components/AddTaskButton";
import Task from "@entities/task";
import styles from "./AddTaskForm.module.css";
import { taskStore } from "../../stores/TaskStore";

export const AddTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = new Task();
    newTask.setTaskTitle(title.trim());
    newTask.setTaskBody(body.trim());
    taskStore.addTask(newTask);
    setTitle("");
    setBody("");
  };

  return (
    <form className={styles.add__task} onSubmit={handleSubmit}>
      <div className={styles.add__task__data}>
        <div className={styles.add__task__top_row}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Заголовок..."
            required
          />
        </div>
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Краткое описание..."
        />
      </div>
      <AddTaskButton></AddTaskButton>
    </form>
  );
};
