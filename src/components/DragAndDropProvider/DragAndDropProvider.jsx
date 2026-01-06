import { useState, useRef } from "react";
import { taskStore } from "@stores/TaskStore";
import { observer } from "mobx-react-lite";
import { DragAndDropContext } from "@contexts/DragAndDropContext";

export const DragAndDropProvider = observer(({ children }) => {
  const dragStartRef = useRef(null);
  const dragOverRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (taskId) => {
    const task = taskStore.getTaskById(taskId);
    if (task && task.isPinned) {
      return;
    }

    dragStartRef.current = taskId;
    setIsDragging(true);
    taskStore.setDraggedTaskId(taskId);
    return true;
  };

  const handleDragOver = (e, taskId) => {
    e.preventDefault();
    if (!dragStartRef.current || dragStartRef.current === taskId) {
      return;
    }
    const task = taskStore.getTaskById(taskId);
    if (task && task.isPinned) {
      return;
    }

    dragOverRef.current = taskId;

    const fromIndex = taskStore.getUnpinnedTaskIndex(dragStartRef.current);
    const toIndex = taskStore.getUnpinnedTaskIndex(dragOverRef.current);

    if (fromIndex !== -1 && toIndex !== -1) {
      taskStore.setDragOverIndex(toIndex);
    }
  };

  const handleDragEnd = () => {
    if (dragStartRef.current && dragOverRef.current) {
      const fromIndex = taskStore.getUnpinnedTaskIndex(dragStartRef.current);
      const toIndex = taskStore.getUnpinnedTaskIndex(dragOverRef.current);

      if (fromIndex !== -1 && toIndex !== -1) {
        taskStore.moveUnpinnedTask(fromIndex, toIndex);
      }
    }

    dragStartRef.current = null;
    dragOverRef.current = null;
    setIsDragging(false);
    taskStore.setDraggedTaskId(null);
    taskStore.setDragOverIndex(-1);
  };

  const handleDragLeave = () => {
    taskStore.setDragOverIndex(-1);
  };

  const value = {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragLeave,
    isDragging,
    draggedTaskId: taskStore.draggedTaskId,
    dragOverIndex: taskStore.dragOverIndex,
  };

  return (
    <DragAndDropContext.Provider value={value}>
      {children}
    </DragAndDropContext.Provider>
  );
});

export default DragAndDropProvider;
