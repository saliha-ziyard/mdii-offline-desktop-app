import React from "react";
import { RiWifiOffLine } from "react-icons/ri";

const ImportantNotice = () => {
  return (
    <div className="important-notice">
      <span className="notice-icon">
        <RiWifiOffLine />
      </span>
      <div className="notice-content">
        <strong>Important:</strong>
        <p>You need to be online for data fetching and offline form caching.</p>
      </div>
    </div>
  );
};

export default ImportantNotice;