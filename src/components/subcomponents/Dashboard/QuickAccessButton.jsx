import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const QuickAccessButton = ({ icon: Icon, title, subtitle, className = "", onClick }) => {
  return (
    <button className={`quick-access-btn`} onClick={onClick}>
      <span className="btn-icon">
        <Icon />
      </span>
      <div className="btn-content">
        <span className="btn-title">{title}</span>
        <span className="btn-subtitle">{subtitle}</span>
      </div>
      <span className="btn-arrow">
        <FaArrowRightLong />
      </span>
    </button>
  );
};

export default QuickAccessButton;