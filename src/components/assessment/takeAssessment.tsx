"use client"
import { useFormikContext } from "formik"
import { StarIcon } from "lucide-react"

interface TakeAssessmentProps {
  onAssessmentChange?: (values: any) => void
}

export function TakeAssessment({ onAssessmentChange }: TakeAssessmentProps) {
  const { values, errors, setFieldValue, validateField, submitCount } = useFormikContext<{
    severity: number | null
    exercise: number | null
  }>()

  const handleSeveritySelect = (index: number) => {
    setFieldValue("severity", index)
    validateField("severity")
    if (onAssessmentChange) {
      onAssessmentChange({ severity: index, exercise: values.exercise })
    }
  }

  const handleStarPress = (rating: number) => {
    setFieldValue("exercise", rating)
    validateField("exercise")
    if (onAssessmentChange) {
      onAssessmentChange({ severity: values.severity, exercise: rating })
    }
  }

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Severity Assessment */}
      <div data-testid="severity-section" className="bg-gray-100 rounded-xl p-3 pb-4 mb-5">
        <p className="text-sm text-gray-900 mb-8">
          今日の身体集中反復行動（皮膚むしり、爪噛み、抜毛、その他）の重症度はどれくらいですか？0~5点の範囲で評価してください。
        </p>
        <div className="relative mb-3">
          <div className="h-6 rounded-lg bg-gradient-to-r from-[#1D963F] via-[#FF7100] to-[#FF0000] px-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white">軽度</span>
              <span className="text-xs text-white">重度</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className={`text-sm ${values.severity === index ? "text-[#199A8E] font-medium" : "text-black"}`}>
                {index}
              </span>
              <div
                data-testid={`severity-${index}`}
                onClick={() => handleSeveritySelect(index)}
                className="relative flex items-center justify-center mt-1 cursor-pointer"
              >
                <div
                  className={`w-5 h-5 rounded-full border ${
                    errors.severity && submitCount > 0
                      ? "border-red-500"
                      : values.severity === index
                        ? "border-[#199A8E]"
                        : "border-gray-400"
                  }`}
                >
                  {values.severity === index && (
                    <div className="w-3 h-3 rounded-full bg-[#199A8E] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {submitCount > 0 && errors.severity && (
          <p data-testid="severity-error" className="text-red-500 text-xs mt-1">
            {String(errors.severity)}
          </p>
        )}
      </div>

      {/* Exercise Rating */}
      <div data-testid="exercise-section" className="bg-gray-100 rounded-xl p-3 pb-6 mb-5">
        <p className="text-sm text-gray-900 mb-4">今日、エクササイズにどの程度取り組めましたか？</p>
        <div className="relative">
          <div className="h-6 rounded-lg bg-gradient-to-r from-[#FF0000] via-[#FF7100] to-[#1D963F] px-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white">全くできなかった</span>
              <span className="text-xs text-white">目標通りできた</span>
            </div>
          </div>
        </div>
        <div className="flex border border-gray-400 rounded-lg mt-3 overflow-hidden">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              data-testid={`exercise-${index}`}
              onClick={() => handleStarPress(index)}
              className={`flex items-center justify-center py-1 flex-1 cursor-pointer ${
                values.exercise === index ? "bg-[#199A8E] text-white" : "bg-white"
              } ${index !== 0 ? "border-l border-gray-400" : ""}`}
            >
              <span className={`mr-1 text-sm ${values.exercise === index ? "text-white" : "text-gray-900"}`}>
                {index}
              </span>
              {index === 0 ? (
                <StarIcon
                  className={`w-4 h-4 ${values.exercise === index ? "text-yellow-400" : "text-gray-300"}`}
                  fill={values.exercise === index ? "#FFD700" : "none"}
                />
              ) : (
                [...Array(index + 1)].map((_, starIndex) => (
                  <StarIcon
                    key={starIndex}
                    className={`w-4 h-4 ${values.exercise === index ? "text-yellow-400" : "text-amber-500"}`}
                    fill={values.exercise === index || starIndex < index ? "#FFD700" : "none"}
                  />
                ))
              )}
            </div>
          ))}
        </div>
        {submitCount > 0 && errors.exercise && (
          <p data-testid="exercise-error" className="text-red-500 text-xs mt-1">
            {String(errors.exercise)}
          </p>
        )}
      </div>
    </div>
  )
}

