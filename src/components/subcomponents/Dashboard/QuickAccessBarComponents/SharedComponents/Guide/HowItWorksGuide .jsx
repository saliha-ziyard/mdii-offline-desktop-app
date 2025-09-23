import React, { useState, useEffect } from "react";
import {
  GoBook,
  GoArrowLeft,
  GoGlobe,
  GoPeople,
  GoShield,
  GoGear,
  GoQuestion,
} from "react-icons/go";
import { HiOutlineDocumentText } from "react-icons/hi";
import {
  BsLightbulb,
  BsExclamationTriangle,
} from "react-icons/bs";
import { HiOutlineUserGroup, HiOutlineChartBar } from "react-icons/hi2";
import Welcome from "./Welcome";
import WhatIsMDII from "./WhatIsMDII";
import EvaluationFramework from "./EvaluationFramework";
import MDIIComponents from "./MDIIComponents";
import MDIIEcosystem from "./MDIIEcosystem";
import InternetNeeds from "./InternetNeeds";
import UserTypes from "./UserTypes";
import ExpertManagement from "./ExpertManagement";
import EvaluationWorkflow from "./EvaluationWorkflow";
import Outputs from "./Outputs";
import Troubleshooting from "./Troubleshooting";
import AdditionalSupport from "./AdditionalSupport";
import FurtherReading from "./FurtherReading";
import AcknowledgmentsDevTeam from "./AcknowledgmentsDevTeam";

const navigationItems = [
  { id: "welcome", title: "Welcome", icon: <GoBook />, component: Welcome },
  { id: "what-is-mdii", title: "1. What is MDII?", icon: <BsLightbulb />, component: WhatIsMDII },
  { id: "evaluation-framework", title: "2. Evaluation Framework", icon: <GoShield />, component: EvaluationFramework },
  { id: "mdii-components", title: "3. MDII Components", icon: <GoGear />, component: MDIIComponents },
  { id: "mdii-ecosystem", title: "4. MDII Ecosystem", icon: <GoGlobe />, component: MDIIEcosystem },
  { id: "internet-usage", title: "5. Internet Needs", icon: <GoGlobe />, component: InternetNeeds },
  { id: "user-types", title: "6. User Types", icon: <GoPeople />, component: UserTypes },
  { id: "expert-management", title: "7. Expert Management", icon: <HiOutlineUserGroup />, component: ExpertManagement },
  { id: "evaluation-process", title: "8. Evaluation Workflow", icon: <HiOutlineChartBar />, component: EvaluationWorkflow },
  { id: "outputs", title: "9. Expected Outputs", icon: <GoBook />, component: Outputs },
  { id: "troubleshooting", title: "10. Troubleshooting", icon: <BsExclamationTriangle />, component: Troubleshooting },
  { id: "additional-support", title: "11. Additional Support", icon: <GoGear />, component: AdditionalSupport },
  { id: "further-reading", title: "12. Further Reading", icon: <GoBook />, component: FurtherReading },
  {
    id: "acknowledgments-dev-team",
    title: "13. Acknowledgments & Development Team",
    icon: <BsExclamationTriangle />,
    component: AcknowledgmentsDevTeam,
  },
];

const HowItWorksGuide = ({ setCurrentPage = () => {} }) => {
  const [activeSection, setActiveSection] = useState("welcome");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const ActiveComponent = navigationItems.find(item => item.id === activeSection)?.component || Welcome;

  return (
    <div className="guide">
      <div className="header-main">
        <button onClick={() => setCurrentPage("home")} className="back-btn">
          <GoArrowLeft />
        </button>
        <div className="text">
          <h1>MDII Offline-Friendly Desktop App</h1>
          <p>Complete User Guide</p>
        </div>
      </div>

      <div className="guide-container">
        {/* Sidebar */}
        <div className="hig-sidebar">
          <nav className="hig-navigation">
            <h3>Table of Contents</h3>
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeSection === item.id ? "active" : ""}`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="nav-item-icon">{item.icon}</span>
                {item.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <ActiveComponent
            setCurrentPage={setCurrentPage}
            setActiveSection={setActiveSection}
            activeSection={activeSection}
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorksGuide;
