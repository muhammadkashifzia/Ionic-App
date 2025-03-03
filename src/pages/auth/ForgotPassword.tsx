import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonButton, IonInput } from '@ionic/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useForgotPassword } from '../../hooks/useAuth';
import CustomButton from '../../shared/CustomButton';  

const ResetSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
});

import { RouteComponentProps } from 'react-router-dom';

interface ResetPasswordProps extends RouteComponentProps {}

const ResetPassword: React.FC<ResetPasswordProps> = ({ history }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const forgotPasswordHandler = (email: string) => {
    setIsLoading(true);
    const { mutate } = useForgotPassword();
    return new Promise<void>((resolve, reject) => {
      mutate(email, {
        onSuccess: () => {
          setIsLoading(false);
          resolve();
        },
        onError: (error) => {
          setIsLoading(false);
          reject(error);
        }
      });
    });
  };

  interface FormValues {
    email: string;
  }


  const handleForgotEmail = (values: FormValues): void => {
    forgotPasswordHandler(values.email)
      .then(() => {
        // handle success
      })
      .catch((error) => {
        // handle error
        console.error(error);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <button slot="start">
            <IonBackButton />
          </button>
          <IonTitle>パスワードのリセット</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div className="flex-1 p-6 bg-white">
        <div className="absolute right-0 top-0">
          {/* You can place your SVG or other background icons here */}
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-medium text-gray-900">パスワードのリセット</h1>
          <p className="text-base text-gray-500 mt-2">
            メールアドレスを入力してください。確認コードをメールでお送りします。
          </p>
        </div>

        <Formik
          initialValues={{ email: '' }}
          validationSchema={ResetSchema}
          onSubmit={handleForgotEmail}
        >
          {({
            handleSubmit,
            isValid,
            dirty,
            values,
            errors,
            touched,
            handleChange,
            handleBlur
          }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  メール
                </label>
                <input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={e => handleChange('email')((e.target as unknown as HTMLInputElement).value)}
                    onBlur={handleBlur('email')}
                  placeholder="メールアドレス"
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                />
                {touched.email && errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
              
              <CustomButton
                onPress={handleSubmit}
                title="リンクを送信"
                isValid={isValid}
                isDirty={dirty}
                activeColor="bg-teal-500"
                inactiveColor="bg-teal-100"
                style="margin-top: 12px;"
              />
            </form>
          )}
        </Formik>
      </div>
    </IonPage>
  );
};

export default ResetPassword;
