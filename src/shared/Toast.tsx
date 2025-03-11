import React, { useState, useEffect, ReactNode } from "react";
import { IonIcon } from "@ionic/react";
import { checkmarkCircle, alertCircle, informationCircle, warning, close } from "ionicons/icons";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  icon?: ReactNode; // Change string to ReactNode
  text: string;
  type?: ToastType;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ icon, text, type = "info", onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toastConfig = {
    success: {
      backgroundColor: "bg-green-700",
      secondaryColor: "bg-green-600",
      icon: icon || <IonIcon icon={checkmarkCircle} className="text-white text-xl" />, // Ensure icon is a ReactNode
    },
    error: {
      backgroundColor: "bg-red-600",
      secondaryColor: "bg-red-500",
      icon: icon || <IonIcon icon={alertCircle} className="text-white text-xl" />,
    },
    info: {
      backgroundColor: "bg-",
      secondaryColor: "bg-blue-500",
      icon: icon || <IonIcon icon={informationCircle} className="text-white text-xl" />,
    },
    warning: {
      backgroundColor: "bg-yellow-500",
      secondaryColor: "bg-yellow-400",
      icon: icon || <IonIcon icon={warning} className="text-white text-xl" />,
    },
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 1113000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  if (!isVisible) return null;

  const config = toastConfig[type];

  return (
    <div
      className={`fixed top-10 left-5 right-5 p-4 rounded-lg shadow-lg ${config.backgroundColor} text-white z-50`}
    >
    <div className="flex items-center justify-between">
    <div className={`w-10 h-10 rounded-full flex items-center justify-between ${config.secondaryColor} mr-3`}>
        {config.icon}
      </div>
      <span className="font-medium inline">{text}</span>
      <button onClick={onClose} className="ml-3 p-1">
        <IonIcon icon={close} className="text-white text-lg opacity-80" />
      </button>
    </div>
    </div>
  );
};

export default Toast;
