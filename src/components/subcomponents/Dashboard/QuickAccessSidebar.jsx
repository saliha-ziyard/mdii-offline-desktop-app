import React from "react";
import { RiWifiOffLine } from "react-icons/ri";
import { GoBook } from "react-icons/go";
import { GrNotes } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoMdLink } from "react-icons/io";
import { VscGraph } from "react-icons/vsc";
import QuickAccessButton from "./QuickAccessButton";
import ImportantNotice from "./ImportantNotice";

const QuickAccessSidebar = ({ handlePageChange }) => {
  const buttons = [
    {
      icon: GoBook,
      title: "How It Works",
      subtitle: "Read the manual first",
      onClick: () => handlePageChange("howItWorks")
    },
    {
      icon: GrNotes,
      title: "Start Evaluation",
      subtitle: "Submit an Evaluation Request",
      className: "start-evaluation",
      onClick: () => window.open("https://ee.kobotoolbox.org/x/BQdcE4hj", "_blank")
    },
    {
      icon: HiOutlineUserGroup,
      title: "Assign Experts",
      subtitle: "Choose domain experts",
      className: "assign-experts",
      onClick: () => handlePageChange("assignExperts")
    },
    {
      icon: GrNotes,
      title: "Get Expert PDFs",
      subtitle: "Generate domain-specific reports",
      className: "get-pdfs",
      onClick: () => handlePageChange("compilation")
    },
    {
      icon: IoMdLink,
      title: "Get Data Collection Link",
      subtitle: "Create a form for end users",
      className: "data-collection",
      onClick: () => handlePageChange("dataCollection")
    },
    {
      icon: VscGraph,
      title: "Get MDII Report",
      subtitle: "View scores and recommendations",
      className: "mdii-report",
      onClick: () => handlePageChange("userTypeCompilation")
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3 className="sidebar-title">Quick Access</h3>
        <p className="sidebar-subtitle">Choose an option for your evaluation</p>
      </div>

      <ImportantNotice />

      <div className="quick-access-buttons">
        {buttons.map((button, index) => (
          <QuickAccessButton key={index} {...button} />
        ))}
      </div>
    </div>
  );
};

export default QuickAccessSidebar;