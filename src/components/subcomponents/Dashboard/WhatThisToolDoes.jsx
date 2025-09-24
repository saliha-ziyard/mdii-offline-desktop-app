import React from "react";
import { GoBook } from "react-icons/go";
import FeatureBox from "./FeatureBox";

const WhatThisToolDoes = () => {
  const keyFeatures = [
    "Offline-friendly evaluations",
    "Evidence-based recommendations",
    "90 inclusiveness indicators",
    "5-tier scoring system"
  ];

  const assessmentMegagroups = [
    "Innovation Usage",
    "Social Consequences",
    "Stakeholder Relationships"
  ];

  return (
    <section className="info-section">
      <div className="section-header-main">
        <div className="icon">
          <GoBook />
        </div>
        <h2 className="section-title-main">What This Tool Does</h2>
      </div>
      <p className="section-description-main">
        The Multidimensional Digital Inclusivity Index (MDII) helps
        researchers, innovators, and developers assess and improve how
        inclusive a digital solution is for agrisystems in the Global
        South.
      </p>
      <p className="section-description-main">
        This is the first offline-friendly version of the MDII, designed
        for low-connectivity settings.
        <b> Please read the user manual before you start.</b>
      </p>

      <div className="features-grid">
        <FeatureBox title="Key Features" features={keyFeatures} />
        <FeatureBox title="Assessment Megagroups" features={assessmentMegagroups} />
      </div>
    </section>
  );
};

export default WhatThisToolDoes;