import React from "react";
import { BsCopy } from "react-icons/bs";

const EmailTemplate = ({ subject, body }) => {
  const handleCopy = () => {
    const fullText = `Subject: ${subject}\n\n${body.join("\n\n")}`;
    navigator.clipboard.writeText(fullText);
  };

  return (
    <div className="email-template">
      <div className="email-header">
        <p><strong>Subject:</strong> {subject}</p>
        <button
          onClick={handleCopy}
          className="copy-btn"
          title="Copy email text"
        >
          <BsCopy className="copy-icon" />
        </button>
      </div>

      <div className="email-body">
        {body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default EmailTemplate;
