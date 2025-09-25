import React from "react";
import { GoShield } from "react-icons/go";

const EvaluationFramework = ({ setCurrentPage, setActiveSection, activeSection }) => {
  return (
    <div className="content-body">
      <h3>Methodology</h3>
      <p>MDII is a structured evaluation framework that recognizes the importance of inclusivity at all stages of innovation development.</p>
      <p>The framework consists of 90 indicators, which inform 27 subdimensions of seven dimensions, covering three megagroups: Innovation usage, Social consequences, and Stakeholder relationships.</p>
      <p>The solution is given a score using a five-tier system for inclusivity across each dimension and subdimension. This makes it simple to identify points of strength and areas for improvement.</p>
      <p>Based on this data, domain expertise and input from stakeholders, the evaluation team provides recommendations and actionable insights for improvement.</p>

      <div className="structure-content">
        <h4>Framework Structure</h4>
        <div className="structure-grid">
          <div className="box orange-box">
            <h4>7 Dimensions</h4>
            <p>Core areas covering all aspects of digital tool inclusiveness</p>
          </div>
          <div className="box orange-box ">
            <h4>27 Subdimensions</h4>
            <p>Focused areas within each major dimension for targeted assessment</p>
          </div>
          <div className="box orange-box ">
            <h4>90 Indicators</h4>
            <p>Detailed metrics that capture specific aspects of digital inclusiveness</p>
          </div>
        </div>
      </div>

      <div>
        <h4>Explore the Framework</h4>
        <p>Click the sunburst image below to explore what's inside the MDII Index.</p>
        <p>To see detailed descriptions, open the dropdown menus by clicking the black triangles.</p>
        
        <div className="iframe-container">
          <iframe
            title="MDII Sunburst"
            src="MDII-sunburst_offline-manual.html"
            className="iframe-style"
          />
        </div>
      </div>

      <div className="box grey-box">
        <h4>Interactive Framework Explorer</h4>
        <p>The interactive sunburst visualization will be available in the full MDII platform, allowing you to explore the complete framework structure and understand how indicators map to subdimensions and dimensions.</p>
      </div>
    </div>
  );
};

export default EvaluationFramework;
