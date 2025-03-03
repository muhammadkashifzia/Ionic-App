export const getMailBoxIcon = (color = '#9CA3AF') => `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 7L12 13L21 7" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
export const getLockIcon = (color = '#9CA3AF') => `
<svg 
  width="24" 
  height="24" 
  viewBox="0 0 24 24" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
>
  <path 
    d="M17 11H7C5.89543 11 5 11.8954 5 13V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8954 18.1046 11 17 11Z" 
    stroke="${color}" 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round"
  />
  <path 
    d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" 
    stroke="${color}" 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round"
  />
  <path 
    d="M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11" 
    stroke="${color}" 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round"
  />
</svg>
`;
export const getUserIcon = (color = '#9CA3AF') => `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.983 15.3457C8.11536 15.3457 4.8125 15.9305 4.8125 18.2724C4.8125 20.6143 8.0944 21.22 11.983 21.22C15.8506 21.22 19.1525 20.6343 19.1525 18.2933C19.1525 15.9524 15.8715 15.3457 11.983 15.3457Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9829 12.0059C14.521 12.0059 16.5782 9.94779 16.5782 7.40969C16.5782 4.8716 14.521 2.81445 11.9829 2.81445C9.44484 2.81445 7.38675 4.8716 7.38675 7.40969C7.37817 9.93922 9.42198 11.9973 11.9506 12.0059H11.9829Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
// fieldIcons.js
export const loadingIcon = (color = '#9CA3AF') => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
    <circle
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke="${color}"
      stroke-width="5"
      stroke-linecap="round"
      stroke-dasharray="94.248"
      stroke-dashoffset="47.124"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 25 25"
        to="360 25 25"
        dur="1s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
  `;
export const openEyeIcon = (color = '#9CA3AF') => `
<svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.9675 12.1566C15.1133 12.1566 16.8529 10.417 16.8529 8.27117C16.8529 6.1253 15.1133 4.38574 12.9675 4.38574C10.8216 4.38574 9.08203 6.1253 9.08203 8.27117C9.08203 10.417 10.8216 12.1566 12.9675 12.1566ZM12.9675 9.93013C12.0513 9.93013 11.3085 9.18735 11.3085 8.27117C11.3085 7.35498 12.0513 6.6122 12.9675 6.6122C13.8837 6.6122 14.6264 7.35498 14.6264 8.27117C14.6264 9.18735 13.8837 9.93013 12.9675 9.93013Z" fill="#9CA3AF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.9766 0.5C7.63554 0.5 4.00312 3.39636 2.0855 5.4731C0.606917 7.07436 0.606918 9.46734 2.0855 11.0686C4.00312 13.1454 7.63554 16.0417 12.9766 16.0417C18.3176 16.0417 21.95 13.1454 23.8676 11.0686C25.3462 9.46734 25.3462 7.07436 23.8676 5.4731C21.95 3.39636 18.3176 0.5 12.9766 0.5ZM3.71669 6.97934C5.41477 5.14033 8.49933 2.72024 12.9766 2.72024C17.4538 2.72024 20.5384 5.14033 22.2364 6.97934C22.9296 7.73 22.9296 8.8117 22.2364 9.56237C20.5384 11.4014 17.4538 13.8215 12.9766 13.8215C8.49933 13.8215 5.41477 11.4014 3.71669 9.56237C3.0235 8.8117 3.0235 7.73 3.71669 6.97934Z" fill="#9CA3AF"/>
</svg>

`;
export const closeEyeIcon = (color = '#9CA3AF') => `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 3L21 21" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5864 10.5869C10.2111 10.9619 10.0002 11.4707 10 12.0012C9.99981 12.5317 10.2104 13.0406 10.5854 13.4159C10.9604 13.7912 11.4692 14.0021 11.9997 14.0023C12.5302 14.0025 13.0391 13.7919 13.4144 13.4169" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.357 17.3491C15.726 18.4491 13.942 19.0001 12 19.0001C8 19.0001 4.667 16.6671 2 12.0001C3.369 9.60506 4.913 7.82506 6.632 6.65906M9.363 5.36506C10.2204 5.11978 11.1082 4.9969 12 5.00006C16 5.00006 19.333 7.33306 22 12.0001C21.222 13.3611 20.388 14.5241 19.497 15.4881L9.363 5.36506Z" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`;

