"use client"

import React, { useState } from "react"
import { MdExpandMore } from "react-icons/md"
import { IonIcon } from "@ionic/react"
interface FormFieldProps {
  label: string
  value: string
  onChangeText?: (text: string) => void
  icon?: string;
  error?: string
  touched?: boolean
  isDropdown?: boolean
  onPress?: () => void
  placeholder?: string
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  icon: Icon,
  error,
  touched,
  isDropdown,
  onPress,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState(value)
  const placeholderColor = touched && error ? "text-red-500" : "text-gray-400"

  // Update local state when prop value changes
  React.useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <div className="mb-5">
      <label className="text-sm text-gray-900 mb-2 block font-normal">{label}</label>
      <div
        className={`flex items-center border rounded-xl px-3 h-12 bg-white ${
          touched && error ? "border-red-500" : "border-gray-300"
        } ${isDropdown ? "cursor-pointer" : ""}`}
        onClick={isDropdown ? onPress : undefined}
      >

   
        {Icon && (
          <IonIcon icon={Icon} className={`text-xl mr-3 ${error ? "text-red-500" : value ? "text-teal-600" : "text-gray-400"}`} />

        )}
        {isDropdown ? (
          <div className="flex-1 flex justify-between items-center">
            <span className={value ? "text-gray-900" : placeholderColor}>{value || placeholder}</span>
            <MdExpandMore className="text-gray-400 text-lg" />
          </div>
        ) : (
          <input
            type="text"
            className="flex-1 text-sm text-gray-900 outline-none h-full"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              onChangeText && onChangeText(e.target.value)
            }}
            placeholder={placeholder}
          />
        )}
      </div>
      {touched && error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  )
}

export default FormField

