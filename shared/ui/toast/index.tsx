"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  useRef,
  useState,
  useContext,
  useCallback,
  createContext,
} from "react";

interface Toast {
  id: number;
  message: string;
  icon?: React.ReactNode;
}

const ToastContext = createContext<{ toast: (t: Omit<Toast, "id">) => void }>({
  toast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const toast = useCallback(({ message, icon }: Omit<Toast, "id">) => {
    const id = nextId.current++;

    setToasts((prev) => [...prev, { id, message, icon }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      2600
    );
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-6 left-1/2 z-[120] flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="glass pointer-events-auto flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-fg shadow-lg"
            >
              {t.icon && (
                <span className="text-accent [&>svg]:h-4 [&>svg]:w-4">
                  {t.icon}
                </span>
              )}
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
