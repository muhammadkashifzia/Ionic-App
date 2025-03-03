import { IonButton, IonInput, IonItem, IonLabel, IonTextarea, IonList, IonCard, IonCardContent, IonImg } from '@ionic/react';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import TakeAssessment from '../components/news/takeAssessment';
const schema = yup.object().shape({
  description: yup.string().max(500, 'Description must be less than 500 characters'),
});

interface AssessmentFormData {
  description: string;
}

interface TakeAssessmentProps {
  onAssessmentChange: (data: any) => void;
  isSubmitted: boolean;
}

interface ControllerFieldProps {
  field: {
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    value: string;
    name: string;
    ref: React.Ref<any>;
  };
}

const AssessmentForm = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const checkCooldown = async () => {
      const { value } = await Preferences.get({ key: 'lastSubmissionTime' });
      if (value) {
        const lastSubmissionTime = new Date(value);
        const now = new Date();
        const hoursPassed = (now.getTime() - lastSubmissionTime.getTime()) / (1000 * 60 * 60);
        setIsDisabled(hoursPassed < 24);
      }
    };
    checkCooldown();
  }, []);

  const handleImageUpload = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      quality: 90,
    });
    setImage(`data:image/jpeg;base64,${photo.base64String}`);
  };

  const onSubmit = async (data: { description: string }) => {
    await Preferences.set({ key: 'lastSubmissionTime', value: new Date().toISOString() });
    alert('Assessment submitted successfully!');
    reset();
    setImage(null);
    setIsDisabled(true);
  };

  function handleAssessmentChange(data: any, setFieldValue: any, setFieldTouched: any) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        setFieldValue(key, data[key]);
        setFieldTouched(key, true);
      }
    }
  }
  const setFieldValue = (field: string, value: any) => {
    // Implement the logic to set the field value
  };

  const setFieldTouched = (field: string, touched: boolean) => {
    // Implement the logic to set the field touched state
  };

  return (
    <div className="p-4 overflow-y-auto h-full">
      <h2 className='text-[#111827] text-[20px] text-center mb-[20px]'>評価入力</h2>
      <div>
        <TakeAssessment
          onAssessmentChange={(data: any) =>
            handleAssessmentChange(data, setFieldValue, setFieldTouched)
          }
          isSubmitted={isSubmitted} // Pass the submission state
        />
        <div className='bg-[#F3F3F3] p-[10px] rounded-[4px] mt-[20px]'>
      <p>今日の爪、髪の毛、皮膚等の状態の画像を
      アップロードして記録してみましょう。（任意）</p>
      {image && <IonImg src={image} className="rounded-md mb-4 mt-[10px]" />}
        <button onClick={handleImageUpload} className="mb-4 bg-[#199A8E] text-white rounded-md px-4 py-2 w-full mt-[13px]">
        ギャラリーからアップロード
        </button>
        </div>
          

        <Controller
          name="description"
          control={control}
          render={({ field }: ControllerFieldProps) => (
            <IonItem className="mb-4 w-full">
              <IonLabel position="stacked">フリーテキスト（150文字以内）</IonLabel>
              <div className='border border-[#D1D5DB] p-[12px] rounded-[12px]'><IonTextarea {...field} placeholder="本日の症状などの感想を任意で150文字以内でご記入ください。" rows={6} cols={38} /></div>
            </IonItem>
          )}
        />

        <button
          onClick={handleSubmit(onSubmit)}
          expand="block"
          disabled={isDisabled}
          className="mb-4 bg-[#199A8E] text-white rounded-md px-4 py-2 w-full mt-[13px]"
        >
          記録する
        </button>
      </div>
    </div>
  );
};

export default AssessmentForm;
