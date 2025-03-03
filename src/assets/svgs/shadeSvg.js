import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';


  const ShadeSvg = props => {
  return (
    <Svg
      width="371"
      height="367"
      viewBox="0 0 371 367"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        opacity="0.1"
        d="M393.616 149.901L214.14 -29.5439C245.01 -60.5005 291.187 -74.4855 336.573 -62.2309C404.149 -43.9849 444.38 25.5219 426.434 93.015C420.489 115.374 408.906 134.707 393.616 149.901Z"
        fill="url(#paint0_linear_1_110)"
        stroke="url(#paint1_linear_1_110)"
      />
      <Path
        opacity="0.1"
        d="M287.299 74.3218L107.945 -103.832"
        stroke="white"
      />
      <Path
        opacity="0.1"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M463.243 220.221C432.252 251.546 385.714 265.741 339.976 253.391C272.134 235.073 231.743 165.293 249.76 97.5315C255.774 74.9127 267.535 55.378 283.061 40.0702L463.243 220.221Z"
        fill="url(#paint2_linear_1_110)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1_110"
          x1="213.726"
          y1="-29.6372"
          x2="394.366"
          y2="149.619"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="white" stopOpacity="0.9" />
          <Stop offset="1" stopColor="white" stopOpacity="0.1" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1_110"
          x1="213.726"
          y1="-29.6372"
          x2="394.366"
          y2="149.619"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="white" stopOpacity="0.9" />
          <Stop offset="1" stopColor="white" stopOpacity="0.5" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_1_110"
          x1="279.554"
          y1="42.9582"
          x2="460.194"
          y2="222.215"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="white" stopOpacity="0.1" />
          <Stop offset="1" stopColor="white" stopOpacity="0.9" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default ShadeSvg;
