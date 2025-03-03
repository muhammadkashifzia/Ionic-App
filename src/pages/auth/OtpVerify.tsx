import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonButton, IonBackButton, IonButtons, IonText, IonLoading } from '@ionic/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import OtpInput from '../../components/auth/OtpInput';
import { useVerifyEmail, useResendOTP } from '../../hooks/useAuth';

const VerifySchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{5}$/, 'Please enter all digits')
    .required('OTP is required')
});

const VerifyOtp: React.FC = ({ history, location }: any) => {
  const email = location?.state?.email || 'onamsarker@mail.com';
  const from = location?.state?.from || 'signup';

  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const verifyEmailMutation = useVerifyEmail(from);
  const resendOTPMutation = useResendOTP();
  const resendOTP = resendOTPMutation.mutateAsync;
  const VerifyEmail = verifyEmailMutation.mutate;
  const handleSubmitOtp = (values: any) => {
    VerifyEmail(email, values.otp);
  };
  
  const handleResend = () => {
    resendOTP(email).then(() => {
      setTimer(60);
      setIsResendDisabled(true);
    }).catch((error) => {
      console.error('Error resending OTP:', error);
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <IonPage>
      <IonContent className="bg-white pt-20 px-5">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home" />
        </IonButtons>

        <div className="relative">
          <p className="text-3xl font-medium text-gray-900 mb-2">コードを確認</p>
          <p className="text-lg font-normal text-gray-500 mb-10">{email} に送信したコードを入力してください。</p>

          <Formik
            initialValues={{ otp: '' }}
            validationSchema={VerifySchema}
            onSubmit={handleSubmitOtp}
          >
            {({
              handleSubmit,
              values,
              setFieldValue,
              errors,
              isValid,
              dirty
            }) => (
              <div className="flex flex-col items-center">
                <OtpInput
                  colorBlack={true}
                  length={5}
                  value={values.otp}
                  onChange={(value: string) => setFieldValue('otp', value)}
                  // hasError={errors.otp}
                />
                {errors.otp && <p className="text-red-600 text-sm mt-3">{errors.otp}</p>}

                {timer > 0 ? (
                  <p className="text-gray-900 text-sm mt-6">{formatTime(timer)}後にコードを再送信します</p>
                ) : (
                  <p className="text-gray-900 text-sm mt-6">
                    コードがまだ届いていません。
                    <p
                      className="underline text-teal-600"
                      onClick={!isResendDisabled ? handleResend : undefined}
                    >
                      コードを再送
                    </p>
                    してください。
                  </p>
                )}

                <IonButton
                  expand="block"
                  color="teal"
                  // onClick={handleSubmit}
                  // disabled={!isValid || !dirty || verifyEmail.isPending}
                >
                  {/* {verifyEmail.isPending ? (
                    <IonLoading isOpen={true} message="Loading..." />
                  ) : (
                    '続行'
                  )} */}
                </IonButton>
              </div>
            )}
          </Formik>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default VerifyOtp;
