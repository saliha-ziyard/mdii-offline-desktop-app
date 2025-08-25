import React from "react";
import { BsCheckCircle } from "react-icons/bs";

const ToolIdInput = ({ value, onChange, placeholder, tip, label = "Tool ID" }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="innovator-input-group">
      <label htmlFor="tool-input" className="innovator-input-label">
        {label}
      </label>
      <input
        id="tool-input"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="innovator-tool-input"
      />
      {tip && (
        <div className="innovator-tip">
          <BsCheckCircle />
          <span>{tip}</span>
        </div>
      )}
    </div>
  );
};

export default ToolIdInput;