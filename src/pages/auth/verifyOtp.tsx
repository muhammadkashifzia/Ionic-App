import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import OtpInput from '../../components/auth/OtpInput'
import { ArrowLeft } from 'lucide-react'
import { useIonRouter } from '@ionic/react'
import { useLocation } from 'react-router-dom'
import { useVerifyEmail, useResendOTP } from '../../hooks/useAuth'

const VerifySchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{5}$/, 'Please enter all digits')
    .required('OTP is required'),
})

export default function OtpVerify() {
  const [timer, setTimer] = useState<number>(60)
  const location = useLocation()
  const router = useIonRouter()
  const queryParams = new URLSearchParams(location.search)

  const type: string = queryParams.get('type') || ''
  const email: string = queryParams.get('email') || ''

  // OTP Verification mutation
  const { mutate: verifyOtp, isPending: isVerifying, error: otpError } = useVerifyEmail()

  // OTP Resend mutation
  const { mutate: resendOtp, isPending: isResending } = useResendOTP()

  // Submit OTP handler
  const handleSubmitOtp = (values: { otp: string }) => {
    console.log('OTP:', values.otp)
    verifyOtp({ email, otp: values.otp })
  }

  // Resend OTP handler
  const handleResend = () => {
    if (!email) {
      console.error('❌ No email provided for OTP resend.')
      return
    }

    resendOtp( email ,
      {
        onSuccess: () => setTimer(60), // Reset timer on successful resend
      }
    )
  }

  // Timer countdown effect
  useEffect(() => {
    if (timer <= 0) return
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000)
    return () => clearInterval(interval)
  }, [timer])

  // Format time display
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className='flex flex-col items-center justify-center bg-white'>
      <div className='w-full  p-6'>
        <button className='mb-10' onClick={() => router.back()}>
          <ArrowLeft className='w-6 h-6 text-black' />
        </button>

        <h1 className='text-2xl font-normal text-gray-900 mb-2'>Verify Code</h1>
        <p className='text-base font-normal text-gray-500 mb-10'>
          Please enter the code we just sent to email {email || 'example@gmail.com'}
        </p>

        <Formik
          initialValues={{ otp: '' }}
          validationSchema={VerifySchema}
          onSubmit={handleSubmitOtp}
        >
          {({ handleSubmit, values, setFieldValue, errors, isValid, dirty }) => (
            <Form className='w-full'>
              <OtpInput
                colorBlack={true}
                length={5}
                value={values.otp}
                onChange={(value: string) => setFieldValue('otp', value)}
                hasError={!!errors.otp}
              />

              {/* Show error message if OTP verification fails */}
              {otpError && (
                <p className='text-red-500 text-sm mt-3'>{otpError.message || 'Invalid OTP. Please try again.'}</p>
              )}

              {timer > 0 ? (
                <p className='text-gray-900 text-sm text-center my-6'>Expire in {formatTime(timer)}</p>
              ) : (
                <p className='text-gray-900 text-sm text-center my-6'>
                  Code not received yet?{' '}
                  <button
                    type='button'
                    className={`underline ${isResending ? 'text-gray-400' : 'text-[#199A8E]'}`}
                    onClick={handleResend}
                    disabled={isResending}
                  >
                    {isResending ? 'Resending...' : 'Resend code'}
                  </button>
                </p>
              )}

              <button
                type='submit'
                className={`w-full py-3 mt-6 text-white rounded-lg ${
                  isValid && dirty && !isVerifying ? 'bg-[#199A8E]' : 'bg-gray-400'
                }`}
                disabled={!isValid || !dirty || isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Continue'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
