import React, { useState } from 'react'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAddAssessment } from '../hooks/useAssessments'
import { Preferences } from '@capacitor/preferences'

// Validation Schema
const AssessmentSchema = Yup.object().shape({
  severityRating: Yup.number()
    .required('Severity rating is required')
    .min(0, 'Severity rating must be at least 0')
    .max(5, 'Severity rating cannot exceed 5'),
  exerciseRating: Yup.number()
    .required('Exercise rating is required')
    .min(0, 'Exercise rating must be at least 0')
    .max(3, 'Exercise rating cannot exceed 3'),
  textInput: Yup.string().max(150, 'Text input must be 150 characters or less'),
  selectedImage: Yup.string()
    .nullable()
    .test('fileSize', 'Image is too large', (value) => {
      if (!value) return true
      const estimatedSizeInBytes = (value.length * 3) / 4
      return estimatedSizeInBytes <= 5 * 1024 * 1024 // 5MB limit
    }),
})

function AssessmentPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionTime, setSubmissionTime] = useState<Date | null>(null)

  const addAssessment = useAddAssessment() // Initialize the mutation hook

  const handleImageUpload = async (setFieldValue: any) => {
    try {
      const photo = await Camera.getPhoto({
        source: CameraSource.Photos,
        resultType: CameraResultType.Base64,
      })

      const imageUrl: string = `data:image/jpeg;base64,${photo.base64String as string}`;
      setSelectedImage(imageUrl)
      setFieldValue('selectedImage', imageUrl)
    } catch (error) {
      console.error('Error picking image:', error)
    }
  }

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      const photo = values.selectedImage
        ? {
            base64: values.selectedImage, // Base64 image string
            mimeType: 'image/jpeg', // Assuming JPEG; update if necessary
            fileName: `assessment_${Date.now()}.jpg`, // Generate a unique file name
          }
        : null

      const payload = {
        user: '679a0c79d16fba5199e15bdf', // Replace with dynamic user ID if available
        message: values.textInput, // Feedback text
        starRating: values.exerciseRating, // Exercise rating
        pointRating: values.severityRating, // Severity rating
        nailPhoto: photo, // Image object or null if no image
      }

      // Trigger the mutation
      const response = await addAssessment.mutateAsync(payload)

      if (response) {
        setIsSubmitted(true) // Mark form as submitted
        const now = new Date()
        setSubmissionTime(now) // Store submission time in state

        // Save timestamp using Capacitor Preferences
        await Preferences.set({
          key: 'submissionTime',
          value: JSON.stringify(now),
        })

        alert('Assessment submitted successfully!')
        resetForm() // Reset form fields
        setSelectedImage(null) // Clear image preview
      }
    } catch (error) {
      console.error('Error submitting assessment:', error)
      alert('Failed to submit assessment')
    }
  }
  return (
    <Formik
      initialValues={{
        severityRating: null,
        exerciseRating: 1,
        textInput: '',
        selectedImage: null,
      }}
      validationSchema={AssessmentSchema}
      onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form className='flex flex-col h-full bg-white p-3 overflow-y-auto'>
          {/* Header with back button */}
          <div className='flex items-center mb-6'>
            <button type='button' className='mr-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
              </svg>
            </button>
            <h1 className='text-2xl font-bold text-center flex-grow pr-6'>Assessment</h1>
          </div>

          <div className='overflow-y-auto h-full mb-16'>
            {/* Severity Rating Section */}
            <div className='bg-gray-100 rounded-lg p-3 mb-6'>
              <h2 className='text-[14px] font-normal text-gray-800 mb-4'>
                What is the severity of today's physically focused repetitive behaviors (skin plucking, nail biting,
                hair pulling, etc.)?
              </h2>
              <p className='mb-4 text-[14px] font-normal text-gray-800'>Please rate on a scale from 0 to 5.</p>

              {/* Gradient bar */}
              <div
                className='relative h-6 rounded-full mb-4 overflow-hidden'
                style={{ background: 'linear-gradient(to right, #1D963F, #FF7100, #FF0000)' }}>
                <div className='absolute inset-0 flex items-center justify-between px-2 text-white text-[10px] font-normal'>
                  <span>Very Little</span>
                  <span>Very Severe</span>
                </div>
              </div>

              {/* Rating buttons */}
              <div className='flex justify-between mt-2'>
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className='flex flex-col items-center'>
                    <span className='mb-2'>{value}</span>
                    <button
                      type='button'
                      className={`w-6 h-6 rounded-full border-2 border-teal-custom flex items-center justify-center ${
                        values.severityRating === value ? 'bg-teal-custom border-teal-[#199A8E]' : 'bg-white'
                      }`}
                      onClick={() => setFieldValue('severityRating', value)}>
                      {values.severityRating === value && <div className='w-4 h-4 rounded-full bg-[#199A8E]'></div>}
                    </button>
                  </div>
                ))}
              </div>
              <ErrorMessage name='severityRating' component='div' className='text-red-500 text-sm mt-2' />
            </div>

            {/* Exercise Rating Section */}
            <div className='bg-gray-100 rounded-lg p-2 mb-6'>
              <h2 className='text-[14px] font-medium text-gray-800 mb-4'>Please rate your Today's Exercise</h2>

              {/* Gradient bar */}
              <div
                className='relative h-6 rounded-full mb-4 overflow-hidden'
                style={{ background: 'linear-gradient(to right, #FF0000, #FF7100, #1D963F)' }}>
                <div className='absolute inset-0 flex items-center justify-between px-2 text-[10px] text-white font-medium'>
                  <span>Very Bad</span>
                  <span>Good</span>
                </div>
              </div>

              {/* Star rating */}
              <div className='flex border border-gray-300 rounded-lg overflow-hidden'>
                {[0, 1, 2, 3].map((value) => (
                  <button
                    key={value}
                    type='button'
                    className={`flex-1 py-1 px-3 flex items-center justify-center gap-2 ${
                      values.exerciseRating === value ? 'bg-gray-200' : 'bg-white'
                    }`}
                    onClick={() => setFieldValue('exerciseRating', value)}>
                    <span>{value}</span>
                    {value === 0 && (
                      <svg
                        width='17'
                        height='18'
                        viewBox='0 0 17 18'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        stroke='currentColor'>
                        <path
                          d='M8.5 2.11804L9.93284 6.52786L10.0451 6.87336H10.4084L15.0451 6.87336L11.2939 9.59878L11 9.81231L11.1123 10.1578L12.5451 14.5676L8.79389 11.8422L8.5 11.6287L8.20611 11.8422L4.45488 14.5676L5.88772 10.1578L5.99998 9.81231L5.70609 9.59878L1.95486 6.87336L6.59163 6.87336L6.9549 6.87336L7.06716 6.52786L8.5 2.11804Z'
                          stroke='#BDBDBD'
                        />
                      </svg>
                    )}
                    {value === 1 && (
                      <svg
                        width='17'
                        height='18'
                        viewBox='0 0 17 18'
                        fill='currentColor'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M8.5 2.11804L9.93284 6.52786L10.0451 6.87336H10.4084L15.0451 6.87336L11.2939 9.59878L11 9.81231L11.1123 10.1578L12.5451 14.5676L8.79389 11.8422L8.5 11.6287L8.20611 11.8422L4.45488 14.5676L5.88772 10.1578L5.99998 9.81231L5.70609 9.59878L1.95486 6.87336L6.59163 6.87336L6.9549 6.87336L7.06716 6.52786L8.5 2.11804Z'
                          fill='#FFD048'
                          stroke='#FFBE00'
                        />
                      </svg>
                    )}
                    {value > 1 && (
                      <div className='flex'>
                        {[...Array(value)].map((_, i) => (
                          <svg
                            key={i}
                            width='17'
                            height='18'
                            viewBox='0 0 17 18'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                              d='M8.5 2.11804L9.93284 6.52786L10.0451 6.87336H10.4084L15.0451 6.87336L11.2939 9.59878L11 9.81231L11.1123 10.1578L12.5451 14.5676L8.79389 11.8422L8.5 11.6287L8.20611 11.8422L4.45488 14.5676L5.88772 10.1578L5.99998 9.81231L5.70609 9.59878L1.95486 6.87336L6.59163 6.87336L6.9549 6.87336L7.06716 6.52786L8.5 2.11804Z'
                              stroke='#FFBE00'
                            />
                          </svg>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <ErrorMessage name='exerciseRating' component='div' className='text-red-500 text-sm mt-2' />
            </div>

            {/* Image Upload Section */}
            <div className='bg-gray-100 rounded-lg p-3 mb-6'>
              <h2 className='text-[14px] font-normal text-gray-800 mb-4'>
                Please upload the image of your Today's Progress
              </h2>

              {/* Upload button */}
              <label htmlFor='image-upload' className='block w-full'>
                <div
                  className='bg-teal-600 text-white py-2 px-4 rounded-lg flex items-center justify-center cursor-pointer'
                  onClick={() => handleImageUpload(setFieldValue)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 mr-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                  Upload from Gallery
                </div>
              </label>
              <ErrorMessage name='selectedImage' component='div' className='text-red-500 text-sm mt-2' />

              {/* Preview uploaded image if any */}
              {selectedImage && (
                <div className='mt-4'>
                  <img src={selectedImage} alt='Uploaded preview' className='w-full rounded-lg' />
                </div>
              )}
            </div>

            {/* Text Input Section */}
            <div className='mb-6'>
              <h2 className='text-[14px] font-normal mb-2'>フリーテキスト (150文字以内)</h2>
              <Field
                as='textarea'
                name='textInput'
                className='w-full border border-gray-300 rounded-lg p-4 resize-none'
                rows='5'
                placeholder='本日の症状などの感想を任意で150文字以内でご記入ください。'
              />
              <p className='text-gray-700 text-[14px] font-normal mt-2'>現在の文字数: {values.textInput.length}/150</p>
              <ErrorMessage name='textInput' component='div' className='text-red-500 text-sm mt-2' />
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full bg-green-100 text-green-800 text-[12px] font-normal py-2 rounded-lg mb-6'>
              Submit Assessment
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default AssessmentPage