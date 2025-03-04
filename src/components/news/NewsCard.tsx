import React from "react";
import { IonCard, IonCardContent, IonText } from "@ionic/react";

interface NewsCardProps {
  title: string;
  createdAt: string;
  isLast?: boolean;
  onPress: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, createdAt, isLast, onPress }) => {
  const formattedDate =
    new Date(createdAt)
      .toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "年")
      .replace(/\//g, "月") + "日";

  return (
    <div 
      onClick={onPress} 
      className={`border-b border-gray-300 pb-[16px] ${isLast ? 'mb-0 border-b-0 pb-0' : 'mb-0'}`}
    >
      <div>
        <div className="text-base text-gray-900 font-normal font-[ABeeZee-Regular] mb-1">
          {title}
        </div>
        <div className="text-sm text-gray-400 font-normal font-[ABeeZee-Regular]">
          {formattedDate}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
