import { makeAutoObservable, autorun } from "mobx";
import Task from "@entities/task";

export class TaskStore {
  tasks = [];
  dragOverIndex = -1;
  draggedTaskId = null;

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
    this.setupAutoSave();
  }

  loadFromLocalStorage() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      try {
        const tasksArray = JSON.parse(saved);
        this.tasks = tasksArray.map((item) => Task.objectToTask(item));
        if (tasksArray.length > 0) {
          const maxId = Math.max(...tasksArray.map((t) => t.id));
          Task.setNextId(maxId);
        }
      } catch (e) {
        console.error("Не получилось загрузить задачи");
        console.error(e);
      }
    }
  }

  get pinnedCount() {
    return this.tasks.filter((task) => task.isPinned).length;
  }

  get canPinMore() {
    return this.pinnedCount < 3;
  }

  get sortedTasks() {
    let tasks = [...this.tasks];
    tasks.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return a.id - b.id;
    });
    const pinned = this.tasks.filter((task) => task.isPinned);
    const unpinned = this.tasks.filter((task) => !task.isPinned);

    return [...pinned, ...unpinned];
  }

  get unpinnedTasks() {
    return this.tasks.filter((task) => !task.isPinned);
  }

  setupAutoSave() {
    autorun(() => {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    });
  }

  addTask(task) {
    this.tasks.push(task);
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  updateTask(taskId, newData) {
    const task = this.getTaskById(taskId);
    if (task) {
      task.setTaskData(newData);
    }
  }

  togglePinTask(taskId) {
    const task = this.getTaskById(taskId);
    if (!task) {
      return false;
    }

    if (!task.isPinned && this.pinnedCount >= 3) {
      return false;
    }

    task.togglePin();
    return true;
  }

  shouldShowPinButton(taskId) {
    const task = this.getTaskById(taskId);
    if (!task) {
      return false;
    }

    return task.isPinned || this.canPinMore;
  }

  getTaskById(taskId) {
    return this.tasks.find((task) => task.id === taskId);
  }

  getUnpinnedTaskIndex(taskId) {
    return this.unpinnedTasks.findIndex((task) => task.id === taskId);
  }

  setDraggedTaskId(taskId) {
    this.draggedTaskId = taskId;
  }

  setDragOverIndex(index) {
    this.dragOverIndex = index;
  }

  moveTask(fromIndex, toIndex) {
    if (fromIndex === toIndex) {
      return;
    }
    const tasksCopy = [...this.tasks];
    const [movedTask] = tasksCopy.splice(fromIndex, 1);
    tasksCopy.splice(toIndex, 0, movedTask);
    this.tasks = tasksCopy;
  }

  moveUnpinnedTask(fromIndex, toIndex) {
    const unpinnedTasks = this.unpinnedTasks;

    if (fromIndex >= unpinnedTasks.length || toIndex >= unpinnedTasks.length)
      return;

    const fromTask = unpinnedTasks[fromIndex];
    const toTask = unpinnedTasks[toIndex];

    const fromRealIndex = this.tasks.findIndex((t) => t.id === fromTask.id);
    const toRealIndex = this.tasks.findIndex((t) => t.id === toTask.id);

    this.moveTask(fromRealIndex, toRealIndex);
  }
}

export const taskStore = new TaskStore();
