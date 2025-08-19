import React, { useState, useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { BsCheckCircle, BsExclamationTriangle } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi2";

const AssignExpertsPage = ({ setCurrentPage, toolId: propToolId, setToolId: propSetToolId, setStatus: propSetStatus }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [localStatus, setLocalStatus] = useState("");
  const [localToolId, setLocalToolId] = useState(propToolId || "");

  // Use local state if props are not available
  const toolId = propToolId !== undefined ? propToolId : localToolId;
  const setToolId = propSetToolId || setLocalToolId;

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Helper function to safely set status
  const updateStatus = (message) => {
    if (propSetStatus && typeof propSetStatus === 'function') {
      propSetStatus(message);
    } else {
      setLocalStatus(message);
    }
  };

  const handleAssignExperts = () => {
    if (!toolId || toolId.trim() === "") {
      updateStatus("Please enter a Tool ID");
      return;
    }

    if (isLoading) {
      return; // Prevent multiple clicks
    }

    setIsLoading(true);
    updateStatus("Opening expert assignment form...");

    // Construct the form URL
    const formUrl = `https://ee.kobotoolbox.org/x/y8TjauDs?d[tool_id]=${encodeURIComponent(toolId)}`;
    console.log("Opening form URL:", formUrl);

    // Try to open in new window
    const newWindow = window.open(formUrl, "_blank", "noopener,noreferrer");
    
    // Check if window opened successfully after a short delay
    setTimeout(() => {
      if (newWindow && !newWindow.closed) {
        setIsLoading(false);
        updateStatus("Expert assignment form opened successfully!");
      } else {
        setIsLoading(false);
        updateStatus("Form opened (popup may have been blocked)");
      }
    }, 1000);
  };

  // Remove the alternative function since we only need one
  // const handleAssignExpertsAlternative = () => { ... }

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setToolId(value);
    
    // Clear status when user starts typing
    if (localStatus || (propSetStatus && typeof propSetStatus === 'function')) {
      updateStatus("");
    }
  };

  // Get current status
  const currentStatus = propSetStatus && typeof propSetStatus === 'function' ? 
    (propSetStatus.status || "") : localStatus;

  useEffect(() => {
    let interval;
    if (isLoading) {
      setProgress(5);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 300);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Update local tool ID when prop changes
  useEffect(() => {
    if (propToolId !== undefined && propToolId !== localToolId) {
      setLocalToolId(propToolId);
    }
  }, [propToolId, localToolId]);

  return (
    <div className="innovator-container">
      <button 
        onClick={() => setCurrentPage && setCurrentPage("home")} 
        className="back-btn"
        type="button"
      >
        <GoArrowLeft />
      </button>

      <div className="innovator-content">
        <h1>Assign Domain Experts</h1>
        <p className="innovator-subtitle">
          Assign experts to assess your digital tool's inclusiveness
        </p>

        <section className="innovator-section">
          <div className="innovator-section-header">
            <HiOutlineUserGroup />
            <div>
              <h2>Expert Assignment</h2>
              <p>Enter your Tool ID to open the expert assignment form</p>
            </div>
          </div>

          <div className="innovator-form-content">
            <div className="innovator-input-group">
              <label htmlFor="tool-input" className="innovator-input-label">
                Tool ID
              </label>
              <input
                id="tool-input"
                type="text"
                value={toolId}
                onChange={handleInputChange}
                placeholder="Enter tool ID (e.g., MDII-ILCYM-110825)"
                className="innovator-tool-input"
              />
              <div className="innovator-tip">
                <BsCheckCircle />
                <span>
                  Tool ID must match the one used for your evaluation (e.g., MDII-ILCYM-110825).
                </span>
              </div>
            </div>

            <button
              onClick={handleAssignExperts}
              disabled={isLoading}
              className={`innovator-generate-button ${isLoading ? "disabled" : ""}`}
              type="button"
            >
              {isLoading ? "Opening Form..." : "Assign Experts"}
            </button>

            {isLoading && (
              <div className="innovator-loading-bar-container">
                <div
                  className="innovator-loading-bar"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            {(currentStatus || localStatus) && (
              <div className={`innovator-status-message ${
                (currentStatus || localStatus).includes("Error") || 
                (currentStatus || localStatus).includes("Please enter") ? "error" : "success"
              }`}>
                {(currentStatus || localStatus).includes("Error") || 
                 (currentStatus || localStatus).includes("Please enter") ? (
                  <BsExclamationTriangle className="innovator-status-icon innovator-error-icon" />
                ) : (
                  <BsCheckCircle className="innovator-status-icon innovator-success-icon" />
                )}
                <span>{currentStatus || localStatus}</span>
              </div>
            )}

            {/* Debug section - remove in production
            {toolId && (
              <div className="debug-info" style={{ 
                marginTop: '20px', 
                padding: '10px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '4px', 
                fontSize: '12px',
                border: '1px solid #dee2e6'
              }}>
                <strong>Debug Info:</strong><br />
                Tool ID: {toolId}<br />
                Generated URL: https://ee.kobotoolbox.org/x/y8TjauDs?d[tool_id]={encodeURIComponent(toolId)}
              </div>
            )}
            */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AssignExpertsPage;