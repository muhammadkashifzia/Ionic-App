import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, Triangle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  const controls = useAnimation();

  const toastConfig = {
    success: {
      backgroundColor: 'bg-[#167068]',
      secondaryColor: 'bg-[#199a8e]',
      icon: <CheckCircle size={24} className="text-white" />,
      shadowColor: 'shadow-[#065F46]',
    },
    error: {
      backgroundColor: 'bg-[#EF4444]',
      secondaryColor: 'bg-[#DC2626]',
      icon: <AlertCircle size={24} className="text-white" />,
      shadowColor: 'shadow-[#991B1B]',
    },
    info: {
      backgroundColor: 'bg-[#3B82F6]',
      secondaryColor: 'bg-[#2563EB]',
      icon: <Info size={24} className="text-white" />,
      shadowColor: 'shadow-[#1E40AF]',
    },
    warning: {
      backgroundColor: 'bg-[#F59E0B]',
      secondaryColor: 'bg-[#D97706]',
      icon: <Triangle size={24} className="text-white" />,
      shadowColor: 'shadow-[#92400E]',
    },
  };

  useEffect(() => {
    // Slide in and fade in animation
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    });

    // Auto-dismiss after 3 seconds
    const dismissTimeout = setTimeout(() => {
      controls.start({
        opacity: 0,
        y: -100,
        transition: { duration: 0.3, ease: 'easeIn' },
      }).then(onClose);
    }, 3000);

    return () => clearTimeout(dismissTimeout);
  }, [controls, onClose]);

  const config = toastConfig[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={controls}
      className={`fixed top-10 left-5 right-5 rounded-xl shadow-lg ${config.backgroundColor} ${config.shadowColor}`}
    >
      <div className="flex items-center p-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.secondaryColor}`}>
          {config.icon}
        </div>
        <span className="ml-3 text-white text-base font-medium flex-1">{message}</span>
        <button onClick={onClose} className="p-1 ml-2">
          <X size={20} className="text-white opacity-80" />
        </button>
      </div>
    </motion.div>
  );
};

export default Toast;