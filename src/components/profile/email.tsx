"use client"

import { useState, useEffect } from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import { IonContent, IonPage, IonIcon } from "@ionic/react"
import { mailOutline, checkmarkDoneOutline } from "ionicons/icons"
import MyField from "../shared/MyField"
import OtpInput from "../auth/OtpInput"
import CountdownTimer from "../auth/CountdownTimer"
import { useChangeEmail, useVerifyEmail } from "../../hooks/useUser"

// Define types
interface EmailFormValues {
  email: string
}

interface OtpFormValues {
  otp: string
}

interface User {
  user?: {
    email: string
  }
}

const EmailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
})

const OtpSchema = Yup.object().shape({
  otp: Yup.string().required("OTP is required"),
})

export default function EmailTab() {
  const [showOtpScreen, setShowOtpScreen] = useState<boolean>(false)
  const [emailValue, setEmailValue] = useState<string>("")
  const [canResend, setCanResend] = useState<boolean>(false)
  const changeEmailMutation = useChangeEmail()
  const verifyEmailMutation = useVerifyEmail()
  const [userEmail, setUserEmail] = useState<string>("")

  const handleResend = () => {
    setCanResend(false)
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userLocal = localStorage.getItem("userValue")
        if (userLocal) {
          const parsedUser: User = JSON.parse(userLocal)
          if (parsedUser.user?.email) {
            setUserEmail(parsedUser.user.email)
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUser()
  }, [])

  const EmailScreen = () => (
    <Formik<EmailFormValues>
      initialValues={{ email: "" }}
      validationSchema={EmailSchema}
      onSubmit={(values) => {
        changeEmailMutation.mutate({
          email: userEmail, 
          newEmail: values.email, 
        })
        setEmailValue(values.email)
        setShowOtpScreen(true)
      }}
    >
      {({ handleChange, handleSubmit, values, errors, touched, setTouched }) => (
        <div className="flex flex-col h-full ">
          <div>
            <MyField
              label="メール"
              placeholder="example@gmail.com"
              value={values.email}
              onChange={handleChange("email")}
              onBlur={() => setTouched({ ...touched, email: true })}

              error={errors.email}
              touched={touched.email}
              keyboardType="email"
              autoCapitalize="none"
            />
            <button
              onClick={() => handleSubmit()}
              className="flex items-center justify-center gap-1 px-3 py-2  text-white rounded-md bg-[#199A8E] w-36 self-end mt-4"
              type="button"
            >
              <IonIcon icon={checkmarkDoneOutline} />
              <span className="text-sm font-normal">保存</span>
            </button>
          </div>
        </div>
      )}
    </Formik>
  )

  const OtpScreen = () => (
    <Formik<OtpFormValues>
      initialValues={{ otp: "" }}
      validationSchema={OtpSchema}
      onSubmit={(values) => {
        const data = {
          email: userEmail,
          newEmail: emailValue,
          otp: values.otp,
        }
        verifyEmailMutation.mutate(data)
      }}
    >
      {({ handleSubmit, values, errors, touched, setFieldValue }) => (
        <div className="flex flex-col h-full ">
          <div className="flex flex-col justify-end">
            <MyField label="Email" value={emailValue} editable={false} />
            <h2 className="mt-6 mb-2 text-2xl font-normal text-black">コードを確認</h2>
            <p className="mb-6 text-base font-normal text-black opacity-80 leading-5">
              {emailValue} に送信したコードを入力してください。
            </p>
            <div className="flex flex-col items-center w-full">
              <OtpInput
                length={5}
                value={values.otp}
                onChange={(value: string) => setFieldValue("otp", value)}
                hasError={!!(errors.otp && touched.otp)}
                colorBlack={true}
              />
              {errors.otp && touched.otp && <p className="mt-3 text-sm font-normal text-red-500">{errors.otp}</p>}
              <div className="mt-6 mb-3">
                {!canResend && (
                  <CountdownTimer initialSeconds={48} onComplete={() => setCanResend(true)} colorBlack={true} />
                )}
              </div>
              {canResend && (
                <div className="flex flex-row justify-center mb-5">
                  <span className="text-sm font-normal text-black">コードがまだ届いていません。</span>
                  <button onClick={handleResend} className="text-sm font-light text-black underline" type="button">
                    コードを再送
                  </button>
                  <span className="text-sm font-normal text-black">してください。</span>
                </div>
              )}
            </div>
            <button
              onClick={() => handleSubmit()}
              className="flex items-center justify-center gap-1 px-3 py-2  text-white rounded-md bg-emerald-600 w-36 self-end mt-4"
              type="button"
            >
              <IonIcon icon={checkmarkDoneOutline} />
              <span className="text-sm font-normal">保存</span>
            </button>
          </div>
        </div>
      )}
    </Formik>
  )

  return (
    <div>
      <div className="ion-padding">
        <div className="h-full">{showOtpScreen ? <OtpScreen /> : <EmailScreen />}</div>
      </div>
    </div>
  )
}

