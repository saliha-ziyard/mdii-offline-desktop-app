import React from "react";
import { GoBook } from "react-icons/go";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BsGear } from "react-icons/bs";
import ToolIdInput from "./ToolIdInput";
import LoadingProgress from "./LoadingProgress";
import StatusMessage from "./StatusMessage";

const GenerationForm = ({
  toolId,
  setToolId,
  onGenerate,
  isLoading,
  progress,
  status,
  filePath,
  onOpenFile,
  buttonText = "Generate",
  loadingText = "Generating...",
  tip = "Codes are case-sensitive and typically start with \"MDII\"",
  label = "Tool Code"
}) => {
  return (
    <div className="innovator-form-content">
      <ToolIdInput
        value={toolId}
        onChange={setToolId}
        placeholder="Enter tool code (e.g., MDII-ABCD-123456)"
        tip={tip}
        label={label}
        icon={BsGear}
      />

      <button
        onClick={onGenerate}
        disabled={isLoading}
        className={`innovator-generate-button ${isLoading ? "disabled" : ""}`}
      >
        {isLoading ? loadingText : buttonText}
      </button>

      <LoadingProgress isLoading={isLoading} progress={progress} />
      <StatusMessage status={status} />

      {filePath && (
        <div className="innovator-file-actions">
          <button onClick={onOpenFile} className="innovator-open-file-button">
            <HiOutlineClipboardDocumentList />
            Open Generated folder
          </button>
          <p className="innovator-file-path">
            <GoBook />
            File saved to: {filePath}
          </p>
        </div>
      )}
    </div>
  );
};

export default GenerationForm;