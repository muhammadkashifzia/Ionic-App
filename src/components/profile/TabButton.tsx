import React from "react";

type TabButtonProps = {
  title: string;
  isActive: boolean;
  onPress: () => void;
};

const TabButton: React.FC<TabButtonProps> = ({ title, isActive, onPress }) => {
  return (
    <button
      className={`flex-1 py-0 flex items-center justify-center rounded-md h-6 
        ${isActive ? "bg-[#199A8E] text-white" : "bg-teal-200 text-gray-900"}`}
      onClick={onPress}
    >
      <span className="text-[13px] font-normal leading-6 font-[ABeeZee-Regular]">
        {title}
      </span>
    </button>
  );
};

export default TabButton;
