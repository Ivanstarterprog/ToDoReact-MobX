import { useContext } from "react";
import DragAndDropContext from "@contexts/DragAndDropContext";

export const useDragAndDrop = () => {
  const context = useContext(DragAndDropContext);
  if (!context) {
    throw new Error(
      "Ты что делаешь брат, ты useDragAndDrop внутри DragAndDropProvider использовать должен, э"
    );
  }
  return context;
};

export default useDragAndDrop;
