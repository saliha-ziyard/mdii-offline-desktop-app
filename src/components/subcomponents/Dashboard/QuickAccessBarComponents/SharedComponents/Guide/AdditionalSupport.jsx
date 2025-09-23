import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";

const AdditionalSupport = ({ setCurrentPage, setActiveSection, activeSection }) => {
  return (
    <div className="content-body">
      <h3>Additional Support</h3>
      <p>
        If you encounter issues not covered in the Troubleshooting section or need further assistance with the MDII Desktop App, our support team is here to help.
      </p>
      <div className="grey-box">
        <h4>Contact Us</h4>
        <p>
          Email: <a href="mailto:mdii-support@cgiar.org">mdii-support@cgiar.org</a>
        </p>
        <p>
          Please include your Tool ID, a brief description of the issue, and any relevant details (e.g., error messages, steps taken) to help us assist you quickly.
        </p>
      </div>
      <div className="grey-box">
        <h4>Online Resources</h4>
        <p>
          Visit the <a href="https://mdii.cgiar.org">MDII Website</a> for additional resources, including:
        </p>
        <ul>
          <li>User manuals and guides</li>
          <li>FAQs and knowledge base</li>
          <li>Links to KoboToolbox documentation for offline data collection</li>
        </ul>
      </div>
    </div>
  );
};

export default AdditionalSupport;