import React from "react";

type TabNavigationProps = {
  activeTab: "assessments" | "comparison";
  onTabChange: (tab: "assessments" | "comparison") => void;
};

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex flex-row mb-4 gap-4">
      <button
        className={`flex-1 max-w-[85px] w-full h-6 flex items-center justify-center rounded-sm  ${
          activeTab === "assessments" ? "bg-[#199A8E] text-white" : "text-[#101010] bg-[#D3FFF2]"
        }`}
        onClick={() => onTabChange("assessments")}
      >
        <span className="text-[13px] font-[ABeeZee-Regular] leading-6">自己評価</span>
      </button>
      <button
        className={`flex-1 max-w-[85px] w-full h-6 flex items-center justify-center rounded-sm  ${
          activeTab === "comparison" ? "bg-[#199A8E] text-white" : "text-[#101010] bg-[#D3FFF2]"
        }`}
        onClick={() => onTabChange("comparison")}
      >
        <span className="text-[13px] font-[ABeeZee-Regular] leading-6">症状の写真</span>
      </button>
    </div>
  );
};

export default TabNavigation;
