import React, { useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";

const ExpertManagement = ({ setCurrentPage, setActiveSection, activeSection }) => {
  const [nestedExpanded, setNestedExpanded] = useState({ componentTab: "expert-roles" });

  const toggleNested = (nestedId) => {
    setNestedExpanded((prev) => ({
      ...prev,
      [nestedId]: nestedId === prev[nestedId] ? "expert-roles" : nestedId,
    }));
  };

  return (
    <div className="content-body">
      <h3>Expert Management</h3>
      <p>
        Managing domain experts and their contributions to the MDII evaluation.
      </p>

      <div className="component-tabs">
        <div className="tab-header">
          <button
            className={`tab-button ${
              !nestedExpanded.componentTab ||
              nestedExpanded.componentTab === "expert-roles"
                ? "active"
                : ""
            }`}
            onClick={() => toggleNested("componentTab")}
          >
            Expert Roles
          </button>
          <button
            className={`tab-button ${
              nestedExpanded.componentTab === "selection-criteria" ? "active" : ""
            }`}
            onClick={() =>
              setNestedExpanded((prev) => ({
                ...prev,
                componentTab: "selection-criteria",
              }))
            }
          >
            Selection Criteria
          </button>
          <button
            className={`tab-button ${
              nestedExpanded.componentTab === "selection-process" ? "active" : ""
            }`}
            onClick={() =>
              setNestedExpanded((prev) => ({
                ...prev,
                componentTab: "selection-process",
              }))
            }
          >
            Selection Process
          </button>
        </div>

        <div className="tab-content">
          {(!nestedExpanded.componentTab ||
            nestedExpanded.componentTab === "expert-roles") && (
            <div>
              <h4>Role of Domain Experts</h4>
              <p>Domain experts provide an independent perspective on how inclusive a digital tool is across critical dimensions like GESI, ICT, Data, Economics, and more. They <strong> do not represent tool developers or project teams.</strong> Their role is to apply their subject-matter knowledge to interpret and assess the information provided by innovators.</p>
              <p>Each MDII evaluation should include at least one expert per relevant domain, depending on the version being used (Regular or Ex-Ante). These experts help validate the inclusiveness of the tool from different disciplinary angles.</p>
            </div>
          )}

          {nestedExpanded.componentTab === "selection-criteria" && (
            <div>
              <h4>Selection Criteria</h4>
              <p>Domain experts can be internal or external to the organization conducting the evaluation, but they must meet two key criteria:</p>
              <div>
                <p><strong>1. Subject-matter Relevance</strong></p>
                <p>The individual should have recognized expertise in one of the required domains:</p>
                <ul>
                  <li>Gender Equality and Social Inclusion</li>
                  <li>Data</li>
                  <li>Human-Centered Design (Regular Version only)</li>
                  <li>Information and Communication Technologies</li>
                  <li>Economics</li>
                  <li>Country Expert</li>
                </ul>
              </div>
              <div>
                <p><strong>2. Independence from the Tools</strong></p>
                <p>Experts must not have been involved in the development, design, implementation, or promotion of the tool under evaluation. Their perspective should be impartial and based on professional knowledge of the domain.</p>
              </div>
            </div>
          )}

          {nestedExpanded.componentTab === "selection-process" && (
            <div>
              <h4>How to Identify and Select Experts</h4>
              <p>The person coordinating the evaluation should take the following steps:</p>
              <p>
                1. Start with your institution or program team - look for subject-matter expertise without direct tool involvement.<br />
                2. Expand to trusted networks - partner institutions, universities, domain-specific networks.<br />
                3. Verify eligibility - ensure both domain relevance and independence criteria are met.<br />
                4. Send clear invitation - explain purpose, contribution, time commitment (30-60 minutes), and importance of independence.
              </p>
              <div className="box blue-box">
                <h4>Coordination Tips</h4>
                <ul>
                  <li>Aim for diversity across the expert pool—gender, geography, and institutional backgrounds.</li>
                  <li>Experts can be identified at any stage, but surveys should only be shared after innovator inputs are complete.</li>
                  <li>Keep track of which domains have been assigned and who is responsible for each.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpertManagement;
