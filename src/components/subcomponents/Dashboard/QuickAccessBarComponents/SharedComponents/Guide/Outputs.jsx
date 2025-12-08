import React, { useState } from "react";
import { HiOutlineDocumentText, HiChartBar, HiTrendingUp, HiLightBulb } from "react-icons/hi";

const Outputs = ({ setCurrentPage, setActiveSection, activeSection }) => {
  const [activeTab, setActiveTab] = useState("scoretiers");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const scoreTiers = [
    { range: "90–100%", label: "Exceeding Expectations", color: "#00FF00" },
    { range: "70–89%", label: "Meeting Expectations", color: "#00BFAD" },
    { range: "50–69%", label: "Approaching Expectations", color: "#99FFCC" },
    { range: "25–49%", label: "Below Expectations", color: "#FFD94D" },
    { range: "0–24%", label: "Significantly Below Expectations", color: "#FF2929" }
  ];

  const faqs = [
    {
      question: "What if my score is low?",
      answer: "A low score is an opportunity, not a failure. Focus on the Recommendation Brief to identify quick wins and high-impact improvements. Many tools start with lower scores and improve significantly through iterative enhancements."
    },
    {
      question: "How are tiers calculated?",
      answer: "Tiers are based on weighted averages across seven dimensions, incorporating input from innovators, domain experts, end-users, and downstream beneficiaries. Each user type contributes different perspectives to create a comprehensive inclusiveness score."
    }
  ];

  const readingSteps = [
    {
      number: "1",
      title: "Start with Your Tier",
      description: "The overall percentage and tier help situate the tool — but it's just the beginning. Don't fixate on the number, focus on the why behind each score.",
      color: "#E8F4F8"
    },
    {
      number: "2", 
      title: "Dive into Each Dimension",
      description: "Examine each of the seven dimensions. Where is the tool already aligned with inclusion goals? Where are the blind spots (e.g., data risks, downstream access, training gaps)?",
      color: "#E8F8F0"
    },
    {
      number: "3",
      title: "Compare by User Type",
      description: "Different respondents offer distinct perspectives. If scores diverge across innovators, experts, and end-users — that's a signal, not a problem.",
      color: "#F3E8F8"
    },
    {
      number: "4",
      title: "Use Your Recommendation Brief",
      description: "Each tool receives tailored, evidence-based suggestions. These prioritize low-effort, high-impact improvements and guide internal discussions.",
      color: "#FFF4E8"
    }
  ];

const scenarios = [
  {
    title: '"Our score was 43%"',
    description: "You're in the 'Below Expectations' tier, but this is your starting point for improvement.",
    icon: "⬇️",
    subtitle: "Next Steps:",
    points: [
      "Focus on Recommendation Brief quick wins",
      "Identify 2-3 dimensions with lowest scores",
      "Plan iterative improvements over 3–6 months"
    ]
  },
  {
    title: '"Views Conflict"',
    description: "Innovators rate high but end-users score low? This reveals important gaps in perception vs. reality.",
    icon: "⚠️",
    subtitle: "Why It Matters:",
    points: [
      "Shows disconnect between design intent and user experience",
      "Highlights need for user-centered improvements",
      "Indicates areas for stakeholder alignment"
    ]
  },
  {
    title: '"We Improved!"',
    description: "From 43% to 67% in 3 months by following the Recommendation Brief systematically.",
    icon: "📈",
    subtitle: "Success Strategy:",
    points: [
      "Implemented quick wins first",
      "Focused on user training and support",
      "Re-evaluated to track progress"
    ]
  }
];


  return (
    <div className="content-body">
        <h3>Expected Outputs</h3>
        <p>
          Once you complete your evaluation, the MDII Desktop App provides both a final score and a set of actionable recommendations. But how do you make sense of these outputs? This section guides you through interpreting results, identifying patterns, and planning next steps for improvement.
        </p>

      <div className="component-tabs">
        <div className="tab-header">
        <button
           className={`tab-button ${activeTab === "scoretiers" ? "active" : ""}`}
           onClick={() => setActiveTab("scoretiers")}
        >
          <HiChartBar size={18} />
          Score Tiers
        </button>
        <button
          className={`tab-button ${activeTab === "interpreting" ? "active" : ""}`}
          onClick={() => setActiveTab("interpreting")}
        >
          <HiTrendingUp size={18} />
          Interpreting Results
        </button>
        <button
          className={`tab-button ${activeTab === "whatyoullreceive" ? "active" : ""}`}
          onClick={() => setActiveTab("whatyoullreceive")}
        >
          <HiOutlineDocumentText size={18} />
          What You'll Receive
        </button>
      </div>
    </div>

      <div className="tab-content">
        {activeTab === "scoretiers" && (
          <div>
            <h4>Overall MDII Score Tiers</h4>
            
            <div className="tiers-container">
              {scoreTiers.map((tier, index) => (
                <div key={index} className="tier-card" style={{ background: tier.color }}>
                  <span className="tier-range">{tier.range}:</span>
                  <span className="tier-label">{tier.label}</span>
                </div>
              ))}
            </div>


            <div>
              <h4>Frequently Asked Questions</h4>
              {faqs.map((faq, index) => (
                <div key={index} className="faq-card">
                  <div 
                    className="faq-question"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <span className="faq-icon">❓</span>
                    <p className="faq-text">{faq.question}</p>
                    <span className="faq-arrow">{expandedFaq === index ? "−" : "+"}</span>
                  </div>
                  {expandedFaq === index && (
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        )}

        {activeTab === "interpreting" && (
          <div>
            <h4>
                MDII Is Not a Judgment Tool — It's a Feedforward System
            </h4>
            <p>
              The MDII evaluation was designed to shift the mindset away from static scoring and toward informed improvement. It's not just about how inclusive your tool is today — it's about how it can become more inclusive tomorrow.
            </p>
              <div>           
            </div>

            <p><b>How to Read Your Report: Step-by-Step Guide</b></p>

            <div className="steps-container">
              {readingSteps.map((step, index) => (
                <div key={index} className="step-card" style={{ background: step.color }}>
                  <div className="step-content">
                    <h5>{step.number}. {" "}{step.title}</h5>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pro-tip">
              <span className="pro-tip-icon">✓</span>
              <span className="pro-tip-text">
                <strong>Pro Tip:</strong> MDII evaluations can be repeated after modifications to track improvements over time.
              </span>
            </div>


            <p><b>Common Scenarios & Next Steps</b></p>
            <div className="scenarios-container">
              {scenarios.map((scenario, index) => (
                <div key={index} className="scenario-card">
                  <div className="scenario-header">
                    <span className="scenario-icon">{scenario.icon}</span>
                    <h5 className="scenario-title">{scenario.title}</h5>
                  </div>
                  <p className="scenario-description">{scenario.description}</p>

                  <h6 className="scenario-subtitle">{scenario.subtitle}</h6>
                  <ul className="scenario-list">
                    {scenario.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "whatyoullreceive" && (
          <div >
            <p>
              After running your evaluation, the MDII Desktop App will generate two key outputs:
            </p>

            <div className="scenarios-container">
              {/* Score Report */}
              <div className="scenario-card">
                <div className="scenario-header">
                  <HiOutlineDocumentText size={24} color="#10B981" />
                  <h4 className="scenario-title">1. Score Report (PDF)</h4>
                </div>
                <p>
                  This file provides the overall result, presented as:
                </p>
                <ul>
                  <li>A percentage score (0–100%)</li>
                  <li>A tier label (as shown in Score Tiers)</li>
                  <li>A breakdown across each dimension</li>
                  <li>A visual spider/radar chart showing strengths and gaps</li>
                  <li>Tables summarizing results by user type and version</li>
                </ul>
                <div className="box green-box">
                  Use this score report as a snapshot of where the tool stands today.
                </div>
              </div>

              {/* Recommendation Brief */}
              <div className="scenario-card">
                <div className="scenario-header">
                  <HiLightBulb size={24} color="#F59E0B" />
                  <h4 className="scenario-title">2. Recommendation Brief (PDF)</h4>
                </div>
                <p >
                  This second file provides:
                </p>
                <ul >
                  <li>Targeted suggestions for each MDII dimension</li>
                  <li>Practical actions framed as "Possible actions to reach the next tier"</li>
                  <li>A tier legend showing where the tool currently sits per dimension</li>
                  <li>Highlighted quick wins — low-effort changes with high inclusiveness value</li>
                </ul>
                <div className="green-box box">
                  Use this brief as a planning and discussion tool with your team or partners.
                </div>
              </div>
            </div>
            </div>
        )}
      </div>
    </div>
  );
};


export default Outputs;