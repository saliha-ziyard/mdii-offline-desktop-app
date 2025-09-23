import React from "react";
import { BsArrowRight } from "react-icons/bs";

const Welcome = ({ setCurrentPage, setActiveSection, activeSection }) => {
  return (
    <div className="content-body">
      <h3>Welcome to MDII Desktop App</h3>
      <p>
        You're using this <strong>offline-friendly desktop app</strong> because your work may happen in areas with limited or intermittent internet access. 
        This tool is built to help you run <strong>inclusiveness evaluations</strong> of digital solutions in real-world conditions — whether you're conducting fieldwork, 
        supporting a country-level review, or facilitating a stakeholder workshop.
      </p>

      <div>
        <h4>With this app, you can:</h4>
        <ul>
          <li>Collect feedback from users and domain experts</li>
          <li>Score a digital tool's level of inclusiveness</li>
          <li>Generate structured reports and recommendations</li>
        </ul>
      </div>

      <p>
        Once your evaluation is complete, you only need to connect briefly
        to the internet to <strong>sync your data</strong> or download
        updated materials from the MDII system.
      </p>

      <div className="guidance-card">
        <div className="icon"><BsArrowRight /></div>
        <div>
          <h3>Ready to explore the guide?</h3>
          <p>
            Click on any section in the <strong>Table of Contents</strong>{" "}
            to view detailed information. Only one section will be displayed
            at a time for easy reading.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;