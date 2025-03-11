"use client"

import { useRef, useState, type KeyboardEvent, type ClipboardEvent, type ChangeEvent } from "react"

interface OtpInputProps {
  testID?: string
  length: number
  value: string
  onChange: (value: string) => void
  hasError?: boolean
  colorBlack?: boolean
}

export default function OtpInput({
  testID,
  length,
  value,
  onChange,
  hasError = false,
  colorBlack = false,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [focusedIndex, setFocusedIndex] = useState<number>(0)

  const handleChange = (text: string, index: number) => {
    if (text?.length > 1) {
      // If a full OTP or more than one character is pasted
      const newValue = value.split("")
      text
        .slice(0, length - index)
        .split("")
        .forEach((char, i) => {
          if (index + i < length) {
            newValue[index + i] = char
          }
        })
      onChange(newValue.join(""))

      // Focus the next input after the last pasted character
      const nextIndex = Math.min(index + text?.length - 1, length - 1)
      inputRefs.current[nextIndex]?.focus()
    } else {
      // Handle individual character input
      const newValue = value.split("")
      newValue[index] = text
      onChange(newValue.join(""))

      if (text?.length > 0 && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === "Backspace") {
      const newValue = value.split("")
      if (newValue[index]) {
        newValue[index] = ""
        onChange(newValue.join(""))
      } else if (index > 0) {
        // If the current input is empty, shift focus to the previous input
        inputRefs.current[index - 1]?.focus()
        newValue[index - 1] = "" // Remove the value from the previous index
        onChange(newValue.join(""))
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (event.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>, index: number) => {
    event.preventDefault()
    const pastedData = event.clipboardData.getData("text")
    // Filter out non-numeric characters
    const numericData = pastedData.replace(/\D/g, "")
    handleChange(numericData, index)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    // Only allow numeric input
    const numericValue = event.target.value.replace(/\D/g, "")
    handleChange(numericValue, index)
  }

  const handleFocus = (index: number) => {
    setFocusedIndex(index)
  }

  return (
    <div className="flex flex-row justify-center gap-3.5" data-testid={testID}>
      {[...Array(length)].map((_, index) => (
        <input
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref
          }}
          className={`
            w-full h-full max-w-[14.5%] min-h-[71px]
            border rounded-xl text-center
            text-2xl font-normal
            bg-opacity-10 bg-gray-400
            focus:outline-none
            ${focusedIndex === index ? "border-2 bg-white bg-opacity-20" : "border"}
            ${hasError ? "border-red-500" : "border-[#147B72]"}
            ${colorBlack ? "text-[#147B72]" : "text-white"}
          `}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          onFocus={() => handleFocus(index)}
          style={{ fontFamily: "ABeeZee-Regular" }}
        />
      ))}
    </div>
  )
}

export { OtpInput }

