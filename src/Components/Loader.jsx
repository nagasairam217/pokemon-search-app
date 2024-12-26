import React from 'react';

const Loader = () => (
  <div className="flex justify-center mt-10">
    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-gray-600" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Loader;
