import React, { useState } from "react";
import { HiOutlineDocumentText } from "react-icons/hi";

const Outputs = ({ setCurrentPage, setActiveSection, activeSection }) => {
  const [nestedExpanded, setNestedExpanded] = useState({ componentTab: "scorereport" });

  const toggleNested = (nestedId) => {
    setNestedExpanded((prev) => ({
      ...prev,
      [nestedId]: nestedId === prev[nestedId] ? "scorereport" : nestedId,
    }));
  };

  return (
    <div className="content-body">
      <h3>Expected Outputs</h3>
      <p>
        Once you complete an MDII evaluation, the desktop app will help you generate two key outputs as PDF files, derived from the Excel workbook. These outputs are designed to provide actionable insights and a clear snapshot of your tool’s inclusiveness performance.
      </p>

      <div className="component-tabs">
        <div className="tab-header">
          <button
            className={`tab-button ${
              !nestedExpanded.componentTab ||
              nestedExpanded.componentTab === "scorereport"
                ? "active"
                : ""
            }`}
            onClick={() => toggleNested("componentTab")}
          >
            Score Report
          </button>
          <button
            className={`tab-button ${
              nestedExpanded.componentTab === "recommendationbrief" ? "active" : ""
            }`}
            onClick={() =>
              setNestedExpanded((prev) => ({
                ...prev,
                componentTab: "recommendationbrief",
              }))
            }
          >
            Recommendation Brief
          </button>
        </div>

        <div className="tab-content">
          {(!nestedExpanded.componentTab ||
            nestedExpanded.componentTab === "scorereport") && (
            <div>
              <h4>Score Report</h4>
              <p>
                The Score Report is a structured PDF export from the Excel workbook’s “MDII Score” tab. It provides a detailed overview of the tool’s inclusiveness performance.
              </p>
              <div className="grey-box">
                <h5>Includes:</h5>
                <ul>
                  <li>
                    <strong>Overall MDII Score</strong> (0–100%)
                  </li>
                  <li>
                    <strong>Tier Label</strong> (e.g., "Meeting Expectations")
                  </li>
                  <li>
                    <strong>Visual Charts</strong> (radar/spider charts for dimension-level breakdown)
                  </li>
                  <li>
                    <strong>Dimension-Level Scores</strong> (across 7 dimensions)
                  </li>
                </ul>
              </div>
              <p>
                This report is ideal for sharing with stakeholders, comparing tools, or tracking progress over time.
              </p>
            </div>
          )}

          {nestedExpanded.componentTab === "recommendationbrief" && (
            <div>
              <h4>Recommendation Brief</h4>
              <p>
                The Recommendation Brief is a PDF export from the Excel workbook’s “MDII Recommendations” tab. It provides practical, evidence-based actions to improve the tool’s inclusiveness.
              </p>
              <div className="grey-box">
                <h5>Includes:</h5>
                <ul>
                  <li>
                    <strong>Actionable Suggestions</strong>: Specific steps to improve inclusiveness, organized by MDII dimension
                  </li>
                  <li>
                    <strong>Tier-Based Guidance</strong>: Recommendations framed as "steps to reach the next tier"
                  </li>
                  <li>
                    <strong>Evidence-Based Insights</strong>: Grounded in survey responses and expert evaluations
                  </li>
                </ul>
              </div>
              <p>
                This brief is designed to guide internal planning, roadmap decisions, and discussions with developers or funders.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grey-box">
        <h4>Using Outputs</h4>
        <p>
          Both outputs are generated automatically from the Excel workbook. Simply open the workbook, review the “MDII Score” and “MDII Recommendations” tabs, and export each as a PDF. These files are ready for sharing, archiving, or using in strategic planning.
        </p>
      </div>
    </div>
  );
};

export default Outputs;