import React, { useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import PageHeader from "./SharedComponents/PageHeader";
import GenerationForm from "./SharedComponents/GenerationForm";
import SuccessContent from "./SharedComponents/SuccessContent";
import { useLoadingProgress } from "./Hooks/useLoadingProgress";
import mdiiEmailTemplate from "../../../../assets/emailTemplates/mdiiEmailTemplate";

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
          subtitle="Create standardized Excel (all innovator questions) and PDF reports from your survey data for each domain expert"
        />

        <section className="innovator-section">
          <div className="innovator-section-header">
            <HiOutlineClipboardDocumentList />
            <div>
              <h2>Compilation Generator</h2>
              <p>Enter your tool code to generate an Excel report</p>
            </div>
          </div>

          {/* {!showSuccessMessage ? ( */}
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
          {/* ) : ( */}
            <SuccessContent
              title="Compilation Successfully Generated"
              description="Your Excel file has been generated."
              toolId={toolId}
              filePath={filePath}
              onOpenFile={handleOpenFile}
              emailTemplate={mdiiEmailTemplate}
              showNextSteps={true}
              nextStepsTitle="Next Steps"
              nextStepsDescription="Share the generated compilation with your Domain-Experts via email."
            />
          {/* )} */}
        </section>
      </div>
    </div>
  );
};

export default CompilationPage;
