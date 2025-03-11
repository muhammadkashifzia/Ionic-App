"use client";

import type React from "react";
import { IonIcon } from "@ionic/react";
import { useHistory } from "react-router-dom";

// Import SVG components
// Note: You'll need to create these SVG components or import them properly
import OnBoarding2SVG from "../../assets/svgs/onBoarding3SVG.svg";
import CircleSvg from "../../assets/svgs/circleSvg.svg";
import ShadeSvg from "../../assets/svgs/shadeSvg.svg";
import { ArrowRight } from "lucide-react";

const OnBoarding3: React.FC = () => {
  const history = useHistory();

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
          <div className="mb-5">
            {/* Text and Continue Button */}
            <div className="px-6 justify-between flex flex-row items-start pt-6 mb-5 w-full">
              <p className="text-base font-normal text-[#636466] text-left w-[258px]">
              毎日のエクササイズの成果をアプリに記録しましょう
              </p>

              <button
                onClick={() => history.push("/onboarding4")}
                className="m-0 p-0"
              >
                <div className="flex items-center justify-center ">
                  <svg
                    width="54"
                    height="77"
                    viewBox="0 0 54 77"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27 52C33.6304 52 39.9893 49.3661 44.6777 44.6777C49.3661 39.9893 52 33.6304 52 27C52 20.3696 49.3661 14.0107 44.6777 9.32233C39.9893 4.63392 33.6304 2 27 2"
                      stroke="#199A8E"
                      stroke-width="2.5"
                      stroke-linecap="round"
                    />
                    <path
                      opacity="0.1"
                      d="M27 2C20.3696 2 14.0107 4.63392 9.32233 9.32233C4.63392 14.0107 2 20.3696 2 27C2 33.6304 4.63392 39.9893 9.32233 44.6777C14.0107 49.3661 20.3696 52 27 52"
                      stroke="#9AA0A6"
                      stroke-width="2.5"
                      stroke-linecap="round"
                    />
                    <circle cx="27" cy="27" r="20" fill="#199A8E" />
                    <path
                      d="M25 22L29.8586 26.8586C29.9367 26.9367 29.9367 27.0633 29.8586 27.1414L25 32"
                      stroke="#F1F3F4"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <rect
                      x="4"
                      y="71"
                      width="32"
                      height="6"
                      rx="3"
                      fill="#BEC2C7"
                    />
                    <circle cx="43" cy="74" r="3" fill="#E5E5E5" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Skip Button */}
            <div className="flex flex-row justify-center w-full items-center">
              <button
                onClick={() => history.push("/onboarding4")}
                className="m-0 p-0"
              >
                <p className="text-[#202124] text-xs mb-5 text-center underline font-light tracking-wider">
                  スキップ
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding3;
