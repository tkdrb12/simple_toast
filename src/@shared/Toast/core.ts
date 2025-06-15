import { Listener, ToastItem, TypeOptions } from './types';
import { generateId } from './utils';

class Toast {
  private listeners: Set<Listener>;
  private toastItems: ToastItem[];

  constructor() {
    this.listeners = new Set();
    this.toastItems = [];
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  broadcast() {
    this.listeners.forEach((listener) => listener(this.toastItems));
  }

  add(message: string, typeOption: TypeOptions, delay?: number | null) {
    this.toastItems = [
      ...this.toastItems,
      {
        id: generateId(),
        message,
        typeOption,
        delay,
        status: 'added',
      },
    ];
    this.broadcast();
  }

  remove(id: number) {
    this.toastItems = this.toastItems.filter((item) => item.id !== id);
    this.broadcast();
  }

  update(id: number, toastItem: Partial<ToastItem>) {
    this.toastItems = this.toastItems.map((item) =>
      id === item.id ? { ...item, ...toastItem } : item
    );
    this.broadcast();
  }

  clear() {
    this.toastItems = [];
    this.broadcast();
  }
}

export const toast = new Toast();
