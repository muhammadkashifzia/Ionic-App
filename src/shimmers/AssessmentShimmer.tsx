import React from "react";
// import Shimmer from "react-shimmer-effect";

const ListAssessmentShimmer: React.FC = () => {
  return (
    <div className="flex flex-col mt-5">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded-xl py-4 px-5 mb-4"
        >
          {/* <Shimmer>
            <div className="w-2/5 h-5 rounded-md mb-3 bg-gray-300"></div>
          </Shimmer>
          <div className="flex items-center space-x-3">
            <Shimmer>
              <div className="w-[69px] h-[67px] bg-gray-300 rounded-lg"></div>
            </Shimmer>
            <div className="flex flex-col space-y-2 w-full">
              <Shimmer>
                <div className="w-full h-4 bg-gray-300 rounded-md"></div>
              </Shimmer>
              <Shimmer>
                <div className="w-full h-4 bg-gray-300 rounded-md"></div>
              </Shimmer>
            </div>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default ListAssessmentShimmer;
