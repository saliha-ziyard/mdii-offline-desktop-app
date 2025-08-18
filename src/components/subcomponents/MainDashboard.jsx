import React from "react";
import Header from "./Header";
import { BsBoxSeam } from "react-icons/bs";
import { GoBook } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { RiWifiOffLine } from "react-icons/ri";
import { GrNotes } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { VscGraph } from "react-icons/vsc";
import { BsExclamationCircle } from "react-icons/bs";
import { IoMdLink } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

const MainDashboard = ({ setCurrentPage }) => {
  return (
    <>
    <Header />
    <div className="dashboard-container">
      <div className="main-dashboard">
        <div className="heading-main">
          <div className="icon">
            <BsBoxSeam />
          </div>
          <div className="text">
            <h1>MDII Evaluation Tool</h1>
            <p>Offline-friendly Desktop Application</p>
          </div>
        </div>
        <div className="content-area">
          <div className="sub-content">
            {/* What This Tool Does Section */}
            <section className="info-section">
              <div className="section-header-main">
                <div className="icon">
                  <GoBook />
                </div>
                <h2 className="section-title-main">What This Tool Does</h2>
              </div>
              <p className="section-description-main">
                The Multidimensional Digital Inclusivity Index (MDII) helps
                researchers, innovators, and developers assess and improve how
                inclusive a digital solution is for agrisystems in the Global
                South.
              </p>
              <p className="section-description-main">
                This is the first offline-friendly version of the MDII, designed
                for low-connectivity settings.
                <strong> Please read the user manual before you start.</strong>
              </p>

              <div className="features-grid">
                <div className="feature-box key-features">
                  <h3 className="feature-title">Key Features</h3>
                  <ul className="feature-list">
                    <li>Offline-friendly evaluations</li>
                    <li>Evidence-based recommendations</li>
                    <li>90 inclusiveness indicators</li>
                    <li>5-tier scoring system</li>
                  </ul>
                </div>

                <div className="feature-box assessment-megagroups">
                  <h3 className="feature-title">Assessment Megagroups</h3>
                  <ul className="feature-list">
                    <li>Innovation Usage</li>
                    <li>Social Consequences</li>
                    <li>Stakeholder Relationships</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Your Evaluation Journey Section */}
            <section className="journey-section">
              <div className="section-header-main">
                <div className="icon">
                  <IoSettingsOutline />
                </div>
                <h2 className="section-title-main">Your Evaluation Journey</h2>
              </div>
              <p className="section-description-main">
                These are the steps to evaluate your digital tool's
                inclusiveness
              </p>

              <div className="journey-steps">
                <div className="step-row">
                  <div className="journey-step">
                    <div className="step-content">
                      <div className="step-number-circle">1</div>
                      <h4 className="step-title">Request Code</h4>
                    </div>
                    <p className="step-description">
                      Submit evaluation request and receive your Tool ID via
                      email.
                    </p>
                  </div>
                  <div className="journey-step">
                    <div className="step-content">
                      <div className="step-number-circle">2</div>
                      <h4 className="step-title">Innovator Survey</h4>
                    </div>
                    <p className="step-description">
                      We'll send surveys and notify you when completed.
                    </p>
                  </div>
                  <div className="journey-step">
                    <div className="step-content">
                      <div className="step-number-circle">3</div>
                      <h4 className="step-title">Assign Experts</h4>
                    </div>
                    <p className="step-description">
                      Choose domain experts to assess the tool's information.
                    </p>
                  </div>
                </div>
                <div className="step-row">
                  <div className="journey-step">
                    <div className="step-content">
                      <div className="step-number-circle">4</div>
                      <h4 className="step-title">Expert PDFs</h4>
                    </div>
                    <p className="step-description">
                      Generate domain-specific PDFs for expert review.
                    </p>
                  </div>
                  <div className="journey-step">
                    <div className="step-content">
                      <div className="step-number-circle">5</div>
                      <h4 className="step-title">Data Collection</h4>
                    </div>
                    <p className="step-description">
                      Create your form link and gather data from users.
                    </p>
                  </div>
                  <div className="journey-step">
                    <div className="step-content">
                      <div className="step-number-circle">6</div>
                      <h4 className="step-title">Get MDII Report</h4>
                    </div>
                    <p className="step-description">
                      Generate your score and recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        
        {/* Sidebar - Quick Access */}
        <div className="sidebar">
            <div className="sidebar-header">
              <h3 className="sidebar-title">Quick Access</h3>
              <p className="sidebar-subtitle">
                Choose an option for your evaluation
              </p>
            </div>

            <div className="important-notice">
              <span className="notice-icon">
                <RiWifiOffLine />
              </span>
              <div className="notice-content">
                <strong>Important:</strong>
                <p>
                  You need to be online for data fetching and offline form
                  caching.
                </p>
              </div>
            </div>

            <div className="quick-access-buttons">
              <button
                className="quick-access-btn"
                onClick={() => setCurrentPage("howItWorks")}
              >
                <span className="btn-icon">
                  <GoBook />
                </span>
                <div className="btn-content">
                  <span className="btn-title">How It Works</span>
                  <span className="btn-subtitle">Read the manual first</span>
                </div>
                <span className="btn-arrow">
                  <FaArrowRightLong />
                </span>
              </button>

              <button
                className="quick-access-btn start-evaluation"              >
                <span className="btn-icon">
                  <GrNotes />
                </span>
                <div 
                  className="btn-content" 
                  onClick={() => window.open("https://ee.kobotoolbox.org/x/BQdcE4hj", "_blank")}
                >
                  <span className="btn-title">Start Evaluation</span>
                  <span className="btn-subtitle">
                    Submit an Evaluation Request
                  </span>
                </div>
                <span className="btn-arrow">
                  <FaArrowRightLong />
                </span>
              </button>

              <button
                className="quick-access-btn assign-experts"
                onClick={() => setCurrentPage("userTypeCompilation")}
              >
                <span className="btn-icon">
                  <HiOutlineUserGroup />
                </span>
                <div className="btn-content">
                  <span className="btn-title">Assign Experts</span>
                  <span className="btn-subtitle">Choose domain experts</span>
                </div>
                <span className="btn-arrow">
                  <FaArrowRightLong />
                </span>
              </button>

              <button className="quick-access-btn get-pdfs"
                onClick={() => setCurrentPage("compilation")}
              >
                <span className="btn-icon">
                  <GrNotes />
                </span>
                <div className="btn-content">
                  <span className="btn-title">Get Expert PDFs</span>
                  <span className="btn-subtitle">
                    Generate domain-specific reports
                  </span>
                </div>
                <span className="btn-arrow">
                  <FaArrowRightLong />
                </span>
              </button>

              <button className="quick-access-btn data-collection">
                <span className="btn-icon">
                  <IoMdLink />
                </span>
                <div className="btn-content">
                  <span className="btn-title">Get Data Collection Link</span>
                  <span className="btn-subtitle">
                    Create a form for end users
                  </span>
                </div>
                <span className="btn-arrow">
                  <FaArrowRightLong />
                </span>
              </button>

              <button className="quick-access-btn mdii-report">
                <span className="btn-icon">
                  <VscGraph />
                </span>
                <div className="btn-content">
                  <span className="btn-title">Get MDII Report</span>
                  <span className="btn-subtitle">
                    View scores and recommendations
                  </span>
                </div>
                <span className="btn-arrow">
                  <FaArrowRightLong />
                </span>
              </button>
            </div>
        </div>
        </div>

        <div className="troubleshooting-section">
          <h4 className="troubleshoot-title">
            <BsExclamationCircle /> <p>Troubleshooting</p>
          </h4>
          <hr/>

          <div className="troubleshoot-item">
            <strong>Tool ID Not Working?</strong>
            <p>
              Ensure surveys are completed and you have the correct ID from your
              email.
            </p>
          </div>

          <div className="troubleshoot-item">
            <strong>Offline Form Issues</strong>
            <p>
              Look for the offline icon (empty bars with checkmark) in your
              browser.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default MainDashboard;