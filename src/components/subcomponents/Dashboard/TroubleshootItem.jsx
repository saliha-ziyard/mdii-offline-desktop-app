import React from "react";

const TroubleshootItem = ({ title, description }) => {
  return (
    <div className="troubleshoot-item">
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
};

export default TroubleshootItem;