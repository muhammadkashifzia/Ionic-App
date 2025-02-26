import React, { useRef, useState } from 'react';
import { IonInput } from '@ionic/react';
import { IonItem, IonLabel } from '@ionic/react';
import { useIonViewWillEnter } from '@ionic/react';

interface OtpInputProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  colorBlack?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length,
  value,
  onChange,
  hasError,
  colorBlack
}) => {
  const inputRefs = useRef<(HTMLIonInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleChange = (text: string, index: number) => {
    if (text?.length > 1) {
      const newValue = value.split('');
      text
        .slice(0, length - index)
        .split('')
        .forEach((char, i) => {
          if (index + i < length) {
            newValue[index + i] = char;
          }
        });
      onChange(newValue.join(''));

      const nextIndex = Math.min(index + text?.length - 1, length - 1);
      inputRefs.current[nextIndex]?.setFocus();
    } else {
      const newValue = value.split('');
      newValue[index] = text;
      onChange(newValue.join(''));

      if (text?.length > 0 && index < length - 1) {
        inputRefs.current[index + 1]?.setFocus();
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Backspace') {
      const newValue = value.split('');
      if (newValue[index]) {
        newValue[index] = '';
        onChange(newValue.join(''));
      } else if (index > 0) {
        inputRefs.current[index - 1]?.setFocus();
        newValue[index - 1] = '';
        onChange(newValue.join(''));
      }
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  return (
    <div className="flex justify-center gap-4">
      {[...Array(length)].map((_, index) => (
        <IonItem key={index} className="flex-1">
          <IonLabel position="floating" className="text-sm">
            OTP
          </IonLabel>
          <IonInput
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref;
            }}
            className={`w-full max-w-[120px] h-[50px] border rounded-lg text-center font-normal text-lg ${
              focusedIndex === index ? 'border-teal-500 bg-teal-100' : 'border-gray-300'
            } ${hasError ? 'border-red-500' : ''}`}
            maxlength={1}
            value={value[index] || ''}
            onIonInput={(e: any) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleKeyPress(e, index)}
            onFocus={() => handleFocus(index)}
            type="number"
          />
        </IonItem>
      ))}
    </div>
  );
};

export default OtpInput;
