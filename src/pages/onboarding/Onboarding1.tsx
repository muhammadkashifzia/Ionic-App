import React from "react";
import { IonPage, IonContent, IonIcon, IonButton, IonText } from "@ionic/react";
import { useIonRouter } from "@ionic/react";

// SVG Assets
import OnBoarding1Svg from "../../assets/svgs/onBoarding1SVG.svg";
// import CircleSvg from "../../assets/svgs/circleSvg.jsx";
// import ShadeSvg from "../../assets/svgs/shadeSvg.js";  

const OnBoarding1: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent className="flex flex-col justify-between items-center h-screen">
        {/* Top Section */}
        <div className="relative flex flex-col items-center w-full min-h-[550px] max-h-[800px] bg-teal-700 rounded-b-[60px] overflow-hidden justify-end px-6">
          <IonIcon src={OnBoarding1Svg} className="w-full h-auto mt-14" />
          {/* <IonIcon src={CircleSvg} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          <IonIcon src={ShadeSvg} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" /> */}
        </div>

        {/* Text & Button Section */}
        <div className="px-6 w-full flex flex-col items-start pb-4">
          <IonText className="text-gray-600 text-lg leading-[20.8px] font-normal">
            アプリで、あなたの困りごとを軽減するエクササイズを学習できます
          </IonText>

          {/* Continue Button */}
          <IonButton
            expand="full"
            className="mt-10 bg-teal-600 text-white w-full"
            onClick={() => router.push("/onboarding3", "forward")}
          >
            Continue
          </IonButton>

          {/* Skip Button */}
          <div className="flex justify-center w-full mt-3">
            <button  className="text-gray-700 text-sm underline" onClick={() => router.push("/onboarding4", "forward")}>
              スキップ
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OnBoarding1;
