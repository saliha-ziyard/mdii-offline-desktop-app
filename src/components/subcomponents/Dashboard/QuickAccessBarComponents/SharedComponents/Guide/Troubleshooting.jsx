import React, { useState } from "react";
import { BsExclamationTriangle } from "react-icons/bs";

const Troubleshooting = ({ setCurrentPage, setActiveSection, activeSection }) => {
  const [activeTab, setActiveTab] = useState("common");

  return (
    <div className="content-body">
      <h3>Troubleshooting</h3>
      <p>
        Encountering issues with the MDII Desktop App or evaluation process? This section provides solutions to common problems, step-by-step troubleshooting guides, and tips to ensure a smooth evaluation experience.
      </p>

      <div className="tab-header">
        <button
          className={`tab-button ${activeTab === "common" ? "active" : ""}`}
          onClick={() => setActiveTab("common")}
        >
          <BsExclamationTriangle /> Common Issues
        </button>
        <button
          className={`tab-button ${activeTab === "app" ? "active" : ""}`}
          onClick={() => setActiveTab("app")}
        >
          ⚙️ App Problems
        </button>
        <button
          className={`tab-button ${activeTab === "evaluation" ? "active" : ""}`}
          onClick={() => setActiveTab("evaluation")}
        >
          📊 Evaluation Help
        </button>
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {activeTab === "common" && (
          <div>
            <h4>Frequently Encountered Problems</h4>
            <div className="green-box box">
              <h5>Tool Not Loading Properly</h5>
             <p><b>Symptoms:</b> App crashes, blank screens, or frozen interface</p>
             <p><b>Solutions:</b></p>
             <ul>
              <li>Restart the MDII Desktop App</li>
              <li>Check your internet connection</li>
              <li>Clear application cache and restart</li>
              <li>Ensure you have sufficient system memory available</li>
             </ul>
            </div>
            <div className="blue-box box">
              <h5>Survey Responses Not Saving</h5>
             <p><b>Symptoms:</b> Progress lost when returning to surveys</p>
             <p><b>Solutions:</b></p>
             <ul>
              <li>Check network connectivity during survey completion</li>
              <li>Complete surveys in one session when possible</li>
              <li>Use the "Save Progress" feature regularly</li>
              <li>Avoid browser refresh during survey completion</li>
             </ul>
            </div>
            <div className="orange-box box">
              <h5>Incorrect Tool Version Selected</h5>
             <p><b>Symptoms:</b> Evaluation questions don't match your tool's maturity level</p>
             <p><b>Solutions:</b></p>
             <ul>
              <li>Verify your tool profile in the database is accurate</li>
              <li>Contact support if automatic detection seems incorrect</li>
              <li>Review tool maturity criteria to confirm appropriate version</li>
             </ul>
            </div>
          </div>
        )}
        {activeTab === "app" && (
          <div>
            <h4>Desktop Application Issues</h4>
            <div className="green-box box">
            <h5>Installation Problems</h5>
             <ul>
              <li>Ensure your system meets minimum requirements</li>
              <li>Run installer as administrator (Windows)</li>
              <li>Check available disk space (minimum 500MB required)</li>
              <li>Temporarily disable antivirus during installation</li>
             </ul>
            </div>
            <div className="blue-box box">
            <h5>Performance Issues</h5>
             <ul>
              <li>Close unnecessary applications to free up memory</li>
              <li>Check for app updates in the settings menu</li>
              <li>Restart your computer if app becomes sluggish</li>
              <li>Consider upgrading RAM if consistently slow</li>
             </ul>
            </div>
          <div className="orange-box box">
            <h5>Data Sync Issues</h5>
             <ul>
              <li>Verify internet connection stability</li>
              <li>Check firewall settings aren't blocking the app</li>
              <li>Try manual sync from the settings menu</li>
              <li> Contact support if sync consistently fails</li>
             </ul>
            </div>
          </div>
        )}
        {activeTab === "evaluation" && (
          <div>
            <h4>Evaluation Process Support</h4>
            
            <div className="green-box box">
              <h5>Understanding Questions</h5>
              <ul>
                <li>Use the built-in help tooltips next to each question</li>
                <li>Refer to the framework documentation for detailed definitions</li>
                <li>Contact your evaluation coordinator for clarification</li>
                <li>Mark questions for review and return later if needed</li>
              </ul>
            </div>
            
            <div className="blue-box box">
              <h5>Expert Panel Coordination</h5>
              <ul>
                <li>Ensure all experts have completed their individual evaluations</li>
                <li>Schedule consensus meetings well in advance</li>
                <li>Prepare discussion points for areas with high disagreement</li>
                <li>Use the disagreement reports to focus discussions efficiently</li>
              </ul>
            </div>
            
            <div className="orange-box box">
              <h5>Report Generation Problems</h5>
              <ul>
                <li>Ensure all required sections are completed before generating reports</li>
                <li>Check that expert consensus has been reached for all dimensions</li>
                <li>Verify PDF export settings match your organization's requirements</li>
                <li>Try regenerating reports if initial export appears incomplete</li>
              </ul>
            </div>

          <div className="purple-box box">
            <h3>Still Need Help?</h3>
            <p>If you're continuing to have trouble after following the suggested steps, consider the following:</p>
            <ul>
              <li>Take note of any specific error messages or unusual behavior</li>
              <li>Record your system details and app version</li>
              <li>Reach out to technical support with as much context as possible</li>
              <li>For more complex problems, a screen-share session might be helpful</li>
            </ul>
          </div>

          </div>



        )}
      </div>
    </div>
  );
};

export default Troubleshooting;
