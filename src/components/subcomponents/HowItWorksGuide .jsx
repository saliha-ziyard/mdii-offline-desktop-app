import React, { useState, useEffect } from "react";
import { GoBook, GoArrowLeft } from "react-icons/go";
import { BsLightbulb, BsGear, BsExclamationTriangle } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";

const HowItWorksGuide = ({ setCurrentPage = () => {} }) => {
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      }, []);

  return (
    <div className="hiw-container">
      <button onClick={() => setCurrentPage("home")} className="back-btn">
        <GoArrowLeft />
      </button>

      <div className="hiw-content">
        <h1>How to use the MDII Evaluation Tool</h1>
        <p className="subtitle">A comprehensive guide to help you navigate the offline-friendly evaluation process with ease</p>

        <section className="section">
          <div className="section-header">
            <BsLightbulb />
            <div>
              <h2>What This Tool Does</h2>
              <p>Understanding the MDII Evaluation Tool</p>
            </div>
          </div>
          <p>
            The MDII Evaluation Tool allows you to generate standardized reports based on survey data. 
            This offline-friendly application helps researchers and evaluators quickly analyze and document 
            findings from field research, even in low-connectivity environments.
          </p>
          <div className="features">
            <div className="feature">
              <BsGear />
              <span>Offline-friendly operation</span>
            </div>
            <div className="feature">
              <HiOutlineClipboardDocumentList />
              <span>Automated report generation</span>
            </div>
            <div className="feature">
              <GoBook />
              <span>Consistent formatting</span>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <BsGear />
            <div>
              <h2>How to Use It</h2>
              <p>Follow these simple steps to generate your evaluation report</p>
            </div>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-header">
                {/* <RiNumber1 /> */}
                <h3>1. Request an Evaluation Code</h3>
              </div>
              <p>
                Click the "Start Evaluation" button on the main screen to open the external survey form. 
                Complete the survey to receive your unique evaluation code via email.
              </p>
              <div className="tip">
                <BsLightbulb />
                <span>Keep your email confirmation safe</span>
              </div>
            </div>

            <div className="step">
              <div className="step-header">
                {/* <RiNumber2 /> */}
                <h3>2. Enter Your Code</h3>
              </div>
              <p>
                Return to the MDII Evaluation Tool and enter your evaluation code in the input field. 
                Click "Generate Report" to fetch your data.
              </p>
              <div className="tip">
                <BsGear />
                <span>Codes are case-sensitive</span>
              </div>
            </div>

            <div className="step">
              <div className="step-header">
                {/* <RiNumber3 /> */}
                <h3>3. Generate Your Report</h3>
              </div>
              <p>
                Once your data is successfully retrieved, click the active "Generate Report" button 
                to create and download your Excel-based evaluation report.
              </p>
              <div className="tip">
                <HiOutlineClipboardDocumentList />
                <span>Report will download automatically</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <BsExclamationTriangle />
            <div>
              <h2>Troubleshooting</h2>
              <p>Common issues and their solutions</p>
            </div>
          </div>
          <div className="troubles">
            <div className="trouble">
              <div className="trouble-header">
                <BsGear />
                <h4>Invalid Evaluation Code</h4>
              </div>
              <p>If you receive an "Invalid code" message, double-check that you've entered the code exactly as it appears in your email. Codes are case-sensitive and should begin with "MDII".</p>
            </div>

            <div className="trouble">
              <div className="trouble-header">
                <BsExclamationTriangle />
                <h4>No Internet Connection</h4>
              </div>
              <p>While the MDII Evaluation Tool works offline, you'll need an internet connection to request a code via the external survey. Try using a mobile hotspot if needed.</p>
            </div>

            <div className="trouble">
              <div className="trouble-header">
                <HiOutlineClipboardDocumentList />
                <h4>Report Generation Fails</h4>
              </div>
              <p>If the report fails to generate, ensure that you have sufficient disk space on your device. If the problem persists, try restarting the application and fetching your data again.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HowItWorksGuide;