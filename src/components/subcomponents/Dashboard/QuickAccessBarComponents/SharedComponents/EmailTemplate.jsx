import React from "react";

const EmailTemplate = ({ subject, body }) => {
  return (
    <div className="innovator-email-template">
      <p className="innovator-email-subject">
        <strong>Subject:</strong> {subject}
      </p>
      <div className="innovator-email-body">
        {body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default EmailTemplate;