import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast from './Toast'; // Import the Toast component

type ToastType = 'info' | 'success' | 'error' | 'warning';

type ToastProps = {
  icon: ReactNode;
  text: string;
  type?: ToastType;
};

type ToastContextType = {
  showToast: (icon: ReactNode, text: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = (icon: ReactNode, text: string, type: ToastType = 'info') => {
    setToast({ icon, text, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast {...toast} onClose={hideToast} />}
    </ToastContext.Provider>
  );
};