import React, { useEffect, useState } from 'react';
import { IonButton, IonText, IonSpinner } from '@ionic/react';


// Define the types for the component's props
interface CustomButtonProps {
  testID?: string;
  onPress: () => void;
  title: string;
  disabled?: boolean;
  isValid?: boolean;
  isDirty?: boolean;
  isLoading?: boolean;
  style?: string;
  textStyle?: string;
  activeTextColor?: string;
  inActiveTextColor?: string;
  activeColor?: string;
  inactiveColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  testID,
  onPress,
  title,
  disabled = false,
  isValid = true,
  isDirty = true,
  isLoading = false,
  style = '',
  textStyle = '',
  activeTextColor = 'text-white',
  inActiveTextColor = 'text-gray-800',
  activeColor = 'bg-teal-600',
  inactiveColor = 'bg-teal-300',
}) => {
  const [rotate, setRotate] = useState<number>(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setRotate((prev) => (prev + 1) % 360); // Increment rotation for spinner
      }, 30); // Adjust speed of rotation (ms)

      return () => clearInterval(interval); // Cleanup on unmount
    } else {
      setRotate(0);
    }
  }, [isLoading]);

  const buttonStyles = `${isValid && isDirty ? activeColor : inactiveColor} ${style}`;
  const textColor = isValid && isDirty ? activeTextColor : inActiveTextColor;

  return (
    <button
      data-testid={testID}
      onClick={onPress}
      className={`w-full py-3 rounded-lg flex justify-center items-center ${buttonStyles}`}
      disabled={disabled || !(isValid && isDirty) || isLoading}
    >
      {isLoading ? (
        <IonSpinner
          name="circles"
          style={{
            transform: `rotate(${rotate}deg)`,
            width: '24px',
            height: '24px',
          }}
          color="light"
        />
      ) : (
        <IonText className={`${textColor} ${textStyle}`}>{title}</IonText>
      )}
    </button>
  );
};

export default CustomButton;
