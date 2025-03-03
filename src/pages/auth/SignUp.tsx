import React, { useState } from 'react';
import { useIonRouter } from '@ionic/react';
import { ArrowLeft, Mail, Lock, EyeOff, User, Shield, HelpCircle, Eye } from 'lucide-react';
// import circleSvg from '../../assets/svgs/circleSvg.svg';

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const router = useIonRouter();

  const handleRedirect = () => {
    router.push('/signin', 'forward');
  };

  return (
    <div className='min-h-screen bg-white relative'>
      {/* <img src={circleSvg} className='w-72 h-72 absolute right-0' alt='Background Design' /> */}
      <button className='p-4'>
        <ArrowLeft className='w-6 h-6 text-black' />
      </button>

      {/* Main Content */}
      <div className='px-6 pt-8'>
        <h1 className='text-3xl font-bold text-black mb-2'>Sign Up</h1>
        <p className='text-gray-500 mb-8'>Create account and enjoy all services!</p>

        {/* Sign Up Form */}
        <form className='space-y-6'>
          <div className='space-y-2'>
            <label htmlFor='nickname' className='block text-black font-medium'>Nick name</label>
            <div className='relative'>
              <User className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                type='text'
                id='nickname'
                className='w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500'
                placeholder='Nick name'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label htmlFor='email' className='block text-black font-medium'>Email</label>
            <div className='relative'>
              <Mail className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                type='email'
                id='email'
                className='w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500'
                placeholder='Email address'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label htmlFor='password' className='block text-black font-medium'>Password</label>
            <div className='relative'>
              <Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                className='w-full pl-12 pr-12 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500'
                placeholder='Password'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 transform -translate-y-1/2'
              >
                {showPassword ? <Eye className='w-5 h-5 text-gray-400' /> : <EyeOff className='w-5 h-5 text-gray-400' />}
              </button>
            </div>
          </div>

          <div className='flex items-center gap-1 text-gray-500'>
            <Shield className='w-5 h-5 block' />
            <span className='flex'>Password Suggestion</span>
            <HelpCircle className='w-5 h-5 block' />
          </div>

          <div className='flex items-start gap-2'>
            <input
              type='checkbox'
              id='terms'
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className='mt-[6px]'
            />
            <label htmlFor='terms' className='text-gray-500'>
              I agree to the company's{' '}
              <a href='#' className='text-teal-500 hover:text-teal-600'>Term of Service</a>{' '}and{' '}
              <a href='#' className='text-teal-500 hover:text-teal-600'>Privacy Policy</a>
            </label>
          </div>

          <button type='submit' className='w-full py-3 rounded-xl bg-[#D3FFF2] text-[#101010] hover:bg-[#199A8E] hover:text-white'>
            Sign Up
          </button>

          <p className='text-center text-gray-500'>
            Have an account?{' '}
            <span onClick={handleRedirect} className='text-teal-500 hover:text-teal-600 cursor-pointer'>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;