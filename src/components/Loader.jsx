import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loader = ({ size = 40, color = 'text-blue-600' }) => {
  return (
    <div className="flex justify-center items-center py-8">
      <FaSpinner
        className={`animate-spin ${color}`}
        style={{ fontSize: size }}
      />
    </div>
  );
};

export default Loader;
