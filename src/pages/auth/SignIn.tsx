import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useIonRouter } from '@ionic/react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useLogin} from '../../hooks/useAuth';


const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useIonRouter();
  const { mutate: login, isPending } = useLogin();

  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  return (
    <div className="flex flex-col justify-center min-h-screen bg-white px-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-black mb-2">Welcome Back!</h1>
      <p className="text-gray-500 mb-8">Log in to your account</p>

      {/* Formik Form */}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => login(values)}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-black font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Field
                  type="email"
                  name="email"
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your email"
                />
              </div>
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-black font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="w-full pl-12 pr-12 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5 text-gray-400" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-teal-600 hover:text-teal-700"
                onClick={() => router.push('/forgot-password', 'forward')}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className={`w-full py-3 px-4 text-white font-medium rounded-2xl transition-colors ${
                isSubmitting || isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1abc9c] hover:bg-teal-600'
              }`}
            >
              {isSubmitting || isPending ? 'Logging in...' : 'Login'}
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-gray-500">
              Don't have an account?{' '}
              <button
                type="button"
                className="text-teal-500 hover:text-teal-600"
                onClick={() => router.push('/signup', 'forward')}
              >
                Sign Up
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
