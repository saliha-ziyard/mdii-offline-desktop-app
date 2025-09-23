import React, { useState } from "react";
import { GoGlobe } from "react-icons/go";
import { GiLightBulb } from "react-icons/gi";
import { GrDashboard } from "react-icons/gr";

const MDIIEcosystem = ({ setCurrentPage, setActiveSection, activeSection }) => {
  const [nestedExpanded, setNestedExpanded] = useState({ componentTab: "fullassessment" });

  const toggleNested = (nestedId) => {
    setNestedExpanded((prev) => ({
      ...prev,
      [nestedId]: nestedId === prev[nestedId] ? "fullassessment" : nestedId,
    }));
  };

  return (
    <div className="content-body">
      <h3>MDII Ecosystem</h3>
      <p>
        MDII is more than this desktop app. It's a <strong>modular ecosystem </strong> of tools tailored to different needs and connectivity environments.
      </p>
      <p>Besides this offline-friendly desktop app, there are 3 additional tools:</p>
      <div className="component-tabs">
        <div className="tab-header">
          <button
            className={`tab-button ${
              !nestedExpanded.componentTab ||
              nestedExpanded.componentTab === "fullassessment"
                ? "active"
                : ""
            }`}
            onClick={() => toggleNested("componentTab")}
          >
            <GoGlobe /> Full Assessment
          </button>
          <button
            className={`tab-button ${
              nestedExpanded.componentTab === "rapidassessment" ? "active" : ""
            }`}
            onClick={() =>
              setNestedExpanded((prev) => ({
                ...prev,
                componentTab: "rapidassessment",
              }))
            }
          >
            <GiLightBulb /> AI-Rapid Assessment
          </button>
          <button
            className={`tab-button ${
              nestedExpanded.componentTab === "mdiidashboard" ? "active" : ""
            }`}
            onClick={() =>
              setNestedExpanded((prev) => ({
                ...prev,
                componentTab: "mdiidashboard",
              }))
            }
          >
            <GrDashboard /> MDII Dashboard
          </button>
        </div>

        <div className="tab-content">
          {(!nestedExpanded.componentTab ||
            nestedExpanded.componentTab === "fullassessment") && (
            <div>
              <h4>Full Assessment</h4>
              <p className="tag">Fully Online</p>
              <div>
                <ul>
                  <li>A detailed, survey-based version of MDII, designed for use entirely through the MDII web application.</li>
                  <li>Includes automated flows to collect responses, calculate scores, and generate reports and recommendations.</li>
                  <li>Suitable for projects with reliable internet access, where users can stay connected throughout the process.</li>
                  <li>May not be ideal in low-connectivity environments, as it depends on online infrastructure to function.</li>
                </ul>
              </div>
            </div>
          )}
          {nestedExpanded.componentTab === "rapidassessment" && (
            <div>
              <h4>AI-Rapid Assessment</h4>
              <p className="tag">Fully Online</p>
              <div>
                <ul>
                  <li>A fast, AI-powered assessment tool.</li>
                  <li>Offers immediate feedback based on limited inputs</li>
                  <li>Perfect for early-stage prototypes or fast reviews</li>
                </ul>
              </div>
            </div>
          )}
          {nestedExpanded.componentTab === "mdiidashboard" && (
            <div>
              <h4>MDII Dashboard</h4>
              <p className="tag">Fully Online</p>
              <div>
                <ul>
                  <li>A centralized space to explore your results once reports are generated.</li>
                  <li>Enables tool comparison, performance tracking, and access to aggregated insights.</li>
                  <li>Useful for coordinators, decision-makers, and funders looking at multiple tools or countries.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MDIIEcosystem;
