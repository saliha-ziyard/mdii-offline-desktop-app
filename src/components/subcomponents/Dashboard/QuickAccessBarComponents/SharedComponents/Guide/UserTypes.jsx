import React, { useState } from "react";
import { GoPeople } from "react-icons/go";

const UserTypes = ({ setCurrentPage, setActiveSection, activeSection }) => {
  const [nestedExpanded, setNestedExpanded] = useState({ componentTab: "innovators1" });

  const toggleNested = (nestedId) => {
    setNestedExpanded((prev) => ({
      ...prev,
      [nestedId]: nestedId === prev[nestedId] ? "innovators1" : nestedId,
    }));
  };

  return (
    <div className="content-body">
      <h3>User Types</h3>
      <p>Different types of users contribute to an MDII evaluation:</p>
      
      <div className="component-tabs">
        <div className="tab-header">
          <button
            className={`tab-button ${
              !nestedExpanded.componentTab ||
              nestedExpanded.componentTab === "innovators1"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setNestedExpanded((prev) => ({
                ...prev,
                componentTab: "innovators1",
              }))
            } 
          >
            Innovators
          </button>
          <button
            className={`tab-button ${
              nestedExpanded.componentTab === "domain-experts" ? "active" : ""
            }`}
            onClick={() =>
              setNestedExpanded((prev) => ({
                ...prev,
                componentTab: "domain-experts",
              }))
            }
          >
            Domain Experts
          </button>
          <button
            className={`tab-button ${
              nestedExpanded.componentTab === "end-users" ? "active" : ""
            }`}
            onClick={() =>
              setNestedExpanded((prev) => ({
                ...prev,
                componentTab: "end-users",
              }))
            }
          >
            End Users
          </button>
          <button
            className={`tab-button ${
              nestedExpanded.componentTab === "downstream-beneficiaries" ? "active" : ""
            }`}
            onClick={() =>
              setNestedExpanded((prev) => ({
                ...prev,
                componentTab: "downstream-beneficiaries",
              }))
            }
          >
            Downstream Beneficiaries
          </button>
        </div>

        <div className="tab-content">
          {(!nestedExpanded.componentTab ||
            nestedExpanded.componentTab === "innovators1") && (
            <div>
              <div className="red-tag tag">Mandatory</div>
              <h4>Innovators (Type 1)</h4>
              <p>The people or teams who developed the digital tool</p>
              <p>Provide essential context about the tool's design, goals, and implementation approach.</p>
              <div className="box purple-box">
                <p><strong>Sample Size:</strong> No minimum required — more responses provide better results</p>
              </div>
            </div>
          )}

          {nestedExpanded.componentTab === "domain-experts" && (
            <div>
              <div className="red-tag tag" >Mandatory</div>
              <h4>Domain Experts (Type 2)</h4>
              <p>Technical or thematic specialists who review the tool based on specific dimensions</p>
              <p>Offer independent professional assessment across GESI, ICT, Data, Economics, and other critical areas.</p>
              <div className="box purple-box">
                <p><strong>Sample Size:</strong> No minimum required — more responses provide better results.</p>
              </div>
            </div>
          )}

          {nestedExpanded.componentTab === "end-users" && (
            <div>
              <div className="red-tag tag ">Mandatory</div>
              <h4>End Users (Type 3)</h4>
              <p>Individuals who interact directly with the tool. Can be farmers, extension agents, or governmental individuals.</p>
              <p>Provide real-world usage feedback on usability, trust, and accessibility from direct experience.</p>
              <div className="box purple-box">
                <p><strong>Sample Size:</strong> No minimum required — more responses provide better results.</p>
              </div>
            </div>
          )}

          {nestedExpanded.componentTab === "downstream-beneficiaries" && (
            <div>
              <div className="tag">Optional</div>
              <h4>Downstream Beneficiaries (Type 4)</h4>
              <p>People impacted by the tool's use or decisions, even if they don't interact with it directly.</p>
              <p>Share perspectives on indirect impacts and broader consequences of the tool's deployment.</p>
              <div className="box purple-box">
                <p><strong>Sample Size:</strong> No minimum required — more responses provide better results.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTypes;
