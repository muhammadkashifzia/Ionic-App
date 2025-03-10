import React, { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAddAssessment } from "../hooks/useAssessments";
import { Preferences } from "@capacitor/preferences";

// Validation Schema
const AssessmentSchema = Yup.object().shape({
  severityRating: Yup.number()
    .required("Severity rating is required")
    .min(0, "Severity rating must be at least 0")
    .max(5, "Severity rating cannot exceed 5"),
  exerciseRating: Yup.number()
    .required("Exercise rating is required")
    .min(0, "Exercise rating must be at least 0")
    .max(3, "Exercise rating cannot exceed 3"),
  textInput: Yup.string().max(150, "Text input must be 150 characters or less"),
  selectedImage: Yup.string()
    .nullable()
    .test("fileSize", "Image is too large", (value) => {
      if (!value) return true;
      const estimatedSizeInBytes = (value.length * 3) / 4;
      return estimatedSizeInBytes <= 5 * 1024 * 1024; // 5MB limit
    }),
});

function AssessmentPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionTime, setSubmissionTime] = useState<Date | null>(null);

  const addAssessment = useAddAssessment();

  const handleImageUpload = async (setFieldValue: any) => {
    try {
      const photo = await Camera.getPhoto({
        source: CameraSource.Photos,
        resultType: CameraResultType.Base64,
      });

      const imageUrl: string = `data:image/jpeg;base64,${
        photo.base64String as string
      }`;
      setSelectedImage(imageUrl);
      setFieldValue("selectedImage", imageUrl);
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      const photo = values.selectedImage
        ? {
            base64: values.selectedImage,
            mimeType: "image/jpeg",
            fileName: `assessment_${Date.now()}.jpg`,
          }
        : null;

      const payload = {
        user: "679a0c79d16fba5199e15bdf",
        message: values.textInput,
        starRating: values.exerciseRating,
        pointRating: values.severityRating,
        nailPhoto: photo,
      };

      const response = await addAssessment.mutateAsync(payload);

      if (response) {
        setIsSubmitted(true);
        const now = new Date();
        setSubmissionTime(now);

        await Preferences.set({
          key: "submissionTime",
          value: JSON.stringify(now),
        });

        alert("Assessment submitted successfully!");
        resetForm();
        setSelectedImage(null);
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("Failed to submit assessment");
    }
  };
  return (
    <Formik
      initialValues={{
        severityRating: null,
        exerciseRating: 1,
        textInput: "",
        selectedImage: null,
      }}
      validationSchema={AssessmentSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col h-full bg-white p-3 overflow-y-auto">
          <div className="flex items-center mb-[20px]">
            <h1 className="text-[20px] text-[#111827] font-normal text-center flex-grow">
              評価入力
            </h1>
          </div>

          <div className="overflow-y-auto h-full">
            <div className="bg-gray-100 rounded-[4px] p-3 mb-[20px]">
              <h2 className="text-[14px] font-normal text-gray-800 mb-4">
                今日の身体集中反復行動（皮膚むしり、爪噛み、抜毛、その他）の重症度はどれくらいですか？0~10点の範囲で評価してください。
              </h2>

              <div
                className="relative h-[18px] rounded-full mb-4 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(to right, #1D963F, #FF7100, #FF0000)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-between px-2 text-white text-[10px] font-normal">
                  <span>軽度</span>
                  <span>重度</span>
                </div>
              </div>

              <div className="flex justify-between mt-2">
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center">
                    <span className="mb-2">{value}</span>
                    <button
                      type="button"
                      className={`w-[14px] h-[14px] rounded-full border-[1px] border-[#199A8E] flex items-center justify-center ${
                        values.severityRating === value
                          ? "bg-teal-custom border-teal-[#199A8E]"
                          : "bg-white"
                      }`}
                      onClick={() => setFieldValue("severityRating", value)}
                    >
                      {values.severityRating === value && (
                        <div className="w-[10px] h-[10px] rounded-full bg-[#199A8E]"></div>
                      )}
                    </button>
                  </div>
                ))}
              </div>
              <ErrorMessage
                name="severityRating"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            <div className="bg-gray-100 rounded-lg p-2 mb-6">
              <h2 className="text-[14px] font-normal text-[#111827] mb-4">
                今日、エクササイズにどの程度取り組めましたか？
              </h2>

              <div
                className="relative h-[18px] rounded-full mb-4 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(to right, #FF0000, #FF7100, #1D963F)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-between px-2 text-[10px] text-white font-medium">
                  <span>全くできなかった</span>
                  <span>目標通りできた</span>
                </div>
              </div>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                {[0, 1, 2, 3].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`flex-1 py-1 px-3 flex items-center justify-center gap-2 ${
                      values.exerciseRating === value
                        ? "bg-[#199A8E] text-white"
                        : "bg-white"
                    }`}
                    onClick={() => setFieldValue("exerciseRating", value)}
                  >
                    <span>{value}</span>
                    {value === 0 && (
                      <svg
                        width="17"
                        height="18"
                        viewBox="0 0 17 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                      >
                        <path
                          d="M8.5 2.11804L9.93284 6.52786L10.0451 6.87336H10.4084L15.0451 6.87336L11.2939 9.59878L11 9.81231L11.1123 10.1578L12.5451 14.5676L8.79389 11.8422L8.5 11.6287L8.20611 11.8422L4.45488 14.5676L5.88772 10.1578L5.99998 9.81231L5.70609 9.59878L1.95486 6.87336L6.59163 6.87336L6.9549 6.87336L7.06716 6.52786L8.5 2.11804Z"
                          stroke="#BDBDBD"
                        />
                      </svg>
                    )}
                    {value === 1 && (
                      <svg
                        width="17"
                        height="18"
                        viewBox="0 0 17 18"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.5 2.11804L9.93284 6.52786L10.0451 6.87336H10.4084L15.0451 6.87336L11.2939 9.59878L11 9.81231L11.1123 10.1578L12.5451 14.5676L8.79389 11.8422L8.5 11.6287L8.20611 11.8422L4.45488 14.5676L5.88772 10.1578L5.99998 9.81231L5.70609 9.59878L1.95486 6.87336L6.59163 6.87336L6.9549 6.87336L7.06716 6.52786L8.5 2.11804Z"
                          fill="#FFD048"
                          stroke="#FFBE00"
                        />
                      </svg>
                    )}
                    {value > 1 && (
                      <div className="flex">
                        {[...Array(value)].map((_, i) => (
                          <svg
                            key={i}
                            width="17"
                            height="18"
                            viewBox="0 0 17 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.5 2.11804L9.93284 6.52786L10.0451 6.87336H10.4084L15.0451 6.87336L11.2939 9.59878L11 9.81231L11.1123 10.1578L12.5451 14.5676L8.79389 11.8422L8.5 11.6287L8.20611 11.8422L4.45488 14.5676L5.88772 10.1578L5.99998 9.81231L5.70609 9.59878L1.95486 6.87336L6.59163 6.87336L6.9549 6.87336L7.06716 6.52786L8.5 2.11804Z"
                              stroke="#FFBE00"
                            />
                          </svg>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <ErrorMessage
                name="exerciseRating"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            <div className="bg-gray-100 rounded-lg p-3 mb-6">
              <h2 className="text-[14px] font-normal text-[#111827] mb-4">
                今日の爪、髪の毛、皮膚等の状態の画像を
                <br />
                アップロードして記録してみましょう。（任意）
              </h2>

              <label htmlFor="image-upload" className="block w-full">
                <div
                  className="bg-teal-600 text-white py-2 px-4 rounded-lg flex items-center justify-center cursor-pointer text-[12px] flex gap-[10px]"
                  onClick={() => handleImageUpload(setFieldValue)}
                >
                  <svg
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3332 7.40705C13.3323 8.26432 13.3258 8.99296 13.2771 9.59082C13.2206 10.2846 13.1047 10.8644 12.8454 11.3458C12.7311 11.5582 12.5906 11.7484 12.4195 11.9195C11.9339 12.405 11.3153 12.625 10.5313 12.7304C9.76537 12.8333 8.78374 12.8333 7.53115 12.8333H7.46885C6.21625 12.8333 5.2346 12.8333 4.46868 12.7304C3.68471 12.625 3.06609 12.405 2.58054 11.9195C2.15008 11.489 1.92778 10.9533 1.80957 10.2886C1.69345 9.63574 1.6722 8.82344 1.66778 7.81474C1.66666 7.55819 1.66666 7.28683 1.66666 7.00053V6.96885C1.66666 5.71626 1.66665 4.7346 1.76963 3.96868C1.87503 3.18472 2.09498 2.5661 2.58054 2.08054C3.06609 1.59499 3.68471 1.37504 4.46868 1.26963C5.14981 1.17806 6.02618 1.16792 7.09283 1.16681C7.31759 1.16657 7.5 1.34888 7.5 1.57364C7.5 1.79841 7.31753 1.98054 7.09277 1.98078C6.01103 1.98192 5.20604 1.99177 4.57713 2.07633C3.88342 2.16959 3.4652 2.34698 3.15609 2.65609C2.84697 2.96521 2.66959 3.38343 2.57632 4.07713C2.48148 4.78255 2.48062 5.70949 2.48062 7C2.48062 7.15762 2.48062 7.30999 2.4808 7.45757L3.02406 6.98227C3.51854 6.54955 4.26381 6.5744 4.72842 7.03897L7.0562 9.36676C7.42912 9.73969 8.01613 9.79049 8.44762 9.48728L8.60944 9.37353C9.23034 8.93719 10.0704 8.98777 10.6345 9.49544L12.1704 10.8778C12.325 10.5531 12.4168 10.1265 12.4658 9.52473C12.512 8.95773 12.5184 8.26904 12.5192 7.40711C12.5195 7.18235 12.7016 7 12.9263 7C13.1511 7 13.3334 7.18229 13.3332 7.40705Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.7083 1.16669C9.47091 1.16669 8.85217 1.16669 8.46775 1.55111C8.08334 1.93553 8.08334 2.55425 8.08334 3.79169C8.08334 5.02912 8.08334 5.64784 8.46775 6.03227C8.85217 6.41669 9.47091 6.41669 10.7083 6.41669C11.9458 6.41669 12.5645 6.41669 12.9489 6.03227C13.3333 5.64784 13.3333 5.02912 13.3333 3.79169C13.3333 2.55425 13.3333 1.93553 12.9489 1.55111C12.5645 1.16669 11.9458 1.16669 10.7083 1.16669ZM11.8927 4.39271L11.0177 5.26771C10.8468 5.43857 10.5699 5.43857 10.399 5.26771L9.52399 4.39271C9.35314 4.22186 9.35314 3.94485 9.52399 3.77399C9.69485 3.60314 9.97182 3.60314 10.1427 3.77399L10.2708 3.90214V2.62502C10.2708 2.3834 10.4667 2.18752 10.7083 2.18752C10.95 2.18752 11.1458 2.3834 11.1458 2.62502V3.90214L11.274 3.77399C11.4449 3.60314 11.7218 3.60314 11.8927 3.77399C12.0635 3.94485 12.0635 4.22186 11.8927 4.39271Z"
                      fill="white"
                    />
                  </svg>
                  ギャラリーからアップロード
                </div>
              </label>
              <ErrorMessage
                name="selectedImage"
                component="div"
                className="text-red-500 text-sm mt-2"
              />

              {selectedImage && (
                <div className="mt-4">
                  <img
                    src={selectedImage}
                    alt="Uploaded preview"
                    className="w-full rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="mb-[20px]">
              <h2 className="text-[14px] font-normal mb-[5px]">
                フリーテキスト (150文字以内)
              </h2>
              <Field
                as="textarea"
                name="textInput"
                className="w-full border border-gray-300 rounded-lg p-4 resize-none"
                rows="5"
                placeholder="本日の症状などの感想を任意で150文字以内でご記入ください。"
              />
              <p className="text-gray-700 text-[14px] font-normal mt-[8px]">
                現在の文字数: {values.textInput.length}/150
              </p>
              <ErrorMessage
                name="textInput"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-100 text-green-800 text-[12px] font-normal py-2 rounded-lg mb-6 flex justify-center items-center gap-2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.77">
                  <path
                    d="M3.6875 4V18C3.6875 18.5304 3.89821 19.0391 4.27329 19.4142C4.64836 19.7893 5.15707 20 5.6875 20H19.6875C20.2179 20 20.7266 19.7893 21.1017 19.4142C21.4768 19.0391 21.6875 18.5304 21.6875 18V8H17.6875"
                    stroke="#101010"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3.6875 4H17.6875V18C17.6875 18.5304 17.8982 19.0391 18.2733 19.4142C18.6484 19.7893 19.1571 20 19.6875 20M13.6875 8H7.6875M13.6875 12H9.6875"
                    stroke="#101010"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
              | 記録する
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AssessmentPage;
