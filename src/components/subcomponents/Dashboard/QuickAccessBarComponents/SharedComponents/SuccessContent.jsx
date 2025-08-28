import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import EmailTemplate from "./EmailTemplate";

const SuccessContent = ({
  title,
  description,
  toolId,
  filePath,
  onOpenFile,
  emailTemplate = null,
  showNextSteps = false,
  nextStepsTitle = "Next Steps",
  nextStepsDescription = null
}) => {
  return (
    <div className="innovator-success-content">
      <div className="innovator-success-header">
        <BsCheckCircle />
        <h3>{title}</h3>
      </div>
      
      <div className="innovator-compilation-details">
        <p className="details-description">{description}</p>
        <div className="innovator-file-info">
          <p>
            <strong>File:</strong> {toolId}
          </p>
          <p>
            <strong>Generated:</strong> {new Date().toLocaleString()}
          </p>
        </div>
      </div>

      {filePath && (
        <div className="innovator-file-actions">
          <button onClick={onOpenFile} className="innovator-open-file-button">
            <HiOutlineClipboardDocumentList />
            Open Generated Folder
          </button>
        </div>
      )}

      {/* {showNextSteps && nextStepsDescription && ( */}
        <div className="innovator-next-steps">
          <div className="innovator-next-steps-header">
            <div className="innovator-next-steps-content">
              <h3 className="next-steps-title">{nextStepsTitle}</h3>
              <p className="next-steps-description">{nextStepsDescription}</p>
              
              {/* {emailTemplate && ( */}
                <EmailTemplate 
                  subject={emailTemplate.subject}
                  body={emailTemplate.body}
                />
              {/* )} */}
            </div>
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default SuccessContent;