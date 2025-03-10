import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, Lock } from "lucide-react";
import { usePasswordChange } from '../../hooks/useUser';

const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

const PasswordTab: React.FC = () => {
  const passwordChangeMutation = usePasswordChange();
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field: keyof typeof passwordVisibility) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <div className=" w-full">
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={PasswordSchema}
        onSubmit={values => {
          const data = {
            password: values.currentPassword,
            newPassword: values.newPassword
          };
          passwordChangeMutation.mutate(data);
        }}
      >
       {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setTouched
        }) => (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className={`flex items-center border rounded-lg px-3 py-2 ${touched.currentPassword && errors.currentPassword ? 'border-red-500' : 'border-gray-300'}`}>
              <Lock className="text-gray-400" size={20} />
              <input
                type={passwordVisibility.currentPassword ? "text" : "password"}
                className="flex-1 px-3 py-2 outline-none"
                placeholder="Enter current password"
                value={values.currentPassword}
                onChange={handleChange("currentPassword")}
                onBlur={() => setTouched({ ...touched, currentPassword: true })}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("currentPassword")}
              >
                {passwordVisibility.currentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {touched.currentPassword && errors.currentPassword && (
              <p className="text-red-500 text-sm">{errors.currentPassword}</p>
            )}

            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className={`flex items-center border rounded-lg px-3 py-2 ${touched.newPassword && errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}>
              <Lock className="text-gray-400" size={20} />
              <input
                type={passwordVisibility.newPassword ? "text" : "password"}
                className="flex-1 px-3 py-2 outline-none"
                placeholder="Enter new password"
                value={values.newPassword}
                onChange={handleChange("newPassword")}
                onBlur={() => setTouched({ ...touched, newPassword: true })}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("newPassword")}
              >
                {passwordVisibility.newPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {touched.newPassword && errors.newPassword && (
              <p className="text-red-500 text-sm">{errors.newPassword}</p>
            )}

            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className={`flex items-center border rounded-lg px-3 py-2 ${touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}>
              <Lock className="text-gray-400" size={20} />
              <input
                type={passwordVisibility.confirmPassword ? "text" : "password"}
                className="flex-1 px-3 py-2 outline-none"
                placeholder="Confirm new password"
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                onBlur={() => setTouched({ ...touched, confirmPassword: true })}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                {passwordVisibility.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}

            <button
              onClick={() => handleSubmit()}
              type="submit"
              className="w-full bg-teal-500 text-white py-2 rounded-lg font-medium hover:bg-teal-600 transition"
            >
              Save
            </button>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default PasswordTab;
