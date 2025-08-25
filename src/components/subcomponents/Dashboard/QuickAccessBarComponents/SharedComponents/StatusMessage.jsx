import React from "react";
import { BsCheckCircle, BsExclamationTriangle } from "react-icons/bs";

const StatusMessage = ({ status }) => {
  if (!status) return null;

  const isError = status.includes("Error") || 
                 status.includes("not found") || 
                 status.includes("Please enter") ||
                 (typeof status === 'object' && status.message && 
                  (status.message.includes("Error") || status.message.includes("not found")));

  const message = typeof status === 'object' ? status.message : status;
  const subItems = typeof status === 'object' ? status.subItems : null;

  return (
    <div className={`innovator-status-message ${isError ? "error" : "success"}`}>
      {isError ? (
        <BsExclamationTriangle className="innovator-status-icon innovator-error-icon" />
      ) : (
        <BsCheckCircle className="innovator-status-icon innovator-success-icon" />
      )}
      <span>
        {message.includes("Tool ID") && message.includes("not found") 
          ? "Error: Tool ID not found. Please verify your Tool ID is correct and has been submitted." 
          : message}
      </span>
      {subItems && (
        <div className="innovator-sub-status">
          {subItems.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusMessage;