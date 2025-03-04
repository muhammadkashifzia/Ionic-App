import React from "react";
import { IonIcon } from "@ionic/react";
import ArrowBack from "../assets/svgs/arrowBack.svg";
interface ImageData {
  image: string;
  date: string;
}

interface PhotoComparisonScreenProps {
  selectedImages: ImageData[];
  setShow: (show: boolean) => void;
}

const PhotoComparisonScreen: React.FC<PhotoComparisonScreenProps> = ({
  selectedImages,
  setShow,
}) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-y-auto">
        <h2 className="text-center text-lg font-normal leading-5 my-5 font-[ABeeZee-Regular]">
          症状の状態はどのように変化していますか？
        </h2>
        <div className="flex flex-col items-center px-2">
          {selectedImages?.map((image, index) => (
            <div key={index} className="mb-4 rounded-md overflow-hidden bg-gray-200 w-[221px] h-[158px] relative">
              <img src={image.image} alt="Selected" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 h-5 flex items-center justify-center bg-black bg-opacity-60">
                <p className="text-white text-sm font-normal font-[ABeeZee-Regular]">
                  {image.date}
                </p>
              </div>
            </div>
          ))}
          <div className="mt-3 w-[221px]">
            <button
              className="flex items-center justify-center bg-teal-600 text-white text-sm font-normal py-2 rounded-lg w-full gap-2"
              onClick={() => setShow(false)}
            >
              <IonIcon icon={ArrowBack} />
              <span>戻る</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoComparisonScreen;
