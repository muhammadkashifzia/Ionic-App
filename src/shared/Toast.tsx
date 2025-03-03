/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { IonToast, IonButton, IonItem, IonLabel } from '@ionic/react';
import { Animation, createAnimation } from '@ionic/react';
import { useRef } from 'react';


interface ToastProps {
  icon?: string;
  text: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ icon, text, type = 'info', onClose }) => {
  const fadeAnim = useRef<HTMLDivElement>(null);
  const slideAnim = useRef<HTMLDivElement>(null);

  // Enhanced toast styles with gradients and specific icons
  const toastConfig = {
    success: {
      backgroundColor: '#167068',
      secondaryColor: '#199a8e',
      icon: icon || 'checkmark-circle',
      shadowColor: '#065F46'
    },
    error: {
      backgroundColor: '#EF4444',
      secondaryColor: '#DC2626',
      icon: icon || 'alert-circle',
      shadowColor: '#991B1B'
    },
    info: {
      backgroundColor: '#3B82F6',
      secondaryColor: '#2563EB',
      icon: icon || 'information-circle',
      shadowColor: '#1E40AF'
    },
    warning: {
      backgroundColor: '#F59E0B',
      secondaryColor: '#D97706',
      icon: icon || 'warning',
      shadowColor: '#92400E'
    }
  };

  useEffect(() => {
    // Parallel animations for fade and slide
    const fadeIn = createAnimation()
      .addElement(fadeAnim.current!)
      .to('opacity', 1)
      .duration(400)
      .easing('ease-out');

    const slideIn = createAnimation()
      .addElement(slideAnim.current!)
      .from('transform', 'translateX(-100%)')
      .to('opacity', 0)
      .duration(400)
      .easing('ease-out');

    fadeIn.play();
    slideIn.play();

    // Auto-dismiss animation
    const dismissTimeout = setTimeout(() => {
      const fadeOut = createAnimation()
        .addElement(fadeAnim.current!)
        .to('opacity', 0)
        .duration(300)
        .easing('ease-in');

      const slideOut = createAnimation()
        .addElement(slideAnim.current!)
        .to('transform', 'translateX(-100%)')
        .duration(300)
        .easing('ease-in');

      fadeOut.play();
      slideOut.play();

      setTimeout(onClose, 300); // Close toast after animation
    }, 3000);

    return () => clearTimeout(dismissTimeout);
  }, [fadeAnim, slideAnim, onClose]);

  const config = toastConfig[type];

  return (
    <IonToast
      isOpen={true}
      onDidDismiss={onClose}
      message={text}
      duration={3000}
      color={config.backgroundColor}
      buttons={[
        {
          icon: config.icon,
          text: 'Close',
          handler: onClose
        }
      ]}
    />
  );
};

export default Toast;
// Removed conflicting local declaration of useRef

