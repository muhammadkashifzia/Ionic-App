"use client";

import type React from "react";
import { IonIcon, useIonRouter } from '@ionic/react';
import { useHistory } from "react-router-dom";

// Import SVG components
// Note: You'll need to create these SVG components or import them properly
import OnBoarding2SVG from "../../assets/svgs/onBoarding4SVG.svg";
import CircleSvg from "../../assets/svgs/circleSvg.svg";
import ShadeSvg from "../../assets/svgs/shadeSvg.svg";
import { ArrowRight } from "lucide-react";


const OnBoarding4: React.FC = () => {
   const router = useIonRouter();
   const navigateToNextPage = () => {
    router.push('/signin');
  };
  return (
    <div>
      <div className="flex flex-col h-full">
        <div className="flex flex-col h-full justify-between">
          {/* Top Section with SVGs */}
          <div className="relative bg-[#1D968B] overflow-hidden flex-1 items-center w-full max-h-[800px] pt-12 pb-2.5 rounded-bl-[60px] rounded-br-[60px] flex justify-end px-5">
            <div className="absolute w-[218px] h-[208px] top-0 -left-6">
              <svg
                width="160"
                height="168"
                viewBox="0 0 160 168"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="-84"
                  cy="-65.9995"
                  r="172.5"
                  stroke="white"
                  stroke-opacity="0.4"
                  stroke-width="3"
                />
                <circle
                  cx="-34"
                  cy="-35.9995"
                  r="172.5"
                  stroke="white"
                  stroke-opacity="0.4"
                  stroke-width="3"
                />
                <circle
                  cx="-14"
                  cy="-5.99947"
                  r="172.5"
                  stroke="white"
                  stroke-opacity="0.4"
                  stroke-width="3"
                />
              </svg>
            </div>
            <IonIcon
              src={ShadeSvg}
              className="absolute w-[418px] h-[308px] -top-12 -right-5"
            />
            <IonIcon src={OnBoarding2SVG} className="w-full h-[550px] z-10" />
          </div>

          {/* Bottom Section */}
          <div className="mb-5 px-6 ">
            {/* Text and Continue Button */}
            <div className="justify-between flex flex-row items-start pt-6 mb-5 w-full">
              <p className="text-base font-normal text-[#636466] text-left w-[258px]">
              毎日のエクササイズの成果をアプリに記録しましょう
              </p>

          
            </div>

            {/* Skip Button */}
            <button
              onClick={navigateToNextPage}
              className="w-full mt-[59px] mb-5 bg-[#199A8E] text-white py-[10px] px-4 rounded-lg flex items-center justify-center"
            >
              <span className="text-[16px] font-normal leading-6 text-center w-full">アプリを開始する</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding4;
