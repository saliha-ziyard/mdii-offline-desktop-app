import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import JourneyStep from "./JourneyStep";

const EvaluationJourney = () => {
  const journeySteps = [
    {
      number: 1,
      title: "Request Code",
      description: "Submit evaluation request and receive your Tool ID via email."
    },
    {
      number: 2,
      title: "Innovator Survey",
      description: "We'll send surveys and notify you when completed."
    },
    {
      number: 3,
      title: "Assign Experts",
      description: "Choose domain experts to assess the tool's information."
    },
    {
      number: 4,
      title: "Expert PDFs",
      description: "Generate domain-specific PDFs for expert review."
    },
    {
      number: 5,
      title: "Data Collection",
      description: "Create your form link and gather data from users."
    },
    {
      number: 6,
      title: "Get MDII Report",
      description: "Generate your score and recommendations."
    }
  ];

  return (
    <section className="journey-section">
      <div className="section-header-main">
        <div className="icon">
          <IoSettingsOutline />
        </div>
        <h2 className="section-title-main">Your Evaluation Journey</h2>
      </div>
      <p className="section-description-main">
        These are the steps to evaluate your digital tool's inclusiveness.
      </p>

      <div className="journey-steps">
        <div className="step-row">
          {journeySteps.slice(0, 3).map((step) => (
            <JourneyStep
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
        <div className="step-row">
          {journeySteps.slice(3, 6).map((step) => (
            <JourneyStep
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EvaluationJourney;