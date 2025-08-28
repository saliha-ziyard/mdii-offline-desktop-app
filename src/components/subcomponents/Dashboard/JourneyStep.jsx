import React from "react";

const JourneyStep = ({ number, title, description }) => {
  return (
    <div className="journey-step">
      <div className="step-header">
        <div className="step-number">{number}</div>
        <h4 className="step-title">{title}</h4>
      </div>
      <p className="step-description">{description}</p>
    </div>
  );
};

export default JourneyStep;
