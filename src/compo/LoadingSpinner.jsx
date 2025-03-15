import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="my-5 text-center">
      <div className="mb-3 spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;