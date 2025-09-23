import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";

const FurtherReading = ({ setCurrentPage, setActiveSection, activeSection }) => {
  return (
    <div className="content-body">
      <h3>Further Reading</h3>
      <p>
        To deepen your understanding of the MDII framework and its applications, we recommend exploring the following resources:
      </p>
      <div className="grey-box">
        <h4>Key Resources</h4>
        <ul>
          <li>
            <a href="https://mdii.cgiar.org/docs/framework">MDII Framework Documentation</a>: Detailed guide on the methodology, dimensions, and indicators.
          </li>
          <li>
            <a href="https://mdii.cgiar.org/docs/case-studies">MDII Case Studies</a>: Real-world examples of MDII evaluations in action.
          </li>
          <li>
            <a href="https://support.kobotoolbox.org">KoboToolbox Support</a>: Comprehensive documentation for offline and online survey collection.
          </li>
          <li>
            <a href="https://mdii.cgiar.org/docs/technical-guide">MDII Technical Guide</a>: In-depth explanation of the Excel workbook and data processing.
          </li>
        </ul>
      </div>
      <div className="grey-box">
        <h4>Additional Materials</h4>
        <p>
          Visit the <a href="https://mdii.cgiar.org/resources">MDII Resource Hub</a> for white papers, webinars, and community forums on digital inclusiveness.
        </p>
      </div>
    </div>
  );
};

export default FurtherReading;
