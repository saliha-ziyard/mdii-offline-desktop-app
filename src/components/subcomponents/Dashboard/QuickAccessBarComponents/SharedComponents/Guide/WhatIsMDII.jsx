import React from "react";
import { BsLightbulb } from "react-icons/bs";

const WhatIsMDII = ({ setCurrentPage, setActiveSection, activeSection }) => {
  return (
    <div className="content-body">
      <h3>What is MDII?</h3>
      <p>
        The Multidimensional Digital Inclusiveness Index (MDII) is a scientific framework designed to assess and improve the inclusiveness of digital tools in agrisystems, with a particular focus on low- and middle-income countries (LMICs). It provides a structured, evidence-based approach to evaluating whether digital innovations are accessible, usable, and equitable.
      </p>

      <div className="box orange-box">
        <h4>Fundamental Question</h4>
        <p className="content">
          
            Are digital tools working for everyone — or just for the
            digitally connected few?
          
        </p>
      </div>

      <p>
        In agricultural development, new digital tools are launched every year. But many still struggle to serve those most in need, like women, youth, rural communities, or people with limited access to technology.
      </p>

      <div className="box purple-box"
      >
        <h4>
          Digital inclusiveness goes beyond devices or internet availability
        </h4>
        <ul>
          <li>Whether people can understand and trust the tool</li>
          <li>Whether the design reflects their needs and context</li>
          <li>Whether benefits and risks are fairly distributed</li>
        </ul>
      </div>

      <p>
        MDII helps developers, researchers, and decision-makers assess these issues with structured tools and offers clear, actionable guidance on how to improve adoption, trust, and equity.
      </p>

      <div className="box orange-box">
        <h4>Core Innovation</h4>
        <p>
          Its core innovation lies in quantifying digital inclusiveness and helping teams move beyond assumptions or high-level checklists. MDII offers guidance that is grounded, contextual, and focused on empowering users.
        </p>
      </div>

      <div className="two-column-grid">
        <div className="grid-item">
          <h4>MDII helps answer:</h4>
          <ul>
            <li>
              Is this tool inclusive for users with low access or
              connectivity?
            </li>
            <li>
              Where are the gaps in usability, trust, and local alignment?
            </li>
            <li>
              How can we improve adoption through better design choices?
            </li>
            <li>
              Are benefits and risks distributed fairly across different
              user groups?
            </li>
          </ul>
        </div>
        <div className="grid-item">
          <h4>Use MDII to:</h4>
          <ul>
            <li>Generate evidence-based recommendations</li>
            <li>Evaluate tools online or offline</li>
            <li>Compare across teams, tools, and regions</li>
            <li>Align with gender and inclusion goals</li>
          </ul>
        </div>
      </div>

      <div className="box grey-box">
        <h4>Applicable tools include:</h4>
        <ul>
          <li>Farm advisories, government decision support platforms, digital-enabled sensors, etc.</li>
          <li>Deployed or in development.</li>
        </ul>

      </div>
    </div>
  );
};

export default WhatIsMDII;
