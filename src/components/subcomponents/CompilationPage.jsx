import React, { useState, useEffect } from "react";
import { GoArrowLeft, GoBook } from "react-icons/go";
import { BsGear, BsExclamationTriangle, BsCheckCircle } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const CompilationPage = ({
  toolId,
  setToolId,
  handleGenerateExcel,
  status,
  filePath,
  handleOpenFile,
  isLoading,
  setCurrentPage,
  showSuccessMessage = false
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isLoading) {
      setProgress(5); // Start at 5%
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            return prev; // Stop at 95% to avoid reaching 100% prematurely
          }
          return prev + Math.random() * 10; // Increment by random small steps
        });
      }, 300);
    } else {
      setProgress(0); // Reset progress when not loading
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className="innovator-container">
      <button onClick={() => setCurrentPage("home")} className="innovator-back-btn">
        <GoArrowLeft />
      </button>

      <div className="innovator-content">
        <h1>Generate Innovator Compilation</h1>
        <p className="innovator-subtitle">Create standardized Excel reports from your survey data</p>

        <section className="innovator-section">
          <div className="innovator-section-header">
            <HiOutlineClipboardDocumentList />
            <div>
              <h2>Compilation Generator</h2>
              <p>Enter your tool code to generate an Excel report</p>
            </div>
          </div>

          {!showSuccessMessage ? (
            <div className="innovator-form-content">
              <div className="innovator-input-group">
                <label htmlFor="tool-input" className="innovator-input-label">
                  Tool Code
                </label>
                <input
                  id="tool-input"
                  type="text"
                  value={toolId}
                  onChange={(e) => setToolId(e.target.value)}
                  placeholder="Enter tool code (e.g., MDII-WCL-030625)"
                  className="innovator-tool-input"
                />
                <div className="innovator-tip">
                  <BsGear />
                  <span>Codes are case-sensitive and typically start with "MDII"</span>
                </div>
              </div>

              <button
                onClick={handleGenerateExcel}
                disabled={isLoading}
                className={`innovator-generate-button ${isLoading ? "disabled" : ""}`}
              >
                {isLoading ? "Generating..." : "Generate Report"}
              </button>

              {isLoading && (
                <div className="innovator-loading-bar-container">
                  <div
                    className="innovator-loading-bar"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}

              {status && (
                <div className={`innovator-status-message ${status.includes("Error") ? "error" : "success"}`}>
                  <BsExclamationTriangle className="innovator-status-icon innovator-error-icon" />
                  <BsCheckCircle className="innovator-status-icon innovator-success-icon" />
                  <span>{status}</span>
                </div>
              )}

              {filePath && (
                <div className="innovator-file-actions">
                  <button onClick={handleOpenFile} className="innovator-open-file-button">
                    <HiOutlineClipboardDocumentList />
                    Open Generated File
                  </button>
                  <p className="innovator-file-path">
                    <GoBook />
                    File saved to: {filePath}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="innovator-success-content">
              <div className="innovator-success-header">
                <BsCheckCircle />
                <h3>Compilation Successfully Generated</h3>
              </div>
              <div className="innovator-compilation-details">
                <p>
                  Your Excel file has been generated with the latest data from Kobo Toolbox.
                </p>
                <div className="innovator-file-info">
                  <p>
                    <strong>File:</strong> output_{toolId || "MDII-WCL-030625"}.xlsx
                  </p>
                  <p>
                    <strong>Generated:</strong> {new Date().toLocaleString()}
                  </p>
                </div>
              </div>

              {filePath && (
                <div className="innovator-file-actions">
                  <button onClick={handleOpenFile} className="innovator-open-file-button">
                    <HiOutlineClipboardDocumentList />
                    Open Generated File
                  </button>
                  <p className="innovator-file-path">
                    <GoBook />
                    File saved to: {filePath}
                  </p>
                </div>
              )}

              <div className="innovator-next-steps">
                <div className="innovator-step-header">
                  <GoBook />
                  <h3>Next Steps</h3>
                </div>
                <p>
                  Share the generated compilation with your Domain-Experts via email.
                </p>
                <div className="innovator-email-template">
                  <p className="innovator-email-subject">
                    <strong>Subject:</strong> MDII Evaluation - Complete Your Expert Assessment
                  </p>
                  <div className="innovator-email-body">
                    <p>Dear Expert,</p>
                    <p>
                      Please complete your expert assessment using the attached compilation file. 
                      Once completed, return the file to the coordinator.
                    </p>
                    <p>Thank you for your participation.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CompilationPage;