import { makeAutoObservable } from "mobx";
export class Task {
  static nextId = 0;
  id;
  title;
  body;
  description;
  deadLineStart;
  deadLineEnd;

  constructor(title = "Не задан заголовок", body = "У задачи нет описания") {
    this.id = ++Task.nextId;
    this.title = title;
    this.body = body;
    this.description = "";
    this.deadLineStart = new Date().toLocaleDateString("ru-RU");
    this.deadLineEnd = "";
    makeAutoObservable(this);
  }

  static setNextId(id) {
    Task.nextId = id;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      body: this.body,
      description: this.description,
      deadLineStart: this.deadLineStart,
      deadLineEnd: this.deadLineEnd,
    };
  }

  static objectToTask(item) {
    const task = new Task();
    Object.assign(task, item);
    return task;
  }

  deadLine() {
    if (this.deadLineEnd == "") {
      return `${this.deadLineStart}`;
    }
    return `${this.deadLineStart} - ${this.deadLineEnd}`;
  }

  setTaskTitle(newTitle) {
    this.title = newTitle;
  }

  setTaskBody(newBody) {
    this.body = newBody;
  }

  setTaskDescription(newFullDescription) {
    this.description = newFullDescription;
  }

  setTaskData(taskData) {
    this.setTaskTitle(taskData.title);
    this.setTaskBody(taskData.body);
    this.setTaskDescription(taskData.description);
  }

  setDeadLineEnd(data) {
    this.deadLineEnd = data;
  }
}
