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
    setCurrentPage
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
                    Generate Compilation
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
        </div>

        <Footer />
    </div>
);

export default CompilationPage;
