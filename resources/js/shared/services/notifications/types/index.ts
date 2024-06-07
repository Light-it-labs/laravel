import type { ReactNode } from "react";

export const toastTypes = ["info", "success", "error", "warning"] as const;

export type ToastType = (typeof toastTypes)[number];

export interface Toast {
  id: string;
  type: ToastType;
  icon: ReactNode;
  title: string;
  message: string;
  timestamp: number; // date.now()
  duration: number; // in ms
  state: "open" | "isClosing";
}
