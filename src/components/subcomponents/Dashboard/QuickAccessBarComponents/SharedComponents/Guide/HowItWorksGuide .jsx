import React, { useState, useEffect } from "react";
import {
  GoBook,
  GoArrowLeft,
  GoGlobe,
  GoPeople,
  GoGraph,
  GoShield,
  GoGear,
  GoQuestion,
  GoCopy,
} from "react-icons/go";
import { HiOutlineDocumentText } from "react-icons/hi";
import {
  BsLightbulb,
  BsExclamationTriangle,
  BsCheckCircle,
  BsArrowDown,
  BsArrowRight,
} from "react-icons/bs";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineUserGroup,
  HiOutlineChartBar,
  HiOutlineCog,
} from "react-icons/hi2";

const HowItWorksGuide = ({ setCurrentPage = () => {} }) => {
  const [activeSection, setActiveSection] = useState("welcome");
  const [nestedExpanded, setNestedExpanded] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleNested = (nestedId) => {
    setNestedExpanded((prev) => ({
      ...prev,
      [nestedId]: !prev[nestedId],
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Optional: show a toast or notification
    });
  };

  // Centralized content storage
  const contentData = {
    welcome: {
      title: "Welcome to MDII Desktop App",
      icon: <GoBook />,
      content: (
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
            <div className="icon">< BsArrowRight /></div>
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
      ),
    },

    "what-is-mdii": {
      title: "What is MDII?",
      icon: <BsLightbulb />,
      content: (
        <div className="content-body">
          <h3>What is MDII?</h3>
          <p>
            The Multidimensional Digital Inclusiveness Index (MDII) is a scientific framework designed to assess and improve the inclusiveness of digital tools in agrisystems, with a particular focus on low- and middle-income countries (LMICs). It provides a structured, evidence-based approach to evaluating whether digital innovations are accessible, usable, and equitable.
          </p>

          <div className="highlight-box">
            <h4>Fundamental Question</h4>
            <p>
              <strong>
                Are digital tools working for everyone — or just for the
                digitally connected few?
              </strong>
            </p>
          </div>

          <p>
            In agricultural development, new digital tools are launched every year. But many still struggle to serve those most in need, like women, youth, rural communities, or people with limited access to technology.
          </p>

          <div
          style={{
            backgroundColor: "#cdbbf2",       
            color: "#000",                 
            border: "1px solid #591fd5", 
            borderRadius:"10px",    
            padding:"10px"  
          }}
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

          <div className="highlight-box">
            <h4>Core Innovation</h4>
            <p>
                Its core innovation lies in quantifying digital inclusiveness and helping teams move beyond assumptions or high-level checklists. MDII offers guidance that is grounded, contextual, and focused on empowering users.
            </p>
          </div>
          <div className="two-column-grid">
            <div>
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
          <div className="grey-box">
            <h4>Applicable tools include:</h4>
            <p>• Farm advisories, government decision support platforms, digital-enabled sensors, etc.</p>
            <p>• Deployed or in development</p>
          </div>
        </div>
      ),
    },

    "evaluation-framework": {
      title: "Evaluation Framework",
      icon: <GoShield />,
      content: (
        <div className="content-body">
          <h3>Methodology</h3>
          <p>MDII is a structured evaluation framework that recognizes the importance of inclusivity at all stages of innovation development.
          </p>
          <p>The framework consists of 90 indicators, which inform 27 subdimensions of seven dimensions, covering three megagroups: Innovation usage, Social consequences, and Stakeholder relationships.
          </p>
          <p>The solution is given a score using a five-tier system for inclusivity across each dimension and subdimension. This makes it simple to identify points of strength and areas for improvement.</p>
          <p>Based on this data, domain expertise and input from stakeholders, the evaluation team provides recommendations and actionable insights for improvement.</p>

          <div className="framework-structure">
            <h4>Framework Structure</h4>
            <div className="structure-grid">
              <div className="highlight-box">
                <h4>7 Dimensions</h4>
                <p>
                  Core areas covering all aspects of digital tool inclusiveness
                </p>
              </div>
              <div className="highlight-box">
                <h4>27 Subdimensions</h4>
                <p>
                  Focused areas within each major dimension for targeted
                  assessment
                </p>
              </div>
              <div className="highlight-box">
                <h4>90 Indicators</h4>
                <p>
                  Detailed metrics that capture specific aspects of digital
                  inclusiveness
                </p>
              </div>
            </div>
          </div>
          <div className="framework-structure">
            <h4>Explore the Framework</h4>
            <p>Click the sunburst image below to explore what's inside the MDII Index.</p>
            <p>To see detailed descriptions, open the dropdown menus by clicking the black triangles.</p>
            
            <div className="iframe-container">
              <iframe
            title="MDII Sunburst"
            src="MDII-sunburst_offline-manual.html" 
            className="iframe-style"
          />
            </div>
          </div>
          <div className="grey-box">
            <h4>Interactive Framework Explorer</h4>
            <p>The interactive sunburst visualization will be available in the full MDII platform, allowing you to explore the complete framework structure and understand how indicators map to subdimensions and dimensions.</p>
          </div>
        </div>
      ),
    },

    "mdii-components": {
      title: "MDII Components",
      icon: <GoGear />,
      content: (
        <div className="content-body">
          <h3>MDII Components</h3>

          <p>
            This desktop app has several important elements that you should be
            familiar with. Below is a high-level overview of the components in
            the system, from data collection to output generation.
          </p>

          <div className="component-tabs">
            <div className="tab-header">
              <button
                className={`tab-button ${
                  !nestedExpanded.componentTab ||
                  nestedExpanded.componentTab === "maturity"
                    ? "active"
                    : ""
                }`}
                onClick={() => toggleNested("componentTab")}
              >
                Tool Maturity
              </button>
              <button
                className={`tab-button ${
                  nestedExpanded.componentTab === "surveys" ? "active" : ""
                }`}
                onClick={() =>
                  setNestedExpanded((prev) => ({
                    ...prev,
                    componentTab: "surveys",
                  }))
                }
              >
                Surveys
              </button>
              <button
                className={`tab-button ${
                  nestedExpanded.componentTab === "compilations" ? "active" : ""
                }`}
                onClick={() =>
                  setNestedExpanded((prev) => ({
                    ...prev,
                    componentTab: "compilations",
                  }))
                }
              >
                Compilations
              </button>
            </div>

            <div className="tab-content">
              {(!nestedExpanded.componentTab ||
                nestedExpanded.componentTab === "maturity") && (
                <div>
                  <h4>Tool Maturity</h4>
                  <p>
                    MDII supports two evaluation tracks, depending on the
                    development stage of the tool:
                  </p>

                  <div className="maturity-grid">
                    <div className="maturity-item regular">
                      <h5>Regular Version</h5>
                      <p>
                        <strong>
                          For tools that are already deployed, piloted, or
                          tested
                        </strong>
                      </p>
                      <ul>
                        <li>Assesses actual user experience and impact</li>
                        <li>
                          Enables real-time feedback and iterative improvement
                        </li>
                      </ul>
                    </div>

                    <div className="maturity-item ex-ante">
                      <h5>Ex-Ante Version</h5>
                      <p>
                        <strong>
                          For tools in early stages: idea, research, or
                          prototyping
                        </strong>
                      </p>
                      <ul>
                        <li>
                          Designed for when there are few or no active users yet
                        </li>
                        <li>
                          Helps teams embed inclusiveness early, before costly
                          redesigns are needed
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {nestedExpanded.componentTab === "surveys" && (
                <div>
                  <h4>Surveys</h4>
                  <p>
                    MDII utilizes targeted surveys to gather comprehensive data
                    from different stakeholder groups.
                  </p>

                  <div className="survey-types">
                    <div className="survey-type">
                      <div className="survey-bullet"></div>
                      <div>
                        <strong>Innovators (Type 1)</strong>
                        <p>Survey for tool developers and creators</p>
                      </div>
                    </div>
                    <div className="survey-type">
                      <div className="survey-bullet"></div>
                      <div>
                        <strong>Domain Experts (Type 2)</strong>
                        <p>Survey for subject matter specialists</p>
                      </div>
                    </div>
                    <div className="survey-type">
                      <div className="survey-bullet"></div>
                      <div>
                        <strong>End Users (Type 3)</strong>
                        <p>Survey for direct tool users</p>
                      </div>
                    </div>
                    <div className="survey-type">
                      <div className="survey-bullet"></div>
                      <div>
                        <strong>
                          Downstream Beneficiaries (Type 4 — optional)
                        </strong>
                        <p>Survey for indirect beneficiaries of the tool</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {nestedExpanded.componentTab === "compilations" && (
                <div>
                  <h4>Compilations</h4>
                  <p>
                    Once the innovator survey is completed, the system generates
                    PDF compilations for each expert domain.
                  </p>

                  <div className="compilation-info">
                    <h5>Each compilation includes:</h5>
                    <ul>
                      <li>General information about the tool</li>
                      <li>
                        Domain-specific excerpts aligned to the expert's area
                      </li>
                      <li>Contextual notes to guide scoring</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    },

    "mdii-ecosystem": {
      title: "MDII Ecosystem",
      icon: <GoGlobe />,
      content: (
        <div className="content-body">
          <p>
            The MDII ecosystem consists of different tools and platforms
            designed to accommodate various working conditions and user needs.
          </p>

          <div className="ecosystem-grid">
            <div className="ecosystem-item">
              <h4>Online Platform</h4>
              <p>
                Full-featured web platform with real-time collaboration and
                advanced analytics.
              </p>
            </div>
            <div className="ecosystem-item">
              <h4>Desktop App (Current)</h4>
              <p>
                Offline-friendly solution for field work and areas with limited
                connectivity.
              </p>
            </div>
            <div className="ecosystem-item">
              <h4>Mobile Tools</h4>
              <p>
                Survey collection tools optimized for mobile data collection.
              </p>
            </div>
          </div>
        </div>
      ),
    },

    "internet-usage": {
      title: "Internet Needs",
      icon: <GoGlobe />,
      content: (
        <div className="content-body">
          <h3>Online and Offline Capabilities</h3>
          <p>
            The MDII Desktop App is designed to work effectively in environments
            with limited or intermittent internet access.
          </p>

          <div className="connectivity-grid">
            <div className="connectivity-item offline">
              <h4>Offline Capabilities</h4>
              <ul>
                <li>Complete surveys and assessments</li>
                <li>View and edit existing data</li>
                <li>Generate preliminary reports</li>
                <li>Access all documentation and guides</li>
              </ul>
            </div>
            <div className="connectivity-item online">
              <h4>Internet Required For</h4>
              <ul>
                <li>Initial tool registration</li>
                <li>Syncing data with MDII platform</li>
                <li>Downloading updated materials</li>
                <li>Final report generation</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },

    "user-types": {
      title: "User Types",
      icon: <GoPeople />,
      content: (
        <div className="content-body">
          <p>
            MDII recognizes different types of users, each with specific roles
            and perspectives in the evaluation process.
          </p>

          <div className="user-types-grid">
            <div className="user-type">
              <h4>Project Leaders</h4>
              <p>Overall strategic oversight of the tool or initiative</p>
            </div>
            <div className="user-type">
              <h4>Project Managers</h4>
              <p>Day-to-day implementation and operational details</p>
            </div>
            <div className="user-type">
              <h4>Technical Managers</h4>
              <p>Technical architecture and system implementation knowledge</p>
            </div>
            <div className="user-type">
              <h4>Domain Experts</h4>
              <p>Subject matter specialists who evaluate tool effectiveness</p>
            </div>
            <div className="user-type">
              <h4>End Users</h4>
              <p>Direct users of the digital tool being evaluated</p>
            </div>
            <div className="user-type">
              <h4>Downstream Beneficiaries</h4>
              <p>
                Indirect beneficiaries who are affected by the tool's impact
              </p>
            </div>
          </div>
        </div>
      ),
    },

    "expert-management": {
      title: "Expert Management",
      icon: <HiOutlineUserGroup />,
      content: (
        <div className="content-body">
          <h3>Managing Domain Experts</h3>
          <p>
            Domain experts play a crucial role in the MDII evaluation process by
            providing specialized knowledge and assessment of digital tools.
          </p>

          <div className="expert-process">
            <h4>Expert Assignment Process</h4>
            <ol>
              <li>
                Identify required expertise areas based on tool characteristics
              </li>
              <li>Recruit experts with relevant domain knowledge</li>
              <li>Provide experts with tool-specific compilation documents</li>
              <li>Guide experts through the evaluation survey</li>
              <li>Collect and integrate expert assessments</li>
            </ol>
          </div>

          <div className="expert-criteria">
            <h4>Expert Selection Criteria</h4>
            <ul>
              <li>Relevant subject matter expertise</li>
              <li>Experience with digital tools in their domain</li>
              <li>Understanding of target user populations</li>
              <li>Availability for evaluation timeline</li>
            </ul>
          </div>
        </div>
      ),
    },

    "evaluation-process": {
      title: "Evaluation Workflow",
      icon: <HiOutlineChartBar />,
      content: (
        <div className="content-body">
          <p>
            This section outlines the full journey of evaluating a digital
            tool's inclusiveness using the MDII desktop toolkit. Whether you're
            a field coordinator, evaluator, or project lead, these are the steps
            you'll follow from requesting your evaluation code to generating
            your final report.
          </p>

          <div className="timeline-note">
            <BsCheckCircle />
            <p>
              <strong>Timeline Information:</strong> The duration of an MDII
              evaluation depends on how fast you can make your respondents fill
              out their surveys. As an evaluation coordinator, your work is easy
              and almost instantaneous.
            </p>
          </div>

          <div className="workflow-steps">
            <div className="workflow-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Request Code</h4>
                <p className="step-duration">
                  Duration: 2-3 minutes (internet required)
                </p>
                <p>
                  Start by submitting an evaluation request. You'll receive a
                  unique Tool ID via email that links your tool to the correct
                  maturity version and evaluation materials.
                </p>
              </div>
            </div>

            <div className="workflow-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Innovator Survey</h4>
                <p className="step-duration">Duration: immediate, 0 minutes</p>
                <p>
                  Our system sends the innovators focal points an email to
                  complete a structured survey. No action is required here. You
                  will be notified as soon as the answers start coming.
                </p>
              </div>
            </div>

            <div className="workflow-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Assign Experts</h4>
                <p className="step-duration">
                  Duration: hours or days (depends on expert availability)
                </p>
                <p>
                  Identify domain-specific evaluators that will evaluate the
                  innovators answers.
                </p>
              </div>
            </div>

            <div className="workflow-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Generate Expert PDFs</h4>
                <p className="step-duration">
                  Duration: 3-4 minutes (internet required)
                </p>
                <p>
                  Select <strong>Get Experts PDF</strong> to generate structured
                  documents that extract and organize relevant information from
                  the focal points' responses.
                </p>
              </div>
            </div>

            <div className="workflow-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h4>End User Data Collection</h4>
                <p className="step-duration">
                  Duration: days to weeks (no internet required)
                </p>
                <p>
                  Generate unique survey links for End Users and Downstream
                  Beneficiaries. You can send links via email, run workshops, or
                  collect data in the field.
                </p>
              </div>
            </div>

            <div className="workflow-step">
              <div className="step-number">6</div>
              <div className="step-content">
                <h4>Get MDII Report</h4>
                <p className="step-duration">
                  Duration: 4-5 minutes (internet required)
                </p>
                <p>
                  After receiving all evaluations, go to{" "}
                  <strong>Get MDII Report</strong>. Insert your tool ID and the
                  excel file will be updated with the evaluation data.
                </p>

                <div className="final-step-note">
                  <p>
                    <strong>Final Steps:</strong> Open the excel file and find
                    your tool assessment in the MDII Score and MDII
                    Recommendations tabs. Print each as PDFs - you've completed
                    an MDII evaluation!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    outputs: {
      title: "Expected Outputs",
      icon: <HiOutlineDocumentText />,
      content: (
        <div className="content-body">
          <div className="outputs-intro">
            <p>
              Once you complete your evaluation, the MDII Desktop App provides
              both a final score and a set of actionable recommendations. This
              section guides you through interpreting results, identifying
              patterns, and planning next steps for improvement.
            </p>
          </div>

          <div className="score-tiers">
            <h4>Overall MDII Score Tiers</h4>
            <div className="tier-list">
              <div className="tier exceeding">
                <span className="tier-range">90–100%:</span> Exceeding
                Expectations
              </div>
              <div className="tier meeting">
                <span className="tier-range">70–89%:</span> Meeting Expectations
              </div>
              <div className="tier approaching">
                <span className="tier-range">50–69%:</span> Approaching
                Expectations
              </div>
              <div className="tier below">
                <span className="tier-range">25–49%:</span> Below Expectations
              </div>
              <div className="tier significantly-below">
                <span className="tier-range">0–24%:</span> Significantly Below
                Expectations
              </div>
            </div>
          </div>

          <div className="interpretation-guide">
            <h4>How to Read Your Report: Step-by-Step Guide</h4>
            <div className="guide-steps">
              <div className="guide-step">
                <div className="guide-number">1</div>
                <div>
                  <strong>Start with Your Tier</strong>
                  <p>
                    The overall percentage and tier help situate the tool — but
                    it's just the beginning.
                  </p>
                </div>
              </div>
              <div className="guide-step">
                <div className="guide-number">2</div>
                <div>
                  <strong>Dive into Each Dimension</strong>
                  <p>
                    Examine each of the seven dimensions. Where are the blind
                    spots?
                  </p>
                </div>
              </div>
              <div className="guide-step">
                <div className="guide-number">3</div>
                <div>
                  <strong>Compare by User Type</strong>
                  <p>Different respondents offer distinct perspectives.</p>
                </div>
              </div>
              <div className="guide-step">
                <div className="guide-number">4</div>
                <div>
                  <strong>Use Your Recommendation Brief</strong>
                  <p>
                    Each tool receives tailored, evidence-based suggestions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="outputs-grid">
            <div className="output-item">
              <HiOutlineDocumentText />
              <div>
                <h5>1. Score Report (PDF)</h5>
                <p>
                  Overall result with percentage score, tier label, dimension
                  breakdown, and visual charts.
                </p>
              </div>
            </div>
            <div className="output-item">
              <BsLightbulb />
              <div>
                <h5>2. Recommendation Brief (PDF)</h5>
                <p>
                  Practical actions framed as "steps to reach the next tier"
                  organized by MDII dimension.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    troubleshooting: {
      title: "Troubleshooting",
      icon: <BsExclamationTriangle />,
      content: (
        <div className="content-body">
          <div className="troubleshooting-intro">
            <BsExclamationTriangle />
            <p>
              Encountering issues with the MDII Desktop App or evaluation
              process? This section provides solutions to common problems and
              step-by-step troubleshooting guides.
            </p>
          </div>

          <div className="common-issues">
            <h4>Frequently Encountered Problems</h4>

            <div className="issue-item">
              <div className="issue-header">
                <BsExclamationTriangle />
                <h5>Tool Not Loading Properly</h5>
              </div>
              <p>
                <strong>Symptoms:</strong> App crashes, blank screens, or frozen
                interface
              </p>
              <div className="solutions">
                <strong>Solutions:</strong>
                <ul>
                  <li>Restart the MDII Desktop App</li>
                  <li>Check your internet connection</li>
                  <li>Clear application cache and restart</li>
                  <li>Ensure you have sufficient system memory available</li>
                </ul>
              </div>
            </div>

            <div className="issue-item">
              <div className="issue-header">
                <BsExclamationTriangle />
                <h5>Survey Responses Not Saving</h5>
              </div>
              <p>
                <strong>Symptoms:</strong> Progress lost when returning to
                surveys
              </p>
              <div className="solutions">
                <strong>Solutions:</strong>
                <ul>
                  <li>Check network connectivity during survey completion</li>
                  <li>Complete surveys in one session when possible</li>
                  <li>Use the "Save Progress" feature regularly</li>
                  <li>Avoid browser refresh during survey completion</li>
                </ul>
              </div>
            </div>

            <div className="issue-item">
              <div className="issue-header">
                <BsExclamationTriangle />
                <h5>Report Generation Problems</h5>
              </div>
              <p>
                <strong>Symptoms:</strong> Reports appear incomplete or fail to
                generate
              </p>
              <div className="solutions">
                <strong>Solutions:</strong>
                <ul>
                  <li>Ensure all required sections are completed</li>
                  <li>Check that expert consensus has been reached</li>
                  <li>Verify PDF export settings</li>
                  <li>
                    Try regenerating reports if initial export appears
                    incomplete
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="help-note">
            <GoQuestion />
            <div>
              <h4>Need Additional Help?</h4>
              <p>
                If you're still experiencing issues after trying these
                solutions:
              </p>
              <ul>
                <li>Document the specific error messages or behaviors</li>
                <li>Note your system specifications and app version</li>
                <li>Contact technical support with detailed information</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  };

  const navigationItems = [
    { id: "welcome", title: "Welcome", icon: <GoBook /> },
    { id: "what-is-mdii", title: "1. What is MDII?", icon: <BsLightbulb /> },
    {
      id: "evaluation-framework",
      title: "2. Evaluation Framework",
      icon: <GoShield />,
    },
    { id: "mdii-components", title: "3. MDII Components", icon: <GoGear /> },
    { id: "mdii-ecosystem", title: "4. MDII Ecosystem", icon: <GoGlobe /> },
    { id: "internet-usage", title: "5. Internet Needs", icon: <GoGlobe /> },
    { id: "user-types", title: "6. User Types", icon: <GoPeople /> },
    {
      id: "expert-management",
      title: "7. Expert Management",
      icon: <HiOutlineUserGroup />,
    },
    {
      id: "evaluation-process",
      title: "8. Evaluation Workflow",
      icon: <HiOutlineChartBar />,
    },
    {
      id: "outputs",
      title: "9. Expected Outputs",
      icon: <HiOutlineDocumentText />,
    },
    {
      id: "troubleshooting",
      title: "10. Troubleshooting",
      icon: <BsExclamationTriangle />,
    },
  ];

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
                className={`nav-item ${
                  activeSection === item.id ? "active" : ""
                }`}
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
          {contentData[activeSection]?.content || (
            <div className="content-body">
              <h2>Content not found</h2>
              <p>The requested section could not be found.</p>
            </div>
          )}

          {/* Support Section - only show on welcome page */}
          {/* {activeSection === "welcome" && (
            <div
              style={{
                marginTop: "10px",
                paddingTop: "10px",
                borderTop: "1px solid #e2e8f0",
              }}
            >
              <h3>Additional Support</h3>
              <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
                Resources for further assistance
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2rem",
                  margin: "2rem 0",
                }}
              >
                <div
                  style={{
                    background: "white",
                    padding: "1.5rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3 style={{ margin: "0 0 1rem 0", color: "#1e293b" }}>
                    Technical Support
                  </h3>
                  <p style={{ margin: "0 0 1rem 0", color: "#6b7280" }}>
                    For technical issues or system-related questions
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#3b82f6",
                      fontWeight: "500",
                    }}
                  >
                    mdii@cgiar.org
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#6b7280",
                      }}
                      title="Copy email"
                      onClick={() => copyToClipboard("mdii@cgiar.org")}
                    >
                      <GoCopy />
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    background: "white",
                    padding: "1.5rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3 style={{ margin: "0 0 1rem 0", color: "#1e293b" }}>
                    Methodology Questions
                  </h3>
                  <p style={{ margin: "0 0 1rem 0", color: "#6b7280" }}>
                    For evaluation methodology and process guidance
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#3b82f6",
                      fontWeight: "500",
                    }}
                  >
                    mdii@cgiar.org
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#6b7280",
                      }}
                      title="Copy email"
                      onClick={() => copyToClipboard("mdii@cgiar.org")}
                    >
                      <GoCopy />
                    </button>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "#f8fafc",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  marginTop: "1.5rem",
                }}
              >
                <p style={{ margin: 0, color: "#374151" }}>
                  <strong>Response Time:</strong> We typically respond to
                  support requests within 1-2 business days. For urgent
                  technical issues, please indicate "URGENT" in your subject
                  line.
                </p>
              </div>

              <div style={{ marginTop: "2rem" }}>
                <h3>Discover more about MDII</h3>
                <p>
                  Visit our website:{" "}
                  <a
                    href="https://mdii.iwmi.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#3b82f6", textDecoration: "none" }}
                  >
                    mdii.iwmi.org
                  </a>
                </p>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksGuide;
