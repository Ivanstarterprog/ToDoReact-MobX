import { makeAutoObservable, reaction, autorun } from "mobx";
import Task from "@entities/task";

export class TaskStore {
  tasks = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
    this.setupAutoSave();
  }

  loadFromLocalStorage() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      try {
        console.log(saved);
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
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.setTaskData(newData);
    }
  }

  getTaskById(taskId) {
    return this.tasks.find((t) => t.id === taskId);
  }
}

export const taskStore = new TaskStore();
