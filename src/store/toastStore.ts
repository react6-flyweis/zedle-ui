import { create } from "zustand";

export type Toast = {
  id: string;
  title: string;
  description?: string;
  duration?: number;
};

interface ToastStore {
  toasts: Toast[];
  show: (toast: Omit<Toast, "id">) => void;
  remove: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  show: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { ...toast, id: Math.random().toString(36).slice(2) },
      ],
    })),
  remove: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

// Imperative toast API
export function toast(
  title: string,
  options?: { description?: string; duration?: number },
) {
  useToastStore.getState().show({ title, ...options });
}
