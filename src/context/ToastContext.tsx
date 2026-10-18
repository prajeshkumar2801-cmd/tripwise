import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastMessage, ToastType } from '../types/destination';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastContextType {
  showToast: (title: string, type?: ToastType, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((title: string, type: ToastType = 'info', description?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: ToastMessage = { id, title, description, type };

    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 3.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-sky-500 shrink-0" />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container floating bottom-right */}
      <div
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 bg-white/95 backdrop-blur-md rounded-xl shadow-card border border-slate-200/80 text-slate-800 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
            role="alert"
          >
            {getToastIcon(toast.type)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 leading-tight">{toast.title}</p>
              {toast.description && (
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
