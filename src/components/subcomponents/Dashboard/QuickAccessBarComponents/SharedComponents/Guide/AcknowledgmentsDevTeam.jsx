import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";

const AcknowledgmentsDevTeam = ({ setCurrentPage, setActiveSection, activeSection }) => {
  return (
    <div className="content-body">
      <h3>Acknowledgments & Development Team</h3>
      <p>
        The MDII Desktop App was developed through a collaborative effort to advance digital inclusiveness in agrisystems, particularly in low- and middle-income countries (LMICs). We are grateful to the following contributors and supporters:
      </p>
      <div className="grey-box">
        <h4>Development Team</h4>
        <ul>
          <li><strong>CGIAR Digital Innovation Initiative</strong>: Led the conceptualization and framework development.</li>
          <li><strong>Technical Development Team</strong>: Designed and built the offline-friendly desktop app and Excel workbook.</li>
          <li><strong>Domain Experts</strong>: Provided critical insights for GESI, ICT, Data, Economics, and Country-Specific contexts.</li>
        </ul>
      </div>
      <div className="grey-box">
        <h4>Acknowledgments</h4>
        <p>
          Special thanks to our partners, including KoboToolbox for enabling offline data collection, and the broader CGIAR network for their support in testing and refining the MDII framework.
        </p>
        <p>
          We also acknowledge the contributions of field coordinators, evaluators, and end users who provided feedback to improve the app’s usability and effectiveness.
        </p>
      </div>
      <div className="grey-box">
        <h4>Contact</h4>
        <p>
          For inquiries about the MDII project or to join our community of contributors, please reach out to <a href="mailto:mdii-support@cgiar.org">mdii-support@cgiar.org</a>.
        </p>
      </div>
    </div>
  );
};

export default AcknowledgmentsDevTeam;
