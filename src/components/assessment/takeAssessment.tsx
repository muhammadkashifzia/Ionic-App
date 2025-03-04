import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const TakeAssessment: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      severity: -1,
      exercise: -1,
    },
    validationSchema: Yup.object({
      severity: Yup.number().min(0, "Select a severity").required("Required"),
      exercise: Yup.number()
        .min(0, "Select an exercise rating")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      {/* Severity Assessment */}
      <div className="bg-gray-100 rounded-lg p-4 mb-5">
        <p className="text-sm text-gray-900 mb-3">
          今日の身体集中反復行動（皮膚むしり、爪噛み、抜毛、その他）の重症度はどれくらいですか？0~5点の範囲で評価してください。
        </p>
        <div className="relative">
          <div className="w-full h-[18px] bg-gradient-to-r from-green-600 via-orange-500 to-red-600 rounded-[12px] mb-3 px-2"></div>
          <div className="absolute top-[50%] transform -translate-y-1/2 left-0  w-full px-2">
            <div className="flex justify-between">
              <span className="text-[12px] text-white">軽度</span>
              <span className="text-[12px] text-white">重度</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-3">
          {[...Array(6)].map((_, index) => (
            <button
              key={index}
              onClick={() => formik.setFieldValue("severity", index)}
              className={`flex flex-col items-center text-sm ${
                formik.values.severity === index
                  ? "text-green-600"
                  : "text-black"
              }`}
            >
              {index}
              <div
                className={`w-5 h-5 rounded-full border ${
                  formik.values.severity === index
                    ? "bg-[#199A8E] border-[#199A8E] p-1"
                    : "border-gray-400"
                }`}
              ></div>
            </button>
          ))}
        </div>
        {formik.touched.severity && formik.errors.severity && (
          <p className="text-red-500 text-xs mt-2">{formik.errors.severity}</p>
        )}
      </div>

      {/* Exercise Rating */}
      <div className="bg-gray-100 rounded-lg p-4">
        <p className="text-sm text-gray-900 mb-3">
          今日、エクササイズにどの程度取り組めましたか？
        </p>
        <div className="relative">
        <div className="w-full h-[18px] bg-gradient-to-r from-red-600 via-orange-500 to-green-600 rounded-[12px] mb-3"></div>
        <div className="flex justify-between absolute top-[50%] transform -translate-y-1/2 left-0 w-full px-2">
          <span className="text-[12px] text-white">全くできなかった</span>
          <span className="text-[12px] text-white">目標通りできた</span>
        </div>
        </div>
        <div className="flex border border-gray-400 rounded-lg overflow-hidden mt-3">
          {[...Array(4)].map((_, index) => (
            <button
              key={index}
              onClick={() => formik.setFieldValue("exercise", index)}
              className={`flex flex-1 justify-center items-center py-2 border-l border-gray-400 mb-0 ${
                formik.values.exercise === index
                  ? "bg-[#199A8E] text-white"
                  : "bg-white text-black"
              }`}
            >
              {index}
              {index > 0 && (
                <span className="ml-2 text-yellow-500">
                  {"★".repeat(index)}
                </span>
              )}
            </button>
          ))}
        </div>
        {formik.touched.exercise && formik.errors.exercise && (
          <p className="text-red-500 text-xs mt-2">{formik.errors.exercise}</p>
        )}
      </div>
    </div>
  );
};

export default TakeAssessment;
