import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useRegisterUser } from '../../hooks/useAuth';


// Define the form values interface
interface SignUpFormValues {
  nickname: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}

// Define validation schema
const SignUpSchema = Yup.object().shape({
  nickname: Yup.string().min(2, '名前が短すぎます。').required('ニックネームは必須です。'),
  email: Yup.string().email('無効なメールアドレスです。').required('メールアドレスは必須です。'),
  password: Yup.string()
    .min(8, '古いパスワードは8文字以上である必要があります。')
    .matches(/[a-zA-Z]/, '新しいパスワードには、小文字と大文字をそれぞれ1つ以上含める必要があります。')
    .matches(/[0-9]/, '新しいパスワードには、少なくとも1つの数字を含める必要があります。')
    .required('パスワードは必須です。'),
  termsAccepted: Yup.boolean().oneOf([true], '利用規約に同意する')
});

// Custom input field component
const FormField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  type?: string;
  placeholder?: string;
  icon: React.ReactNode;
  showPassword?: boolean;
  setShowPassword?: (show: boolean) => void;
  testId?: string;
}> = ({ 
  label, 
  name, 
  value, 
  onChange, 
  onBlur, 
  error, 
  touched, 
  type = 'text', 
  placeholder, 
  icon, 
  showPassword, 
  setShowPassword,
  testId
}) => {
  const inputType = name === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="mb-4" data-testid={testId}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <div className="pl-3 text-gray-500">
            {icon}
          </div>
          <input
            id={name}
            type={inputType}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className="w-full p-3 outline-none"
          />
          {name === 'password' && setShowPassword && (
            <button 
              type="button"
              className="pr-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
      </div>
      {touched && error && (
        <p className="text-red-500 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

// Custom button component
const CustomButton: React.FC<{
  onClick: () => void;
  title: string;
  isValid: boolean;
  isDirty: boolean;
  isLoading: boolean;
  testId?: string;
}> = ({ onClick, title, isValid, isDirty, isLoading, testId }) => {
  const isActive = isValid && isDirty && !isLoading;
  
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isActive}
      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
        isActive 
          ? 'bg-teal-600 text-white hover:bg-teal-700' 
          : 'bg-teal-100 text-gray-500 cursor-not-allowed'
      }`}
      data-testid={testId}
    >
      {isLoading ? '処理中...' : title}
    </button>
  );
};

const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const registerMutation = useRegisterUser();

  const handleRegisterUser = async (values: SignUpFormValues) => {
    try {
      const response = await registerMutation.mutateAsync({
        name: values.nickname,
        email: values.email,
        password: values.password
      });

      if (response?.data) {
        history.push("/tabs/home")
      }
    } catch (error) {
      console.error("Registration error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className=" px-4 py-8 relative">
        {/* Background decoration */}
        <div className="absolute right-0 top-0 w-32 h-32 bg-teal-100 rounded-bl-full opacity-50"></div>
        
        {/* Header */}
        <div className="mb-6 relative" data-testid="signup-header">
          <button 
            onClick={() => history.goBack()} 
            className="p-2 rounded-full hover:bg-gray-100"
            data-testid="back-button"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold mt-4" data-testid="signup-title">会員登録</h1>
          <p className="text-gray-600 mt-2" data-testid="signup-subtitle">
            アカウントを作成して、すべてのサービスを 楽しもう！
          </p>
        </div>
        
        {/* Form */}
        <Formik
          initialValues={{ nickname: '', email: '', password: '', termsAccepted: false }}
          validationSchema={SignUpSchema}
          onSubmit={handleRegisterUser}
        >
          {({ handleChange, handleSubmit, values, errors, touched, setFieldValue, setTouched, isValid, dirty }) => (
            <div className="mt-6" data-testid="signup-form">
              <FormField
                label="ニックネーム"
                name="nickname"
                value={values.nickname}
                onChange={handleChange('nickname')}
                onBlur={() => setTouched({ ...touched, nickname: true })}
                icon={<User size={20} />}
                error={errors.nickname}
                touched={touched.nickname}
                placeholder="ニックネーム"
                testId="nickname-input"
              />
              
              <FormField
                label="メール"
                name="email"
                value={values.email}
                onChange={handleChange('email')}
                onBlur={() => setTouched({ ...touched, email: true })}
                icon={<Mail size={20} />}
                error={errors.email}
                touched={touched.email}
                type="email"
                placeholder="メールアドレス"
                testId="email-input"
              />
              
              <FormField
                label="パスワード"
                name="password"
                value={values.password}
                onChange={handleChange('password')}
                onBlur={() => setTouched({ ...touched, password: true })}
                icon={<Lock size={20} />}
                error={errors.password}
                touched={touched.password}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                placeholder="パスワード"
                testId="password-input"
              />
              
              <div className="flex items-start mb-4" data-testid="terms-container">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  checked={values.termsAccepted}
                  onChange={(e) => setFieldValue('termsAccepted', e.target.checked)}
                  className="mt-1 mr-2"
                  data-testid="terms-checkbox"
                />
                <label htmlFor="termsAccepted" className="text-sm text-gray-700" data-testid="terms-text">
                  私は、 <span className="text-teal-600 cursor-pointer">利用規約</span> および{' '}
                  <span className="text-teal-600 cursor-pointer">プライバシーポリシー</span> に同意します。
                </label>
              </div>
              
              {touched.termsAccepted && errors.termsAccepted && (
                <p className="text-red-500 text-xs mb-4" data-testid="terms-error-text">
                  {errors.termsAccepted}
                </p>
              )}
              
              <CustomButton
                onClick={() => handleSubmit()}
                title="会員登録"
                isValid={isValid}
                isDirty={dirty}
                isLoading={isLoading}
                testId="signup-button"
              />
              
              <div className="flex justify-center items-center mt-6" data-testid="login-container">
                <span className="text-gray-600" data-testid="login-text">アカウントをお持ちですか？</span>
                <button 
                  onClick={() => history.push('/login')} 
                  className="ml-1 text-teal-600 font-medium"
                  data-testid="login-link"
                >
                  ログイン
                </button>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpPage;
