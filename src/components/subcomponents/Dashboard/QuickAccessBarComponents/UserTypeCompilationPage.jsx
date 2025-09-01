import React, { useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import PageHeader from "./SharedComponents/PageHeader";
import GenerationForm from "./SharedComponents/GenerationForm";
import SuccessContent from "./SharedComponents/SuccessContent";
import { useLoadingProgress } from "./Hooks/useLoadingProgress";

const UserTypeCompilationPage = ({
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle status with sub-items for UserTypeII
  const statusWithSubItems = status && status.includes("UserTypeII") ? {
    message: status,
    subItems: [
      "✓ Innovator Answers sheet filled",
      "✓ UserTypeII Answers sheet filled", 
      "✓ PDF reports generated"
    ]
  } : status;

  return (
    <div className="innovator-container">
      <button onClick={() => setCurrentPage("home")} className="back-btn">
        <GoArrowLeft />
      </button>

      <div className="innovator-content">
        <PageHeader 
          title="Generate Final Excel Document with all evaluations"
          subtitle="Create a standardized Excel file with responses from Innovators, Domain Experts, Direct Users, and Downstream Beneficiaries"
        />

        <section className="innovator-section">
          <div className="innovator-section-header">
            <HiOutlineClipboardDocumentList />
            <div>
              <h2>Generate Final Reports</h2>
              <p>Enter your tool code to generate comprehensive Excel reports</p>
            </div>
          </div>

          {!showSuccessMessage ? (
            <GenerationForm
              toolId={toolId}
              setToolId={setToolId}
              onGenerate={handleGenerateExcel}
              isLoading={isLoading}
              progress={progress}
              status={statusWithSubItems}
              filePath={filePath}
              onOpenFile={handleOpenFile}
              buttonText="Generate Final Report"
              loadingText="Generating..."
              tip="Codes are case-sensitive and typically start with MDII"
            />
          ) : (
            <SuccessContent
              title="Compilation Successfully Generated"
              description="The Excel file has been generated with all evaluation data."
              toolId={toolId}
              filePath={filePath}
              onOpenFile={handleOpenFile}
              // No emailTemplate, showNextSteps, or next steps props passed
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default UserTypeCompilationPage;