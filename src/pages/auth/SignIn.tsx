import React, { useState } from 'react'
import { ArrowLeft, Mail, Lock, EyeOff, Eye } from 'lucide-react'
import { useHistory } from 'react-router-dom'
// import circleSvg from '../../assets/svgs/circle.js'; 
import { IonIcon } from '@ionic/react';
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const history = useHistory()
  return (
    <div className='min-h-screen bg-white'>
      {/* Back Button */}
      <button className='p-4'>
        <ArrowLeft className='w-6 h-6 text-black' />
      </button>
      <IonIcon src={circleSvg} className='w-72 h-72 absolute right-0' />
      {/* Main Content */}
      <div className='px-6 pt-8'>
        <div className='flex justify-center flex-col mb-8'>
        <h1 className='text-2xl leading-[32px] mb-2 text-black'>Welcome Back!</h1>
        <p className='text-gray-500 '>Log in to your account</p>
        </div>


        {/* Login Form */}
        <form >
          <div className='space-y-2'>
            <label htmlFor='email' className='block text-black font-medium'>
              Email
            </label>
            <div className='relative'>
              <Mail className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                type='email'
                id='email'
                className='w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500'
                placeholder='Enter your email'
              />
            </div>
          </div>

          <div className='mt-4'>
            <label htmlFor='password' className='block text-black font-medium'>
              Password
            </label>
            <div className='relative'>
              <Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                className='w-full pl-12 pr-12 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500'
                placeholder='Enter your password'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 transform -translate-y-1/2'>
                {showPassword ? (
                  <Eye className='w-5 h-5 text-gray-400' />
                ) : (
                  <EyeOff className='w-5 h-5 text-gray-400' />
                )}
                {/* <EyeOff className='w-5 h-5 text-gray-400' /> */}
              </button>
            </div>
          </div>

          <div className='text-right mt-4'>
            <a href='#' className='text-red hover:text-teal-600'>
              Forgot Password?
            </a>
          </div>
          <button
            type='submit'
            className='w-full py-3 px-4 bg-primary text-white font-medium rounded-xl hover:bg-teal-500 transition-colors mt-4'>
            Login
          </button>
          <p className='text-center text-gray-500 mt-4'>
            Don't have account?
            <a href='#' className='text-teal-500 hover:text-teal-600 ml-1' onClick={() => history.push('/signup')}>
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignIn
