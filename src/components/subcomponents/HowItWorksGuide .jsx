import React from "react";
import Header from "./Header";

const HowItWorksGuide = ({ setCurrentPage }) => {
  return (
    <div className="how-it-works-container">
      {/* Header */}
      <Header />
      <div className="navigation">
            <button onClick={() => setCurrentPage("home")} className="back-button">
                <span className="back-arrow">←</span>
                Back to Home
            </button>
            <h1 className="page-title">How to use the MDII Evaluation Tool</h1>
            <p className="section-description">A simple guide to help you get started with the offline evaluation process</p>
    </div>

      {/* Main Content */}
      <main className="main-content">
        {/* What This Tool Does */}
        <section className="guide-section">
          <div className="section-header">
            <div className="section-icon what">
              <span>?</span>
            </div>
            <h2 className="section-title">What This Tool Does</h2>
          </div>
          <p className="section-description">
            The MDII Evaluation Tool allows you to generate standardized reports based on survey data. 
            This offline-friendly application helps researchers and evaluators quickly analyze and document 
            findings from field research, even in low-connectivity environments. The tool streamlines the 
            evaluation process by automating report generation and ensuring consistent formatting across 
            all assessments.
          </p>
        </section>

        {/* How to Use It */}
        <section className="guide-section">
          <div className="section-header">
            <div className="section-icon how">
              <span>→</span>
            </div>
            <h2 className="section-title">How to Use It</h2>
          </div>
          <p className="section-description">Follow these simple steps to generate your evaluation report:</p>
          <div className="step-list">
            {[
              {
                step: 1,
                title: "Request an Evaluation Code",
                desc: "Click the \"Request Code\" button on the main screen to open the external survey form. Complete the survey to receive your unique evaluation code.",
                color: "purple"
              },
              {
                step: 2,
                title: "Enter Your Code",
                desc: "Return to the MDII Evaluation Tool and click \"Generate Report\" on the main screen. Enter your evaluation code in the input field and click \"Fetch Data\".",
                color: "blue"
              },
              {
                step: 3,
                title: "Generate Your Report",
                desc: "Once your data is successfully retrieved, the \"Generate Report\" button will become active. Click it to create and download your Excel-based evaluation report.",
                color: "emerald"
              }
            ].map((item) => (
              <div key={item.step} className="step-item">
                <div className={`step-number ${item.color}`}>
                  <span>{item.step}</span>
                </div>
                <div>
                  <h3 className="step-title">{item.title}</h3>
                  <p className="step-description">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="guide-section">
          <div className="section-header">
            <div className="section-icon troubleshoot">
              <span>!</span>
            </div>
            <h2 className="section-title">Troubleshooting</h2>
          </div>
          <div className="step-list">
            {[
              {
                issue: "Invalid Evaluation Code",
                solution: "If you receive an \"Invalid code\" message, double-check that you've entered the code exactly as it appears in your email. Codes are case-sensitive and should begin with \"MDII\".",
                icon: "🔑"
              },
              {
                issue: "No Internet Connection",
                solution: "While the MDII Evaluation Tool works offline, you'll need an internet connection to request a code via the external survey. If you're having connectivity issues, try using a mobile hotspot or return to a location with internet access.",
                icon: "📡"
              },
              {
                issue: "Report Generation Fails",
                solution: "If the report fails to generate, ensure that you have sufficient disk space on your device. If the problem persists, try restarting the application and fetching your data again.",
                icon: "📄"
              }
            ].map((item, index) => (
              <div key={index} className="troubleshoot-item">
                <div className="troubleshoot-header">
                  <div className="troubleshoot-icon">{item.icon}</div>
                  <h3 className="troubleshoot-title">{item.issue}</h3>
                </div>
                <p className="troubleshoot-description">{item.solution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Back Button (Removed as it's now in header) */}
      </main>

      {/* Footer */}
      <footer className="how-it-works-footer">
        <div className="footer-text">© 2025 MDII Evaluation Tool - Offline Version</div>
      </footer>
    </div>
  );
};

export default HowItWorksGuide;