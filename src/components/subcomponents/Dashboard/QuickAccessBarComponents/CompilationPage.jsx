import React, { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import PageHeader from "./SharedComponents/PageHeader";
import GenerationForm from "./SharedComponents/GenerationForm";
import SuccessContent from "./SharedComponents/SuccessContent";
import { useLoadingProgress } from "./Hooks/useLoadingProgress";
import mdiiEmailTemplate from "../../../../assets/emailTemplates/mdiiEmailTemplate";

// Move API constants and function outside component
const API_TOKEN = "fc37a9329918014ef595b183adcef745a4beb217";
const BASE_URL = "https://kf.kobotoolbox.org/api/v2";
const MAIN_FORM_ID = "aJn2DsjpAeJjrB6VazHjtz";
const TOOL_ID_FIELD = "ID";
const MATURITY_FIELD = "tool_maturity";

const getToolMaturity = async (toolId) => {
  try {
    const headers = {
      "Authorization": `Token ${API_TOKEN}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
    };
    
    const url = `${BASE_URL}/assets/${MAIN_FORM_ID}/data.json`;
    
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    const results = data.results || [];
    
    // Find the matching tool record
    for (const record of results) {
      const recordId = String(record[TOOL_ID_FIELD] || "").trim();
      if (recordId === String(toolId).trim()) {
        const maturityValue = String(record[MATURITY_FIELD] || "").trim();
        
        // Convert to the format your frontend expects
        if (maturityValue === "early_stage") {
          return "early";
        } else if (maturityValue === "advance_stage") {
          return "advanced";
        }
        return "advanced"; // default
      }
    }
    
    throw new Error(`Tool ID '${toolId}' not found`);
    
  } catch (error) {
    console.error("Error fetching tool maturity:", error);
    throw error;
  }
};

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
  const progress = useLoadingProgress(isLoading);
  const [maturityStage, setMaturityStage] = useState(null);

  useEffect(() => {
    if (toolId && showSuccessMessage) {
      getToolMaturity(toolId)
        .then(setMaturityStage)
        .catch(error => {
          console.error("Failed to get tool maturity:", error);
          setMaturityStage("advanced"); // Default fallback
        });
    }
  }, [toolId, showSuccessMessage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="innovator-container">
      <button onClick={() => setCurrentPage("home")} className="back-btn">
        <GoArrowLeft />
      </button>

      <div className="innovator-content">
        <PageHeader
          title="Generate Innovator Compilation"
          subtitle="Create a standardized Excel file with responses from Innovators and final reports with all evaluation data specific for each domain expert"
        />

        <section className="innovator-section">
          <div className="innovator-section-header">
            <HiOutlineClipboardDocumentList />
            <div>
              <h2>Compilation Generator</h2>
              <p>Enter your tool code to generate an Excel report</p>
            </div>
          </div>

          {!showSuccessMessage ? (
            <GenerationForm
              toolId={toolId}
              setToolId={setToolId}
              onGenerate={handleGenerateExcel}
              isLoading={isLoading}
              progress={progress}
              status={status}
              filePath={filePath}
              onOpenFile={handleOpenFile}
              buttonText="Generate Report"
              loadingText="Generating..."
              tip="Codes are case-sensitive and typically start with MDII"
            />
          ) : (
            <SuccessContent
              title="Compilation Successfully Generated"
              description="Your Excel file has been generated."
              toolId={toolId}
              filePath={filePath}
              onOpenFile={handleOpenFile}
              emailTemplate={mdiiEmailTemplate}
              maturityStage={maturityStage}
              showNextSteps={true}
              nextStepsTitle="Next Steps"
              nextStepsDescription="Share the generated compilation with your Domain-Experts via email."
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default CompilationPage;