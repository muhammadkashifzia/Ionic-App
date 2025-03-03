import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface MyFieldProps {
  label: string;
  testID?: string;
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
  onBlur?: () => void;
  icon?: JSX.Element;
  secureTextEntry?: boolean;
  error?: string;
  touched?: boolean;
  keyboardType?: "text" | "email" | "password" | "number";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

const MyField: React.FC<MyFieldProps> = ({
  label,
  testID,
  placeholder,
  value,
  onChange,
  onBlur,
  icon,
  secureTextEntry = false,
  error,
  touched,
  keyboardType = "text",
  autoCapitalize = "none",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div data-testid={testID} style={{ display: "flex", flexDirection: "column" }}>
      <label style={{ fontSize: 14, fontWeight: "bold", marginBottom: 8 }}>{label}</label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: `1px solid ${error && touched ? "red" : "#ddd"}`,
          borderRadius: 8,
          padding: "8px 12px",
          backgroundColor: "#fff",
          gap: "12px",
        }}
      >
        {icon}
        <input
          type={secureTextEntry && !showPassword ? "password" : keyboardType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          style={{
            flex: 1,
            fontSize: 16,
            border: "none",
            outline: "none",
            color: "#333",
          }}
          autoCapitalize={autoCapitalize}
        />
        {secureTextEntry && (
          <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {touched && error && <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>{error}</p>}
    </div>
  );
};

export default MyField;
