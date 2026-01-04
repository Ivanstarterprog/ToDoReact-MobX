import { useState } from "react";

export const useShareModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskBody, setTaskBody] = useState("");

  const openShare = (task) => {
    setTaskTitle(task.title);
    setTaskBody(task.body);
    setIsOpen(true);
  };

  const closeShare = () => {
    setIsOpen(false);
    setTaskTitle("");
    setTaskBody("");
  };

  return {
    isOpen,
    taskTitle,
    taskBody,
    openShare,
    closeShare,
  };
};

export default useShareModal;
