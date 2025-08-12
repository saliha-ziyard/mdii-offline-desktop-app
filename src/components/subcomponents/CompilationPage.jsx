import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const CompilationPage = ({
    toolId,
    setToolId,
    handleGenerateExcel,
    status,
    filePath,
    handleOpenFile,
    isLoading,
    setCurrentPage,
    showSuccessMessage = false // Add this prop
}) => (
    <div className="app-container">
        <Header />

        <div className="navigation">
            <button onClick={() => setCurrentPage("home")} className="back-button">
                <span className="back-arrow">←</span>
                Back to Home
            </button>
            <h1 className="page-title">Innovator Compilations</h1>
        </div>

        <div className="compilation-content">
            {!showSuccessMessage ? (
                // Original form
                <div className="compilation-form">
                    <div className="form-header">
                        <div className="form-icon">📄</div>
                        <h2 className="form-title">Generate Innovator Compilation</h2>
                    </div>

                    <div className="input-group">
                        <label className="input-label" htmlFor="tool-input">
                            Tool Code for Compilation
                        </label>
                        <input
                            id="tool-input"
                            type="text"
                            value={toolId}
                            onChange={(e) => setToolId(e.target.value)}
                            placeholder="Enter tool code"
                            className="tool-input"
                        />
                    </div>

                    <button
                        onClick={handleGenerateExcel}
                        disabled={isLoading}
                        className={`generate-button ${isLoading ? "disabled" : ""}`}
                    >
                        {isLoading ? "Generating..." : "Generate Compilation"}
                    </button>

                    {status && (
                        <p className={`status-message ${status.includes("Error") ? "error" : "success"}`}>
                            {status}
                        </p>
                    )}

                    {filePath && (
                        <div className="file-actions">
                            <button onClick={handleOpenFile} className="open-file-button">
                                Open Generated File
                            </button>
                            <p className="file-path">File saved to: {filePath}</p>
                        </div>
                    )}
                </div>
            ) : (
                // Success message
                <div className="compilation-form">
                    <div className="form-header">
                        <div className="form-icon">📄</div>
                        <h2 className="form-title">Generate Innovator Compilation</h2>
                    </div>

                    <div className="input-group">
                        <label className="input-label">
                            Tool Code for Compilation
                        </label>
                        <div className="tool-input-display">
                            {toolId || "MDII-WCL-030625"}
                        </div>
                    </div>

                    <div className="compilation-details">
                        <h3 className="details-title">Compilation Details</h3>
                        <p className="details-description">
                            The Excel file has been generated with the latest data from Kobo Toolbox.
                        </p>
                        <div className="file-info">
                            <p><strong>File:</strong> output_{toolId || "MDII-WCL-030625"}.xlsx</p>
                            <p><strong>Generated:</strong> {new Date().toLocaleString()}</p>
                        </div>
                    </div>

                    {filePath && (
                        <div className="file-actions">
                            <button onClick={handleOpenFile} className="open-file-button">
                                Open Generated File
                            </button>
                            <p className="file-path">File saved to: {filePath}</p>
                        </div>
                    )}

                    <div className="next-steps-box">
                        <div className="next-steps-header">
                            <div className="next-steps-icon">📋</div>
                            <div className="next-steps-content">
                                <h3 className="next-steps-title">Next Steps</h3>
                                <p className="next-steps-description">
                                    The Innovator Compilations have been generated. Now, send this email to your Domain-Experts:
                                </p>
                                
                                <div className="email-template">
                                    <p className="email-subject">
                                        <strong>Subject:</strong> MDII Evaluation - Complete Your Expert Assessment
                                    </p>
                                    <div className="email-body">
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
                    </div>
                </div>
            )}
        </div>
    </div>
);

export default CompilationPage;