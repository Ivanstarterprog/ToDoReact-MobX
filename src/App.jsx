import AddTaskForm from "@components/AddTaskForm";
import ShareModal from "@components/ShareModal";
import TaskList from "@components/TaskList";
import ConfirmModal from "@components/ConfirmModal";
import DragAndDropProvider from "@components/DragAndDropProvider/DragAndDropProvider";

import { observer } from "mobx-react-lite";
export const App = observer(() => {
  return (
    <DragAndDropProvider>
      <main>
        <ConfirmModal />
        <ShareModal />
        <TaskList />
        <AddTaskForm />
      </main>
    </DragAndDropProvider>
  );
});

export default App;
