import React from "react";

interface SvgProps extends React.SVGProps<SVGSVGElement> {}

export const CustomDropdownIcon: React.FC<SvgProps> = (props) => (
  <svg
    width="9"
    height="4"
    viewBox="0 0 9 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-xl mr-3 text-teal-600"
    {...props}
  >
    <path d="M8.5 0H0.5L3.08579 2.58579C3.86683 3.36683 5.13317 3.36683 5.91421 2.58579L8.5 0Z" fill="#262C2F" />
  </svg>
);

export const CustomDropdownIconFilled: React.FC<SvgProps> = (props) => (
  <svg
    width="9"
    height="4"
    viewBox="0 0 9 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-xl mr-3 text-teal-600"
    {...props}
  >
    <path d="M8.5 0H0.5L3.08579 2.58579C3.86683 3.36683 5.13317 3.36683 5.91421 2.58579L8.5 0Z" fill="#262C2F" />
  </svg>
);