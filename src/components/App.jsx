import React, { useState, useEffect } from "react";
import HomePage from "./subcomponents/HomePage";
import CompilationPage from "./subcomponents/CompilationPage";
import HowItWorksGuide from "./subcomponents/HowItWorksGuide ";
import UserTypeCompilationPage from "./subcomponents/UserTypeCompilationPage";
import MainDashboard from "./subcomponents/MainDashboard";
import Footer from "./subcomponents/Footer";
import Header from "./subcomponents/Header";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [toolId, setToolId] = useState("");
  const [status, setStatus] = useState("");
  const [filePath, setFilePath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (!window.electronAPI) {
      setStatus(
        "Error: Electron API not available. Please check preload script."
      );
      console.error("window.electronAPI is not defined");
    }
  }, []);

  // Step 1: Generate Innovator Excel + Domain PDFs only
  const handleGenerateInnovatorExcel = async () => {
    if (!toolId) {
      setStatus("Please enter a Tool ID");
      return;
    }

    if (!window.electronAPI?.generateInnovatorExcel) {
      setStatus("Error: Electron API not available");
      return;
    }

    setIsLoading(true);
    setStatus("Generating Innovator Excel file and domain PDFs...");

    try {
      const result = await window.electronAPI.generateInnovatorExcel(toolId);
      setStatus("Innovator Excel file and domain PDFs generated successfully!");
      setFilePath(result);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Excel generation error:", error);
      setStatus(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Generate Full Excel (Innovator + UserType2) + All PDFs
  const handleGenerateFullExcel = async () => {
    if (!toolId) {
      setStatus("Please enter a Tool ID");
      return;
    }

    if (!window.electronAPI?.generateFullExcel) {
      setStatus("Error: Electron API not available");
      return;
    }

    setIsLoading(true);
    setStatus("Generating complete Excel file with all sheets and PDFs...");

    try {
      const result = await window.electronAPI.generateFullExcel(toolId);
      setStatus("Complete Excel file and all PDFs generated successfully!");
      setFilePath(result);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Excel generation error:", error);
      setStatus(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Legacy function for backward compatibility
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
      setShowSuccessMessage(true);
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
      <Header />
      {currentPage === "home" ? (
        <MainDashboard setCurrentPage={setCurrentPage} />
      ) : currentPage === "howItWorks" ? (
        <HowItWorksGuide setCurrentPage={setCurrentPage} />
      ) : currentPage === "compilation" ? (
        <CompilationPage
          toolId={toolId}
          setToolId={setToolId}
          handleGenerateExcel={handleGenerateInnovatorExcel}
          status={status}
          filePath={filePath}
          handleOpenFile={handleOpenFile}
          isLoading={isLoading}
          setCurrentPage={setCurrentPage}
          showSuccessMessage={showSuccessMessage}
        />
      ) : currentPage === "userTypeCompilation" ? (
        <UserTypeCompilationPage
          toolId={toolId}
          setToolId={setToolId}
          handleGenerateExcel={handleGenerateFullExcel}
          status={status}
          filePath={filePath}
          handleOpenFile={handleOpenFile}
          isLoading={isLoading}
          setCurrentPage={setCurrentPage}
          showSuccessMessage={showSuccessMessage}
        />
      ) : null}

      <Footer />
    </>
  );
};

export default App;