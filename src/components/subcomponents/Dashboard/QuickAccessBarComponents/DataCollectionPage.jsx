import React, { useState, useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { HiOutlineUserGroup, HiOutlineClipboardDocumentList } from "react-icons/hi2";
import PageHeader from "./SharedComponents/PageHeader";
import ToolIdInput from "./SharedComponents/ToolIdInput";
import LoadingProgress from "./SharedComponents/LoadingProgress";
import StatusMessage from "./SharedComponents/StatusMessage";
import UserTestingForms from "./SharedComponents/UserTestingForms";
import { useToolMaturity } from "./Hooks/useToolMaturity";
import { useLoadingProgress } from "./Hooks/useLoadingProgress";

const UserTestingPage = ({ 
  setCurrentPage, 
  toolId: propToolId, 
  setToolId: propSetToolId, 
  setStatus: propSetStatus 
}) => {
  const [localStatus, setLocalStatus] = useState("");
  const [localToolId, setLocalToolId] = useState(propToolId || "");
  
  const toolId = propToolId !== undefined ? propToolId : localToolId;
  const setToolId = propSetToolId || setLocalToolId;

  const updateStatus = (message) => {
    if (propSetStatus && typeof propSetStatus === 'function') {
      propSetStatus(message);
    } else {
      setLocalStatus(message);
    }
  };

  const {
    isCheckingMaturity,
    toolMaturity,
    showForms,
    checkToolMaturity,
    openForm
  } = useToolMaturity(updateStatus);

  const progress = useLoadingProgress(isCheckingMaturity);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleInputChange = (value) => {
    setToolId(value);
    
    // Reset form visibility and maturity when tool ID changes
    if (localStatus || (propSetStatus && typeof propSetStatus === 'function')) {
      updateStatus("");
    }
  };

  const handleCheckMaturity = () => {
    if (!toolId || toolId.trim() === "") {
      updateStatus("Please enter a Tool ID");
      return;
    }

    if (isCheckingMaturity) return;
    checkToolMaturity(toolId.trim());
  };

  const handleOpenForm = (formType) => {
    openForm(formType, toolId, toolMaturity);
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
          title="User Testing Assignment"
          subtitle="Access UT3 and UT4 forms based on your tool's maturity stage"
        />

        <section className="innovator-section">
          <div className="innovator-section-header">
            <HiOutlineUserGroup />
            <div>
              <h2>Generating the links for Direct and Indirect beneficiaries</h2>
              <p>Enter your Tool ID to check maturity and access appropriate forms</p>
            </div>
          </div>

          <div className="innovator-form-content">
            <ToolIdInput
              value={toolId}
              onChange={handleInputChange}
              placeholder="Enter tool ID (e.g., MDII-ABCD-123456)"
              tip="Tool ID must match the one used for your evaluation."
            />

            <button
              onClick={handleCheckMaturity}
              disabled={isCheckingMaturity}
              className={`innovator-generate-button ${isCheckingMaturity ? "disabled" : ""}`}
              type="button"
            >
              {isCheckingMaturity ? "Generating Links..." : "Generate Links"}
            </button>

            <LoadingProgress isLoading={isCheckingMaturity} progress={progress} />
            <StatusMessage status={currentStatus || localStatus} />
          </div>
        </section>

        {showForms && toolMaturity && (
          <UserTestingForms 
            toolMaturity={toolMaturity}
            toolId={toolId}
            onOpenForm={handleOpenForm}
          />
        )}
      </div>
    </div>
  );
};

export default UserTestingPage;