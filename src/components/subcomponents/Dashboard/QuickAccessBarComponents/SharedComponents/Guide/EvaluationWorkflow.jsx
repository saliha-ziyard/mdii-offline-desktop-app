import React, { useState } from "react";
import { HiOutlineChartBar, HiChevronUp, HiChevronDown } from "react-icons/hi2";

const steps = [
  {
    number: 1,
    title: "Request Code",
    duration: "2-3 minutes (internet required)",
    content: (
      <div className="box-dropdown">
        <p>
          Start by submitting an evaluation request. You'll receive a unique Tool ID via email that links your tool to the correct maturity version and evaluation materials. You need to already have the names and email addresses of the innovators focal points.
        </p>
        <h5>Key Roles:</h5>
        <ul>
          <li>
            <strong>Project Leader</strong>: Overall strategic oversight of the tool or initiative. Ensures alignment with broader project goals.
          </li>
          <li>
            <strong>Project Manager</strong>: Oversees day-to-day implementation. Provides operational details like rollout stages, timelines.
          </li>
          <li>
            <strong>Technical Manager</strong>: Detailed knowledge of tool's architecture and data flows. Completes technical portions of the survey.
          </li>
        </ul>
      </div>
    ),
  },
  {
    number: 2,
    title: "Innovator Survey",
    duration: "Immediate, 0 minutes",
    content: (
      <div className="box-dropdown">
      <p>
        Our system sends the innovators focal points an email to complete a structured survey. This provides essential background and operational context about the tool being assessed. No action is required here. You will be notified as soon as the answers start coming.
      </p>
      </div>
    ),
  },
  {
    number: 3,
    title: "Assign Experts",
    duration: "Hours or days (depends on expert availability)",
    content: (
      <div className="box-dropdown">
        <p>
          Identify domain-specific evaluators that will evaluate the innovators' answers.
        </p>
        <div>
          <div className="grey-box">
            <h5>Regular Version</h5>
            <ul>
              <li>Gender Equality and Social Inclusion (GESI)</li>
              <li>Information and Communication Technology (ICT)</li>
              <li>Data Science and Analytics (Data)</li>
              <li>Economics and Market Analysis</li>
              <li>Human-Centered Design</li>
              <li>Country-Specific Expertise</li>
            </ul>
          </div>
          <div className="blue-box">
            <h5>Ex ante Version</h5>
            <ul>
              <li>Gender Equality and Social Inclusion (GESI)</li>
              <li>Information and Communication Technology (ICT)</li>
              <li>Data Science and Analytics (Data)</li>
              <li>Economics and Market Analysis</li>
              <li>Country-Specific Expertise</li>
            </ul>
            <p><strong>Note:</strong> Human-Centered Design not required.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: 4,
    title: "Generate Expert PDFs",
    duration: "3-4 minutes (internet required)",
    content: (
      <div className="box-dropdown">
      <p>
        After collecting survey responses from the three focal points, select <strong>Get Experts PDF</strong> to generate structured document (compilation) that extracts and organizes relevant information from the focal points' responses. This will generate an excel file and store it on your computer alongside the compilations. Send these to the experts you identified in the previous step.
      </p>
      </div>
    ),
  },
  {
    number: 5,
    title: "End User Data Collection",
    duration: "Days to weeks (no internet required)",
    content: (
      <div className="box-dropdown">
        <p>
          Generate unique survey links for End Users and Downstream Beneficiaries by going to <strong>Get Data Collection Link</strong>. You can send links via email, run workshops, or collect data in the field.
        </p>
        <div className="blue-box">
          <p><strong>Important Note:</strong> Our survey platform (Kobo Toolbox) allows offline collection using the KoboCollect App.</p>
        </div>
      </div>
    ),
  },
  {
    number: 6,
    title: "Get MDII Report",
    duration: "4-5 minutes (internet required)",
    content: (
      <div className="box-dropdown">
        <p>
          After receiving all evaluations from users, downstream beneficiaries (optional) and experts, go to <strong>Get MDII Report</strong>. Insert your tool ID and wait for magic to happen. The excel file generated in step 4 will be updated with the evaluation data.
        </p>
        <div className="blue-box">
          <p>
            <strong>Final Steps:</strong> Open the excel file and find your tool assessment in the MDII Score and MDII Recommendations tabs. Print each as PDFs – you've completed an MDII evaluation!
          </p>
        </div>
      </div>
    ),
  },
];

const EvaluationWorkflow = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="content-body">
      <h3>Evaluation Workflow</h3>
      <p>
        This section outlines the full journey of evaluating a digital tool's inclusiveness
        using the MDII desktop toolkit. Whether you're a field coordinator, evaluator,
        or project lead, these are the steps you'll follow from requesting your evaluation
        code to generating your final report.
      </p>

      <div className="box blue-box">
        <p>
          <b>Timeline Information:</b> The duration of an MDII evaluation depends
          on how fast you can make your respondents fill out their surveys. As an evaluation
          coordinator, your work is easy and almost instantaneous.
        </p>
      </div>

      <div className="workflow-steps">
        {steps.map((step, index) => (
          <div className="workflow-card" key={index}>
            <div className="workflow-toggle" onClick={() => toggle(index)}>
              <span className="workflow-number">{step.number}</span>
              <div className="workflow-info">
                <h4>{step.title}</h4>
                <p>Duration: {step.duration}</p>
              </div>
              <span className="workflow-arrow">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>
            {openIndex === index && (
              <div className="workflow-content">{step.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvaluationWorkflow;