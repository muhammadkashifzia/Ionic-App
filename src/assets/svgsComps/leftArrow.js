import React from 'react';
import { Svg, G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

const ArrowIcon = ({ fill = '#111827', ...props }) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_285_21561)">
        <Path
          d="M5 12H19"
          stroke="#111827"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M5 12L11 18"
          stroke="#111827"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M5 12L11 6"
          stroke="#111827"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_285_21561">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default ArrowIcon;