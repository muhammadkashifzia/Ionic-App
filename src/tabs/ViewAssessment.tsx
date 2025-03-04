import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import ArrowIcon from "../assets/svgs/leftArrow";
import TabNavigation from "../components/comparisonTab/tabNavigation";
import PhotoComparison from "../comparison/PhotoComparison";
import ListAssessment from "../components/assessment/ListAssessment";

const Assessment: React.FC = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState<"assessments" | "comparison">("assessments");

  const renderContent = () => {
    switch (activeTab) {
      case "assessments":
        return <ListAssessment />;
      case "comparison":
        return <PhotoComparison />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col  p-6 overflow-y-auto h-[100%]">
  
        <div className="flex items-center justify-center relative mb-5">
          {/* <button className="absolute left-0" onClick={() => history.goBack()}>
            <ArrowIcon />
          </button> */}
          <h1 className="text-lg font-normal font-[ABeeZee-Regular] leading-7">評価閲覧</h1>
        </div>
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        {renderContent()}
    
    </div>
  );
};

export default Assessment;