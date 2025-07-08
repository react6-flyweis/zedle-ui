"use client";
import { useEffect } from "react";
import { useToastStore } from "@/store/toastStore";
import { SuccessToast } from "../SuccessToast";

export function ToastContainer() {
  const { toasts, remove } = useToastStore();

  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((toast) =>
      setTimeout(() => remove(toast.id), toast.duration ?? 3000),
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, remove]);

  return toasts.length > 0 ? (
    <div className="fixed inset-0 z-[9999999] flex items-center justify-center pointer-events-none">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-4 pointer-events-auto">
        {toasts.map((toast) => (
          <SuccessToast
            key={toast.id}
            title={toast.title}
            description={toast.description || ""}
          />
        ))}
      </div>
    </div>
  ) : null;
}