export const calenderIcon = `
<svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.2308 20.8754H9.15385C5.31008 20.8754 3.38821 20.8754 2.1941 19.6813C1 18.4873 1 16.5653 1 12.7216V10.6831C1 6.83938 1 4.91751 2.1941 3.7234C3.38821 2.5293 5.31008 2.5293 9.15385 2.5293H13.2308C17.0745 2.5293 18.9965 2.5293 20.1905 3.7234C21.3846 4.91751 21.3846 6.83938 21.3846 10.6831V12.7216C21.3846 16.5653 21.3846 18.4873 20.1905 19.6813C19.5247 20.3471 18.6328 20.6416 17.3077 20.772" stroke="#2A2D31" stroke-width="2" stroke-linecap="round"/>
<path d="M6.09766 2.52885V1" stroke="#2A2D31" stroke-width="2" stroke-linecap="round"/>
<path d="M16.2891 2.52885V1" stroke="#2A2D31" stroke-width="2" stroke-linecap="round"/>
<path d="M20.875 7.625H15.9062H9.91827M1 7.625H4.94952" stroke="#2A2D31" stroke-width="2" stroke-linecap="round"/>
<path d="M17.308 15.779C17.308 16.3419 16.8517 16.7982 16.2888 16.7982C15.7258 16.7982 15.2695 16.3419 15.2695 15.779C15.2695 15.2161 15.7258 14.7598 16.2888 14.7598C16.8517 14.7598 17.308 15.2161 17.308 15.779Z" fill="#2A2D31"/>
<path d="M17.308 11.7018C17.308 12.2648 16.8517 12.7211 16.2888 12.7211C15.7258 12.7211 15.2695 12.2648 15.2695 11.7018C15.2695 11.1389 15.7258 10.6826 16.2888 10.6826C16.8517 10.6826 17.308 11.1389 17.308 11.7018Z" fill="#2A2D31"/>
<path d="M12.2103 15.779C12.2103 16.3419 11.754 16.7982 11.1911 16.7982C10.6282 16.7982 10.1719 16.3419 10.1719 15.779C10.1719 15.2161 10.6282 14.7598 11.1911 14.7598C11.754 14.7598 12.2103 15.2161 12.2103 15.779Z" fill="#2A2D31"/>
<path d="M12.2103 11.7018C12.2103 12.2648 11.754 12.7211 11.1911 12.7211C10.6282 12.7211 10.1719 12.2648 10.1719 11.7018C10.1719 11.1389 10.6282 10.6826 11.1911 10.6826C11.754 10.6826 12.2103 11.1389 12.2103 11.7018Z" fill="#2A2D31"/>
<path d="M7.11659 15.779C7.11659 16.3419 6.66026 16.7982 6.09736 16.7982C5.53445 16.7982 5.07812 16.3419 5.07812 15.779C5.07812 15.2161 5.53445 14.7598 6.09736 14.7598C6.66026 14.7598 7.11659 15.2161 7.11659 15.779Z" fill="#2A2D31"/>
<path d="M7.11659 11.7018C7.11659 12.2648 6.66026 12.7211 6.09736 12.7211C5.53445 12.7211 5.07812 12.2648 5.07812 11.7018C5.07812 11.1389 5.53445 10.6826 6.09736 10.6826C6.66026 10.6826 7.11659 11.1389 7.11659 11.7018Z" fill="#2A2D31"/>
</svg>
`;

export const backgroundIcon = `
<svg width="309" height="311" viewBox="0 0 309 311" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M178.39 -2.0295C200.185 -25.6976 232.912 -36.4223 265.077 -27.0915C312.786 -13.2514 341.19 39.4718 328.52 90.669C324.291 107.759 316.019 122.518 305.101 134.084L178.39 -2.0295Z" fill="url(#paint0_linear_2172_2755)"/>
<path opacity="0.1" d="M230.336 76.4464L104.207 -58.1587" stroke="#199A8E"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M336.071 206.545C314.277 230.213 281.549 240.937 249.384 231.607C201.676 217.766 173.271 165.044 185.941 113.846C190.171 96.7564 198.442 81.9969 209.36 70.431L336.071 206.545Z" fill="url(#paint1_linear_2172_2755)"/>
<defs>
<linearGradient id="paint0_linear_2172_2755" x1="178.596" y1="-2.10002" x2="314.654" y2="123.567" gradientUnits="userSpaceOnUse">
<stop stop-color="#199A8E"/>
<stop offset="1" stop-color="white" stop-opacity="0.9"/>
</linearGradient>
<linearGradient id="paint1_linear_2172_2755" x1="206.685" y1="72.8229" x2="307.72" y2="158.864" gradientUnits="userSpaceOnUse">
<stop stop-color="#199A8E" stop-opacity="0.06"/>
<stop offset="1" stop-color="#199A8E" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>
`;
