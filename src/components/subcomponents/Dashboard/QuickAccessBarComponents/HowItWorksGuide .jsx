import React, { useState, useEffect } from "react";
import { GoBook, GoArrowLeft } from "react-icons/go";
import { BsLightbulb, BsGear, BsExclamationTriangle } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";

const UserManual = ({ setCurrentPage = () => {} }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const renderExpandedContent = (sectionId) => {
    if (expandedSection !== sectionId) return null;

    const content = {
      system: (
        <div className="section-content">
          <p>
            Across the Global South, digital solutions have arisen to empower
            farmers and consumers in agrisystems. Yet if some groups—for example
            women, the elderly or people with little formal education—are less
            able to access or use innovations, they will exacerbate existing
            inequalities.
          </p>

          <p>
            The Multidimensional Digital Inclusivity Index (MDII) allows
            researchers and innovators to understand how they can improve the
            inclusiveness of a digital solution. It consists of an assessment
            provided by external evaluators that quantifies how well the
            solution is doing across a comprehensive set of inclusivity
            indicators, and provides actionable insights into how they can
            improve adoption by a wider range of users.
          </p>

          <p>
            MDII is unique in that it is tailored for agrisystems, highlighting
            the gender, socioeconomic, technological and location-specific
            barriers to adoption by farmers in Global South contexts. It is
            created with the goal of ensuring that digital solutions are
            accessible, equitable and inclusive for underrepresented
            communities.
          </p>

          <h3
            style={{
              marginTop: "24px",
              marginBottom: "16px",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Methodology
          </h3>
          <p>
            MDII is a structured evaluation framework that recognizes the
            importance of inclusivity at all stages of innovation development.
          </p>

          <p>
            The framework consists of 90 indicators, which inform 27
            subdimensions of seven dimensions, covering three megagroups:
            Innovation usage, Social consequences, and Stakeholder
            relationships.
          </p>

          <p>
            The solution is given a score using a five-tier system for
            inclusivity across each dimension and subdimension. This makes it
            simple to identify points of strength and areas for improvement.
          </p>

          <p>
            Based on this data, domain expertise and input from stakeholders,
            the evaluation team provides recommendations and actionable insights
            for improvement.
          </p>
        </div>
      ),
      evaluation: (
        <div> 
        </div>
      ),
      expert: (
        <div>
        </div>
      ),
      offline: (
        <div>
        </div>
      ),
      report: (
        <div>    
        </div>
      ),
      troubleshooting: (
        <div></div>
      ),
    };

    return content[sectionId];
  };

  return (
    <div className="hiw-container">
      <button onClick={() => setCurrentPage("home")} className="back-btn">
        <GoArrowLeft />
      </button>

      <div className="hiw-content">
        <h1>User Manual</h1>
        <p className="subtitle">
          Comprehensive guide for conducting MDII evaluations using the offline
          desktop application
        </p>

        {/* Quick Navigation */}
        <div className="quick-navigation">
          <div>
            <div className="quick-nav-header">
              <GoBook />
              <h2>Quick Navigation</h2>
            </div>
            <p className="quick-nav-subtitle">
              Jump to specific sections of the manual
            </p>

            <hr />
          </div>
          <div className="nav-grid">
            <div className="nav-card" onClick={() => toggleSection("system")}>
              <div className="nav-card-header">
                <GoBook />
                <h3>System Overview</h3>
              </div>
              <p>Understanding the MDII evaluation framework and methodology</p>
            </div>

            <div
              className="nav-card"
              onClick={() => toggleSection("evaluation")}
            >
              <div className="nav-card-header">
                <HiOutlineClipboardDocumentList />
                <h3>Evaluation Workflow</h3>
              </div>
              <p>Step-by-step process from request to final report</p>
            </div>

            <div className="nav-card" onClick={() => toggleSection("expert")}>
              <div className="nav-card-header">
                <BsLightbulb />
                <h3>Expert Management</h3>
              </div>
              <p>Managing domain experts and their evaluation contributions</p>
            </div>

            <div className="nav-card" onClick={() => toggleSection("offline")}>
              <div className="nav-card-header">
                <BsGear />
                <h3>Offline Capabilities</h3>
              </div>
              <p>Working without internet connectivity</p>
            </div>

            <div className="nav-card" onClick={() => toggleSection("report")}>
              <div className="nav-card-header">
                <HiOutlineClipboardDocumentList />
                <h3>Report Generation</h3>
              </div>
              <p>Understanding MDII scores and recommendations</p>
            </div>

            <div
              className="nav-card"
              onClick={() => toggleSection("troubleshooting")}
            >
              <div className="nav-card-header">
                <BsExclamationTriangle />
                <h3>Troubleshooting</h3>
              </div>
              <p>Common issues and solutions</p>
            </div>
          </div>
        </div>

        {/* Discover More Section */}
        <div className="discover-section">
          <div className="discover-header">
            <h3>Discover more about MDII</h3>
            <a
              href="https://mdii.iwmi.org"
              className="discover-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website: mdii.iwmi.org
            </a>{" "}
          </div>

          <div className="resources-section">
            <h4>Resources</h4>
            <div className="resource-item">
              <p>
                <b>
                  A multi-dimensional framework for responsible and socially
                  inclusive digital innovation in food, water, and land systems
                </b>
                <br />
                Opola, F., Langan, S., Arulingam, I., Schumann, C., Singaraju,
                N., Joshi, D., Ghosh, S. (2025).
              </p>
              <a
                href="https://hdl.handle.net/10568/174461"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://hdl.handle.net/10568/174461
              </a>{" "}
            </div>

            <div className="resource-item">
              <p>
                <b>
                  Development of the conceptual framework (version 2.0) of the
                  Multidimensional Digital Inclusiveness Index
                </b>
                <br />
                Martins, C. I., Opola, F., Jacobs-Mata, I., Garcia Andarcia, M.,
                Norfje, K., Joshi, D., Singaraju, N., Muller, A., Christen, R.,
                Malhotra, A. (2023).
              </p>
              <a
                href="https://hdl.handle.net/10568/138705"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://hdl.handle.net/10568/138705
              </a>{" "}
            </div>
          </div>
        </div>

        {/* Manual Contents */}
        <div className="manual-contents">
          <div className="contents-header">
            <h2>Manual Contents</h2>
            <p className="contents-subtitle">
              Detailed information organized by functional areas
            </p>
          </div>

          <div className="content-items">
            <div
              className="content-item"
              onClick={() => toggleSection("system")}
            >
              <GoBook />
              <div className="content-item-text">
                <h3>System Overview</h3>
                <p>
                  Understanding the MDII evaluation framework and methodology
                </p>
              </div>
              <span
                className={`expand-icon ${
                  expandedSection === "system" ? "expanded" : ""
                }`}
              >
                ▶
              </span>
            </div>
            {renderExpandedContent("system")}

            <div
              className="content-item"
              onClick={() => toggleSection("evaluation")}
            >
              <HiOutlineClipboardDocumentList />
              <div className="content-item-text">
                <h3>Evaluation Workflow</h3>
                <p>Step-by-step process from request to final report</p>
              </div>
              <span
                className={`expand-icon ${
                  expandedSection === "evaluation" ? "expanded" : ""
                }`}
              >
                ▶
              </span>
            </div>
            {renderExpandedContent("evaluation")}

            <div
              className="content-item"
              onClick={() => toggleSection("expert")}
            >
              <BsLightbulb />
              <div className="content-item-text">
                <h3>Expert Management</h3>
                <p>
                  Managing domain experts and their evaluation contributions
                </p>
              </div>
              <span
                className={`expand-icon ${
                  expandedSection === "expert" ? "expanded" : ""
                }`}
              >
                ▶
              </span>
            </div>
            {renderExpandedContent("expert")}

            <div
              className="content-item"
              onClick={() => toggleSection("offline")}
            >
              <BsGear />
              <div className="content-item-text">
                <h3>Offline Capabilities</h3>
                <p>Working without internet connectivity</p>
              </div>
              <span
                className={`expand-icon ${
                  expandedSection === "offline" ? "expanded" : ""
                }`}
              >
                ▶
              </span>
            </div>
            {renderExpandedContent("offline")}

            <div
              className="content-item"
              onClick={() => toggleSection("report")}
            >
              <HiOutlineClipboardDocumentList />
              <div className="content-item-text">
                <h3>Report Generation</h3>
                <p>Understanding MDII scores and recommendations</p>
              </div>
              <span
                className={`expand-icon ${
                  expandedSection === "report" ? "expanded" : ""
                }`}
              >
                ▶
              </span>
            </div>
            {renderExpandedContent("report")}

            <div
              className="content-item"
              onClick={() => toggleSection("troubleshooting")}
            >
              <BsExclamationTriangle />
              <div className="content-item-text">
                <h3>Troubleshooting</h3>
                <p>Common issues and solutions</p>
              </div>
              <span
                className={`expand-icon ${
                  expandedSection === "troubleshooting" ? "expanded" : ""
                }`}
              >
                ▶
              </span>
            </div>
            {renderExpandedContent("troubleshooting")}
          </div>
        </div>

        {/* Additional Support */}
        <div className="additional-support">
          <h2>Additional Support</h2>
          <p className="subtitle">Resources for further assistance</p>

          <div className="support-grid">
            <div className="support-card">
              <h3>Technical Support</h3>
              <p>For technical issues or system-related questions</p>
              <div className="contact-info">mdii@cgiar.org</div>
            </div>

            <div className="support-card">
              <h3>Methodology Questions</h3>
              <p>For evaluation methodology and process guidance</p>
              <div className="contact-info">mdii@mdii.org</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManual;
