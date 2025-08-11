import React, { useState, useEffect } from "react";
import HomePage from "./subcomponents/HomePage";
import CompilationPage from "./subcomponents/CompilationPage";
import HowItWorksGuide from "./subcomponents/HowItWorksGuide ";

const App = () => {
    const [currentPage, setCurrentPage] = useState("home");
    const [toolId, setToolId] = useState("");
    const [status, setStatus] = useState("");
    const [filePath, setFilePath] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!window.electronAPI) {
            setStatus("Error: Electron API not available. Please check preload script.");
            console.error("window.electronAPI is not defined");
        }
    }, []);

    const handleGenerateExcel = async () => {
        if (!toolId) {
            setStatus("Please enter a Tool ID");
            return;
        }

        if (!window.electronAPI?.generateExcel) {
            setStatus("Error: Electron API not available");
            return;
        }

        setIsLoading(true);
        setStatus("Generating Excel file...");
        
        try {
            const result = await window.electronAPI.generateExcel(toolId);
            setStatus("Excel generated successfully!");
            setFilePath(result);
        } catch (error) {
            console.error("Excel generation error:", error);
            setStatus(`Error: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenFile = () => {
        if (filePath && window.electronAPI?.openFile) {
            window.electronAPI.openFile(filePath);
        }
    };

    return (
        <>
            {currentPage === "home" ? (
                <HomePage setCurrentPage={setCurrentPage} />
            ) : currentPage === "howItWorks" ? (
                <HowItWorksGuide setCurrentPage={setCurrentPage} />
            ) : (
                <CompilationPage
                    toolId={toolId}
                    setToolId={setToolId}
                    handleGenerateExcel={handleGenerateExcel}
                    status={status}
                    filePath={filePath}
                    handleOpenFile={handleOpenFile}
                    isLoading={isLoading}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </>
    );
};

export default App;