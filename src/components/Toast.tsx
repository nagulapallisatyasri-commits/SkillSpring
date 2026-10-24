"use client";

import { useState, useEffect } from "react";

interface ToastItem {
  id: string;
  message: string;
  type?: "info" | "success" | "warning";
}

export default function Toast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string; type?: "info" | "success" | "warning" }>;
      if (customEvent.detail?.message) {
        const newToast: ToastItem = {
          id: Math.random().toString(36).substring(2, 9),
          message: customEvent.detail.message,
          type: customEvent.detail.type || "info",
        };
        setToasts((prev) => [...prev, newToast]);

        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
        }, 3500);
      }
    };

    window.addEventListener("skillspring_toast", handleToastEvent);
    return () => {
      window.removeEventListener("skillspring_toast", handleToastEvent);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-message" role="status">
          <span>{toast.type === "success" ? "✓" : "★"}</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

export function showToast(message: string, type: "info" | "success" | "warning" = "info") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("skillspring_toast", { detail: { message, type } })
    );
  }
}
