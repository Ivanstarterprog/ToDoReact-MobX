import AddTaskForm from "@components/AddTaskForm";
import ShareModal from "@components/ShareModal";
import TaskList from "@components/TaskList";
import ConfirmModal from "@components/ConfirmModal";

import { observer } from "mobx-react-lite";
export const App = observer(() => {
  return (
    <main>
      <ConfirmModal />
      <ShareModal />
      <TaskList />
      <AddTaskForm />
    </main>
  );
});

export default App;
