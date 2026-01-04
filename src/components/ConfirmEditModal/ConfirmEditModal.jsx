import Task from "@entities/task";
import ConfirmButtons from "@components/ConfirmButtons";
import { useState } from "react";

export const ConfirmEditModal = ({
  task,
  onClose,
  editable,
  cancelText = { cancelText },
  confirmText = { confirmText },
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [body, setBody] = useState(task.body);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        readOnly={!editable}
        type="text"
        placeholder="Заголовок..."
        id="titleEdit"
      />
      <input
        value={body}
        onChange={(e) => setBody(e.target.value)}
        readOnly={!editable}
        type="text"
        placeholder="Краткое описание..."
        id="bodyEdit"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        readOnly={!editable}
        id="descriptionEdit"
        placeholder="Подробное описание..."
      ></textarea>
      <ConfirmButtons
        onCancel={() => onClose(false)}
        onConfirm={() => {
          const updatedTask = new Task();
          updatedTask.setTaskTitle(title.trim());
          updatedTask.setTaskBody(body.trim());
          updatedTask.setTaskDescription(description.trim());
          onClose(updatedTask);
        }}
        cancelText={cancelText}
        confirmText={confirmText}
      />
    </form>
  );
};
