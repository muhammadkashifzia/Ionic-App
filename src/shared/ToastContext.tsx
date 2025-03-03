import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast from './Toast'; // Import the Toast component

interface ToastProps {
  icon: string;
  text: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

interface ToastContextType {
  showToast: (icon: string, text: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = (icon: string, text: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    setToast({ icon, text, type });
    setTimeout(() => setToast(null), 3000); // Auto-hide after 3 seconds
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </ToastContext.Provider>
  );
};
