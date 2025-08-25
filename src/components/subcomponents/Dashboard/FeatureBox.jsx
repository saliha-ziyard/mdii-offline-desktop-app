import React from "react";

const FeatureBox = ({ title, features }) => {
  return (
    <div className="feature-box">
      <h3 className="feature-title">{title}</h3>
      <ul className="feature-list">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureBox;