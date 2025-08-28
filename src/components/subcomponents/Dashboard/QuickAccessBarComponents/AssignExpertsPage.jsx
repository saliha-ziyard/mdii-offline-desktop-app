import React, { useState, useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi2";
import PageHeader from "./SharedComponents/PageHeader";
import ToolIdInput from "./SharedComponents/ToolIdInput";
import LoadingProgress from "./SharedComponents/LoadingProgress";
import StatusMessage from "./SharedComponents/StatusMessage";
import { useToolIdValidation } from "./Hooks/useToolIdValidation";
import { useLoadingProgress } from "./Hooks/useLoadingProgress";

const AssignExpertsPage = ({ 
  setCurrentPage, 
  toolId: propToolId, 
  setToolId: propSetToolId, 
  setStatus: propSetStatus 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [localStatus, setLocalStatus] = useState("");
  const [localToolId, setLocalToolId] = useState(propToolId || "");
  
  const toolId = propToolId !== undefined ? propToolId : localToolId;
  const setToolId = propSetToolId || setLocalToolId;
  const progress = useLoadingProgress(isLoading);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const updateStatus = (message) => {
    if (propSetStatus && typeof propSetStatus === 'function') {
      propSetStatus(message);
    } else {
      setLocalStatus(message);
    }
  };

  const { validateToolId } = useToolIdValidation(updateStatus);

  const handleAssignExperts = async () => {
    if (!toolId || toolId.trim() === "") {
      updateStatus("Please enter a Tool ID");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    updateStatus("Checking Tool ID...");

    try {
      const isValid = await validateToolId(toolId.trim());
      
      if (!isValid) {
        setIsLoading(false);
        return;
      }

      updateStatus("Opening expert assignment form...");
      const formUrl = `https://ee.kobotoolbox.org/x/y8TjauDs?d[tool_id]=${encodeURIComponent(toolId)}`;
      
      const newWindow = window.open(formUrl, "_blank", "noopener,noreferrer");
      
      setTimeout(() => {
        setIsLoading(false);
        updateStatus(newWindow && !newWindow.closed ? 
          "Expert assignment form opened successfully!" : 
          "Form opened (popup may have been blocked)"
        );
      }, 1000);

    } catch (error) {
      console.error('Error checking tool ID:', error);
      setIsLoading(false);
      updateStatus("Error: Unable to verify Tool ID. Please try again or contact support.");
    }
  };

  const handleInputChange = (value) => {
    setToolId(value);
    if (localStatus || (propSetStatus && typeof propSetStatus === 'function')) {
      updateStatus("");
    }
  };

  const currentStatus = propSetStatus && typeof propSetStatus === 'function' ? 
    (propSetStatus.status || "") : localStatus;

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
        <PageHeader 
          title="Assign Domain Experts"
          subtitle="Assign experts to assess your digital tool's inclusiveness"
        />

        <section className="innovator-section">
          <div className="innovator-section-header">
            <HiOutlineUserGroup />
            <div>
              <h2>Expert Assignment</h2>
              <p>Enter your Tool ID to open the expert assignment form</p>
            </div>
          </div>

          <div className="innovator-form-content">
            <ToolIdInput
              value={toolId}
              onChange={handleInputChange}
              placeholder="Enter tool ID (e.g., MDII-ABCD-123456)"
              tip="Tool ID must match the one used for your evaluation (e.g., MDII-ABCD-123456)."
            />

            <button
              onClick={handleAssignExperts}
              disabled={isLoading}
              className={`innovator-generate-button ${isLoading ? "disabled" : ""}`}
              type="button"
            >
              {isLoading ? "Opening Form..." : "Assign Experts"}
            </button>

            <LoadingProgress isLoading={isLoading} progress={progress} />
            <StatusMessage status={currentStatus || localStatus} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AssignExpertsPage;