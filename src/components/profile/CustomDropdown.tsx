import { IonIcon } from "@ionic/react";
import React, { useState } from "react";
import dropdownIconFilled from "../../assets/svgs/dropdown-filled.svg";
import dropdownIcon from "../../assets/svgs/dropdown.svg";
interface CustomDropdownProps {
  label: string;
  value: string;
  onSelect: (item: string) => void;
  options: string[];
  error?: string;
  icon?: string;
  iconFilled?: string;
  touched?: boolean;
  placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  value,
  onSelect,
  options,
  error,
  icon,
  iconFilled,
  touched,
  placeholder,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleSelect = (item: string) => {
    onSelect(item);
    setIsVisible(false);
    setClicked(false);
  };

  const borderColor = error && touched ? "border-red-500" : "border-gray-300";
  const placeholderTextColor = error && touched ? "text-red-500" : "text-gray-400";

  return (
    <div className="mb-5">
      <label className="block text-sm text-gray-900 mb-1">{label}</label>
      <div
        className={`flex items-center justify-between border ${borderColor} rounded-lg p-4 cursor-pointer relative`}
        onClick={() => {
          setIsVisible(!isVisible);
          setClicked(!clicked);
        }}
      >
        <div className="flex items-center gap-3">
          <img src={clicked ? iconFilled : icon} alt="icon" className="w-5 h-5" />
          <span className={`text-gray-900 ${!value ? placeholderTextColor : ""}`}>
            {value || placeholder}
          </span>
        </div>
        <IonIcon
          src={clicked ? dropdownIconFilled : dropdownIcon }
          className="w-4 h-4"
        />
      </div>
      {error && touched && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {isVisible && (
        <div className="border border-gray-300 rounded-lg mt-1 max-h-40 overflow-hidden bg-white shadow-lg absolute w-[95%] mx-[15px] left-[0px]  z-[999]">
          <ul>
            {options.map((item) => (
              <li
                key={item}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;