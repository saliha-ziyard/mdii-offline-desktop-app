import React from "react";
import Header from "./Header";
import { BsBoxSeam } from "react-icons/bs";
import DashboardHeader from "./Dashboard//DashboardHeader";
import WhatThisToolDoes from "./Dashboard/WhatThisToolDoes";
import EvaluationJourney from "./Dashboard/EvaluationJourney";
import QuickAccessSidebar from "./Dashboard/QuickAccessSidebar";
import TroubleshootingSection from "./Dashboard/TroubleshootingSection";

const MainDashboard = ({ setCurrentPage: handlePageChange }) => {
  return (
    <>
      <Header />
      <div className="dashboard-container">
        <div className="main-dashboard">
          <DashboardHeader />
          <div className="content-area">
            <div className="sub-content">
              <WhatThisToolDoes />
              <EvaluationJourney />
            </div>
            <QuickAccessSidebar handlePageChange={handlePageChange} />
          </div>
          <TroubleshootingSection />
        </div>
      </div>
    </>
  );
};

export default MainDashboard;