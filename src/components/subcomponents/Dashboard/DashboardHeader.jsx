import React from "react";
import { BsBoxSeam } from "react-icons/bs";

const DashboardHeader = () => {
  return (
    <div className="heading-main">
      <div className="icon">
        <BsBoxSeam />
      </div>
      <div className="text">
        <h1>MDII Evaluation Tool</h1>
        <p>Offline-friendly Desktop Application</p>
      </div>
    </div>
  );
};

export default DashboardHeader;