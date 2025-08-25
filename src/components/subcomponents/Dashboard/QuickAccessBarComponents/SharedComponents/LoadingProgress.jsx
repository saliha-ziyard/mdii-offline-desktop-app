import React from "react";

const LoadingProgress = ({ isLoading, progress }) => {
  if (!isLoading) return null;

  return (
    <div className="innovator-loading-bar-container">
      <div
        className="innovator-loading-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default LoadingProgress;