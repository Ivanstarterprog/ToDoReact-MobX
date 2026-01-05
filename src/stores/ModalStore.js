import { makeAutoObservable } from "mobx";

export class ModalStore {
  shareModal = {
    isOpen: false,
    taskTitle: "",
    taskBody: "",
  };

  confirmModal = {
    isOpen: false,
    variant: "confirmModal",
    message: "Удалить задачу?",
    task: null,
    cancelText: "Нет",
    confirmText: "Да",
    resolve: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  openShareModal(task) {
    this.shareModal.isOpen = true;
    this.shareModal.taskTitle = task.title;
    this.shareModal.taskBody = task.body;
  }

  closeShareModal() {
    this.shareModal.isOpen = false;
    this.shareModal.taskTitle = "";
    this.shareModal.taskBody = "";
  }

  openConfirmModal(config = {}) {
    this.confirmModal = {
      ...this.confirmModal,
      ...config,
      isOpen: true,
    };
    return new Promise((resolve) => {
      this.confirmModal.resolve = resolve;
    });
  }

  handleConfirm(result) {
    if (this.confirmModal.resolve) {
      this.confirmModal.resolve(result);
    }
    this.closeConfirmModal();
  }

  closeConfirmModal() {
    this.confirmModal.isOpen = false;
    this.confirmModal.resolve = null;
  }
}

export const modalStore = new ModalStore();
