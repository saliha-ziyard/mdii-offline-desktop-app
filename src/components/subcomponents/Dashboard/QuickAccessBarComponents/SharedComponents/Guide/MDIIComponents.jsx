import React, { useState } from "react";
import { GoGear } from "react-icons/go";

const MDIIComponents = ({ setCurrentPage, setActiveSection, activeSection }) => {
  const [nestedExpanded, setNestedExpanded] = useState({ componentTab: "maturity" });

  const toggleNested = (nestedId) => {
    setNestedExpanded((prev) => ({
      ...prev,
      [nestedId]: nestedId === prev[nestedId] ? "maturity" : nestedId,
    }));
  };

  return (
    <div className="content-body">
      <h3>MDII Components</h3>

      <p>
        This desktop app has several important elements that you should be
        familiar with. Below is a high-level overview of the components in
        the system, from data collection to output generation.
      </p>

      <div className="component-tabs">
        <div className="tab-header">
          <button
            className={`tab-button ${
              !nestedExpanded.componentTab ||
              nestedExpanded.componentTab === "maturity"
                ? "active"
                : ""
            }`}
            onClick={() =>
            setNestedExpanded((prev) => ({
              ...prev,
              componentTab: "maturity",
            }))
          }
          >
            Tool Maturity
          </button>
          <button
            className={`tab-button ${
              nestedExpanded.componentTab === "surveys" ? "active" : ""
            }`}
            onClick={() =>
              setNestedExpanded((prev) => ({
                ...prev,
                componentTab: "surveys",
              }))
            }
          >
            Surveys
          </button>
          <button
            className={`tab-button ${
              nestedExpanded.componentTab === "compilations" ? "active" : ""
            }`}
            onClick={() =>
              setNestedExpanded((prev) => ({
                ...prev,
                componentTab: "compilations",
              }))
            }
          >
            Compilations
          </button>
          <button
            className={`tab-button ${
              nestedExpanded.componentTab === "workbook" ? "active" : ""
            }`}
            onClick={() =>
              setNestedExpanded((prev) => ({
                ...prev,
                componentTab: "workbook",
              }))
            }
          >
            Workbook
          </button>
          <button
            className={`tab-button ${
              nestedExpanded.componentTab === "outputs" ? "active" : ""
            }`}
            onClick={() =>
              setNestedExpanded((prev) => ({
                ...prev,
                componentTab: "outputs",
              }))
            }
          >
            Outputs
          </button>
        </div>

        <div className="tab-content">
          {(!nestedExpanded.componentTab ||
            nestedExpanded.componentTab === "maturity") && (
            <div>
              <h4>Tool Maturity</h4>
              <p>
                MDII supports two evaluation tracks, depending on the development stage of the tool that is being assessed:
              </p>

              <div className="maturity-grid">
                <div className="box green-box">
                  <h5>Regular Version</h5>
                  <p>
                    <b>
                      For tools that are already deployed, piloted, or
                      tested
                    </b>
                  </p>
                  <ul>
                    <li>Assesses actual user experience and impact</li>
                    <li>
                      Enables real-time feedback and iterative improvement
                    </li>
                  </ul>
                </div>

                <div className="box purple-box">
                  <h5>Ex-Ante Version</h5>
                  <p>
                    <b>
                      For tools in early stages: idea, research, or
                      prototyping
                    </b>
                  </p>
                  <ul>
                    <li>
                      Designed for when there are few or no active users yet
                    </li>
                    <li>
                      Helps teams embed inclusiveness early, before costly
                      redesigns are needed
                    </li>
                    <li>Generates feedback based on intentions, assumptions, and plans</li>
                  </ul>
                </div>
              </div>

              <div className="box grey-box">
                <p>The desktop app is designed to <b>automatically detect the tool's maturity level</b> once it's loaded into the system and selects the appropriate version of the Index for scoring and reporting. You don't need to choose manually; the system adapts based on the tool profile already stored in our database.</p>
              </div>
            </div>
          )}

          {nestedExpanded.componentTab === "surveys" && (
            <div className="surveys">
              <h4>Surveys</h4>
              <p>
                MDII utilizes targeted surveys to gather comprehensive data from different stakeholder groups. These surveys collect both qualitative and quantitative insights to assess how digital tools perform across inclusiveness criteria.
              </p>
              <div className="box green-box">
                <p><b>Innovators (Type 1)</b></p>
                <p>Survey for tool developers and creators</p>
              </div>
              <div className="box purple-box">
                <b>Domain Experts (Type 2)</b>
                <p>Survey for subject matter specialists</p>
              </div>
              <div className="box blue-box">
                <b>End Users (Type 3)</b>
                <p>Survey for direct tool users</p>
              </div>
              <div className="box orange-box">
                <b>Downstream Beneficiaries (Type 4 — optional)</b>
                <p>Survey for indirect beneficiaries of the tool</p>
              </div>
              <div>
                <p>Each type receives a tailored set of questions aligned with MDII's dimensions. The surveys are designed to be lightweight and can be completed online (via KoboToolbox) or offline using printable versions.</p>
                <p>These surveys gather both qualitative and quantitative data to assess how the digital tool performs across inclusiveness criteria — such as accessibility, usability, relevance, and equity.</p>
              </div>
            </div>
          )}

          {nestedExpanded.componentTab === "compilations" && (
            <div>
              <h4>Compilations</h4>
              <p>
                Once the innovator survey is completed, the system generates PDF compilations for each expert domain. These documents summarize relevant answers provided by the tool developers and serve as input material for domain experts.
              </p>
                <h5>Each compilation includes:</h5>
                <ul>
                  <li>General information about the tool</li>
                  <li>
                    Domain-specific excerpts aligned to the expert's area
                  </li>
                  <li>Contextual notes to guide scoring</li>
                </ul>

              <div className="box grey-box">
                <p>The expert uses this compilation as a reference to complete their evaluation independently, helping ensure that the scoring reflects both internal knowledge and external assessment.</p>
              </div>
            </div>
          )}

          {nestedExpanded.componentTab === "workbook" && (
            <div>
              <h4>Workbook</h4>
              <p>All survey responses feed into a pre-formatted Excel workbook, which performs automated calculations and generates comprehensive reports.</p>
              <div className="box grey-box">
                <b>The workbook does:</b>
                <ul>
                  <li>Automatically calculates the overall MDII score (0–100%)</li>
                  <li>Assigns a tier label (e.g. "Meeting Expectations")</li>
                  <li>Breaks down results across 7 MDII dimensions</li>
                  <li>Displays results using tables and radar/spider charts</li>
                  <li>Suggests recommendations per dimension, including tier-based actions to improve</li>
                </ul>
              </div>
              <div className="box green-box">
                <p>The workbook is structured with separate tabs for scores and recommendations. No manual calculation is needed — scores and outputs are generated automatically once data is entered.</p>
              </div>
            </div>
          )}

          {nestedExpanded.componentTab === "outputs" && (
            <div>
              <h4>Outputs</h4>
              <p>After reviewing the Excel workbook, users generate two key outputs by exporting the relevant tabs as PDFs.</p>
              <div className="box grey-box">
                <ul><li><b>Score Report (PDF)</b></li></ul>
                <p>Summarizes the final MDII score, tier label, visual charts, and a dimension-level breakdown of inclusiveness performance.</p>
              </div>
              <div className="box grey-box">
                <ul><li><b>Recommendation Brief (PDF)</b></li></ul>
                <p>Lists practical, evidence-based actions to improve the tool. These suggestions are framed as "steps to reach the next tier" and are organized by MDII dimension.</p>
              </div>

              <div className="box green-box">
                <p>These files are designed to support internal planning, external discussions, and roadmap decisions — giving teams a concrete snapshot of where they stand and where to go next.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MDIIComponents;
