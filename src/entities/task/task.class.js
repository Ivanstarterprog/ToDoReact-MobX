export class Task {
  static nextId = 0;
  constructor(title = "Не задан заголовок", body = "У задачи нет описания") {
    this.id = ++Task.nextId;
    this.title = title;
    this.body = body;
    this.description = "";
    this.deadLineStart = new Date().toLocaleDateString("ru-RU");
    this.deadLineEnd = "";
  }

  static setNextId(id) {
    Task.nextId = ++id;
  }

  static objectToTask(item) {
    let task = new Task();
    task.id = item.id;
    task.title = item.title;
    task.body = item.body;
    task.description = item.description;
    task.deadLineStart = item.deadLineStart;
    task.deadLineEnd = item.deadLineEnd;
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

  setTaskNewData(taskData) {
    this.setTaskTitle(taskData.title);
    this.setTaskBody(taskData.body);
    this.setTaskDescription(taskData.description);
  }

  setDeadLineEnd(data) {
    this.deadLineEnd = data;
  }
}
