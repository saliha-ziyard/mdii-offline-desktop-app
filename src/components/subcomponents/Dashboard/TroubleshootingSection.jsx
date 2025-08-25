import React from "react";
import { BsExclamationCircle } from "react-icons/bs";
import TroubleshootItem from "./TroubleshootItem";

const TroubleshootingSection = () => {
  const troubleshootItems = [
    {
      title: "Tool ID Not Working?",
      description: "Ensure surveys are completed and you have the correct ID from your email."
    },
    {
      title: "Offline Form Issues",
      description: "Look for the offline icon (empty bars with checkmark) in your browser."
    }
  ];

  return (
    <div className="troubleshooting-section">
      <h4 className="troubleshoot-title">
        <BsExclamationCircle /> <p>Troubleshooting</p>
      </h4>
      <hr />
      {troubleshootItems.map((item, index) => (
        <TroubleshootItem
          key={index}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default TroubleshootingSection;