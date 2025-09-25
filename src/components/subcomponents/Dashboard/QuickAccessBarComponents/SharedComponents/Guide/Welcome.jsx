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

        <p>With this app, you can:</p>
        <ul>
          <li>Collect feedback from users and domain experts</li>
          <li>Score a digital tool's level of inclusiveness</li>
          <li>Generate structured reports and recommendations</li>
        </ul>

      <p>
        Once your evaluation is complete, you only need to connect briefly
        to the internet to <b>sync your data</b> or download
        updated materials from the MDII system.
      </p>

      <div className="blue-box box">
        <div className="content">
          <h3>Ready to explore?</h3>
          <p>Click any section in the <b>Table of Contents</b> to get started.</p>
        </div>
        <div className="icon">
          <BsArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Welcome;