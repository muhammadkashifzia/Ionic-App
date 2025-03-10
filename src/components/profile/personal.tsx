

"use client"

import { useEffect, useState } from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import { useUpdateUser, useGetUserById } from "../../hooks/useUser"
import ProfileShimmer from "../../shimmers/ProfileShimmer"
import FormField from "./FormField"
import CustomDropdown from "./CustomDropdown"
import { personOutline, femaleOutline, female, person } from "ionicons/icons";



interface User {
  id?: string
  name: string
  gender?: string
  age?: string | number
}

const PersonalSchema = Yup.object().shape({
  name: Yup.string().min(2, "name too short").required("name is required"),
  gender: Yup.string().required("Gender is required"),
  age: Yup.string().required("Age is required"),
})

const genderOptions = ["男性", "女性", "その他"]
const ageOptions = [...Array(100)].map((_, i) => (i + 1).toString())

export default function PersonalTab() {
  const updateUserMutation = useUpdateUser()
  const getLoggedInUserMutation = useGetUserById()
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getLoggedInUserMutation.mutateAsync()
        setLoggedInUser(user)
        setIsUserDataLoaded(true)
      } catch (error) {
        console.error("Failed to fetch user data:", error)
        setIsUserDataLoaded(true) // Set to true even on error to hide shimmer
      }
    }

    fetchUserData()
  }, [getLoggedInUserMutation.mutateAsync])

  return (
    <div className="flex flex-col h-full bg-white">
      <Formik
        initialValues={{
          name: loggedInUser?.name ?? "Anonymous",
          gender: loggedInUser?.gender ?? "男性", // Default to "男性"
          age: loggedInUser?.age?.toString() ?? "1", // Default age 1
        }}
        validationSchema={PersonalSchema}
        onSubmit={async (values) => {
          await updateUserMutation.mutateAsync(values)
        }}
        enableReinitialize // Ensures values are updated when user data is available
      >
        {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
          <div className="flex flex-col">
            {!isUserDataLoaded ? (
              <ProfileShimmer isLast={false} />
            ) : (
              <>
                <FormField
                  label="ニックネーム"
                  placeholder="佐藤 洋子"
                  value={values.name}
                  onChangeText={(value: string) => setFieldValue("name", value)}
                  icon={personOutline}
                  error={errors.name}
                  touched={touched.name}
                />

                <CustomDropdown
                  label="性別"
                  value={values.gender}
                  onSelect={(value: string) => setFieldValue("gender", value)}
                  options={genderOptions}
                  error={errors.gender}
                  touched={touched.gender}
                  placeholder="性別"
                  icon={female}
                  iconFilled={female}
                />

                <CustomDropdown
                  label="年齢"
                  value={values.age}
                  onSelect={(value: string) => setFieldValue("age", value)}
                  options={ageOptions}
                  error={errors.age}
                  touched={touched.age}
                  placeholder="年齢"
                  icon={femaleOutline}
                  iconFilled={person}
                />
              </>
            )}

            <button
              onClick={() => handleSubmit()}
              className="flex items-center justify-center gap-1 bg-[#199A8E] text-white py-2 px-3 rounded-md w-36 ml-auto mt-auto"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="white" />
              </svg>
              <span className="text-sm font-normal">保存</span>
            </button>
          </div>
        )}
      </Formik>
    </div>
  )
}

