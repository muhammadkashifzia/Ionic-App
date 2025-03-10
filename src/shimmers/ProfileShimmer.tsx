import React from 'react';
import { Shimmer } from 'react-shimmer';

type ProfileShimmerProps = {
  isLast?: boolean;
};

const ProfileShimmer: React.FC<ProfileShimmerProps> = ({ isLast }) => {
  return (
    <div className={`bg-white p-4 flex flex-col ${isLast ? 'mb-0' : 'mb-5'}`}>
      <p>Loading.....</p>
    </div>
  );
};

export default ProfileShimmer;