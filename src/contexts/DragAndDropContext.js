import { createContext } from "react";

export const DragAndDropContext = createContext({
  handleDragStart: () => {},
  handleDragOver: () => {},
  handleDragEnd: () => {},
  handleDragLeave: () => {},
  isDragging: false,
  draggedTaskId: null,
  dragOverIndex: -1,
});

export default DragAndDropContext;
