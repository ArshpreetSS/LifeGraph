"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface Toast {
  id: string;
  message: string;
  type?: "success" | "info" | "lime";
}

interface ToastContextType {
  showToast: (message: string, type?: "success" | "info" | "lime") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: "success" | "info" | "lime" = "lime") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Render Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-lg border backdrop-blur-xl text-xs font-mono tracking-wide shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-3",
              toast.type === "lime" && "bg-[#0C0F12]/95 border-[#D4FF00]/40 text-[#F5F5F7] shadow-[0_0_25px_rgba(212,255,0,0.12)]",
              toast.type === "success" && "bg-[#0C0F12]/95 border-emerald-500/40 text-emerald-200",
              toast.type === "info" && "bg-[#0C0F12]/95 border-white/15 text-[#E4E4E7]"
            )}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === "lime" ? (
                <span className="w-2 h-2 rounded-full bg-[#D4FF00] shadow-[0_0_8px_#D4FF00]" />
              ) : toast.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Info className="w-4 h-4 text-cyan-400" />
              )}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-[#71717A] hover:text-white transition-colors ml-2"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: (msg: string) => console.log(msg)
    };
  }
  return context;
}
