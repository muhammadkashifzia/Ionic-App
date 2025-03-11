import React from 'react';
import { IonIcon, useIonRouter } from '@ionic/react';
import BoardingOne from '../../assets/svgs/BoardingOne.svg';
import   CircleSvg  from '../../assets/svgs/circleSvg.svg';
import   ShadeSvg from '../../assets/svgs/shadeSvg.svg';

export default function BoardingOneComponent() {
  const router = useIonRouter();

  const navigateToNextPage = () => {
    router.push('/onboarding2');
  };

  return (
   
        <div className="flex flex-col h-full justify-between items-center">
          
          <div className="relative w-full bg-[#1D968B] flex-1 flex items-center justify-end  rounded-b-[60px] px-6  pb-12 h-full">
            {/* Circle SVG positioned at top left */}
            <div className="absolute -top-12 -left-12 z-10">
          <IonIcon src={CircleSvg}  className="w-[100%] h-[100px]" />
            </div>
            
            {/* Shade SVG positioned at top right */}
            <div className="absolute top-0 right-0">
             <IonIcon src={ShadeSvg}  className="w-[100%] h-[200px]" />
            </div>
            
            {/* Main illustration */}
            <div className="w-full mt-2 mx-auto flex">
              {/* <BoardingOne  />  */}
              <IonIcon src={BoardingOne} className="w-[60%] h-[60vh] mx-auto" />
            </div>
          </div>
          
          {/* Text Section */}
          <div className="w-full px-6 pt-6 pb-10">
            <p className="text-[16px] text-[#636466] font-normal leading-[20.8px]">
              爪噛み、抜毛、皮膚むしり、唇を噛む等の癖がやめられず、困っている方へ
            </p>
            
            <button
              onClick={navigateToNextPage}
              className="w-full mt-[59px] mb-5 bg-[#199A8E] text-white py-[10px] px-4 rounded-lg flex items-center justify-center"
            >
              <span className="text-[16px] font-normal leading-6 text-center w-full">次のページへ</span>
            </button>
          </div>
        </div>
  
  );
};


