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
import { GiLightBulb } from "react-icons/gi";
import { GrDashboard } from "react-icons/gr";

const steps = [
  {
    number: 1,
    title: "Request Code",
    duration: "2-3 minutes (internet required)",
    content: (
      <>
        <p>
          Start by submitting an evaluation request. You'll receive a unique Tool ID via email that links your tool to the correct maturity version and evaluation materials. You need to already have the names and email addresses of the innovators focal points.</p>
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
      </>
    ),
  },
  {
    number: 2,
    title: "Innovator Survey",
    duration: "immediate, 0 minutes",
    content: (
      <p>
        Our system sends the innovators focal points an email to complete a structured survey. This provides essential background and operational context about the tool being assessed. No action is required here. You will be notified as soon as the answers start coming</p>
    ),
  },
  {
    number: 3,
    title: "Assign Experts",
    duration: "hours or days (depends on expert availability)",
    content: (
      <div>
      <p>
        Identify domain-specific evaluators that will evaluate the innovators answers.
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
      <p>
      After collecting survey responses from the three focal points, select <strong>Get Experts PDF</strong> to generate structured document (compilation) that extracts and organizes relevant information from the focal points' responses. This will generate an excel file and store it on your computer alongside the compilations. Send these to the experts you identified in the previous step.      </p>
    ),
  },
  {
    number: 5,
    title: "End User Data Collection",
    duration: "days to weeks (no internet required)",
    content: (
      <div>
      <p>
      Generate unique survey links for End Users and Downstream Beneficiaries by going to <strong>Get Data Collection Link</strong>. You can send links via email, run workshops, or collect data in the field.      
      </p>
      <div className="blue-box">
        <p><strong>Important Note:</strong>Our survey platform (Kobo Toolbox) allows offline collection using the KoboCollect App.</p>
      </div>
      </div>
      
    ),
  },
  {
    number: 6,
    title: "Get MDII Report",
    duration: "4-5 minutes (internet required)",
    content: (
      <>
        <p>
        After receiving all evaluations from users, downstream beneficiaries (optional) and experts, go to <strong>Get MDII Report</strong>. Insert your tool ID and wait for magic to happen. The excel file generated in step 4 will be updated with the evaluation data.        </p>
        <div className="blue-box">
          <p>
            <strong>Final Steps:</strong> Open the excel file and find your tool assessment in the MDII Score and MDII Recommendations tabs. Print each as PDFs – you've completed an MDII evaluation!
          </p>
        </div>
      </>
    ),
  },
];
const HowItWorksGuide = ({ setCurrentPage = () => {} }) => {
  const [activeSection, setActiveSection] = useState("welcome");
  const [nestedExpanded, setNestedExpanded] = useState({});
    const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };
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
              <button
                className={`tab-button ${
                  nestedExpanded.componentTab === "workbook" ? "active" : ""
                }`}
                onClick={() =>
                  setNestedExpanded((prev) => ({
                    ...prev,
                    componentTab: "workbook",
                  }))
                }
              >
                Workbook
              </button>
              <button
                className={`tab-button ${
                  nestedExpanded.componentTab === "outputs" ? "active" : ""
                }`}
                onClick={() =>
                  setNestedExpanded((prev) => ({
                    ...prev,
                    componentTab: "outputs",
                  }))
                }
              >
                Outputs
              </button>
            </div>

            <div className="tab-content">
              {(!nestedExpanded.componentTab ||
                nestedExpanded.componentTab === "maturity") && (
                <div>
                  <h4>Tool Maturity</h4>
                  <p>
                    MDII supports two evaluation tracks, depending on the development stage of the tool that is being assessed:
                  </p>

                  <div className="maturity-grid">
                    <div className="maturity-item regular">
                      <h4>Regular Version</h4>
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
                      <h4>Ex-Ante Version</h4>
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
                        <li>Generates feedback based on intentions, assumptions, and plans</li>

                      </ul>
                    </div>
                  </div>

                  <div className="grey-box">
                    <p>The desktop app is designed to <strong>automatically detect the tool's maturity level</strong> once it's loaded into the system and selects the appropriate version of the Index for scoring and reporting. You don't need to choose manually; the system adapts based on the tool profile already stored in our database.</p>
                  </div>
                </div>
              )}

              {nestedExpanded.componentTab === "surveys" && (
                <div className="surveys">
                  <h4>Surveys</h4>
                  <p>
                    MDII utilizes targeted surveys to gather comprehensive data from different stakeholder groups. These surveys collect both qualitative and quantitative insights to assess how digital tools perform across inclusiveness criteria.
                  </p>
                  <div className="grey-box">
                      <p><strong>Innovators (Type 1)</strong></p>
                      <p>Survey for tool developers and creators</p>
                  </div>
                  <div className="grey-box">
                      <strong>Domain Experts (Type 2)</strong>
                      <p>Survey for subject matter specialists</p>
                  </div>
                  <div className="grey-box">
                      <strong>End Users (Type 3)</strong>
                      <p>Survey for direct tool users</p>
                  </div>
                  <div className="grey-box">
                      <strong>Downstream Beneficiaries (Type 4 — optional)</strong>
                      <p>Survey for indirect beneficiaries of the tool</p>
                  </div>
                  <div>
                    <p>Each type receives a tailored set of questions aligned with MDII's dimensions. The surveys are designed to be lightweight and can be completed online (via KoboToolbox) or offline using printable versions.</p>
                    <p>These surveys gather both qualitative and quantitative data to assess how the digital tool performs across inclusiveness criteria — such as accessibility, usability, relevance, and equity.</p>
                  </div>
                </div>
              )}

              {nestedExpanded.componentTab === "compilations" && (
                <div>
                  <h4>Compilations</h4>
                  <p>
                    Once the innovator survey is completed, the system generates PDF compilations for each expert domain. These documents summarize relevant answers provided by the tool developers and serve as input material for domain experts.
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

                  <div className="grey-box">
                    <p>The expert uses this compilation as a reference to complete their evaluation independently, helping ensure that the scoring reflects both internal knowledge and external assessment.</p>
                </div>
                </div>
              )}
               {nestedExpanded.componentTab === "workbook" && (
                <div>
                  <h4>Workbook</h4>
                  <p>All survey responses feed into a pre-formatted Excel workbook, which performs automated calculations and generates comprehensive reports.</p>
                  <div className="grey-box">
                    <strong>The workbook does:</strong>
                    <ul>
                      <li>Automatically calculates the overall MDII score (0–100%)</li>
                      <li>Assigns a tier label (e.g. "Meeting Expectations")</li>
                      <li>Breaks down results across 7 MDII dimensions</li>
                      <li>Displays results using tables and radar/spider charts</li>
                      <li>Suggests recommendations per dimension, including tier-based actions to improve</li>
                    </ul>
                  </div>
                  <div className="grey-box">
                    <p>The workbook is structured with separate tabs for scores and recommendations. No manual calculation is needed — scores and outputs are generated automatically once data is entered.</p>
                  </div>
                </div>
               )}
              {nestedExpanded.componentTab === "outputs" && (
                <div>
                  <h4>Outputs</h4>
                  <p>After reviewing the Excel workbook, users generate two key outputs by exporting the relevant tabs as PDFs.</p>
                  <div className="grey-box">
                    <ul><li>Score Report (PDF)</li></ul>
                    <p>Summarizes the final MDII score, tier label, visual charts, and a dimension-level breakdown of inclusiveness performance.</p>
                  </div>
                  <div className="grey-box">
                    <ul><li>Recommendation Brief (PDF)</li></ul>
                    <p>Lists practical, evidence-based actions to improve the tool. These suggestions are framed as "steps to reach the next tier" and are organized by MDII dimension.</p>
                  </div>

                  <div className="grey-box">
                    <p>These files are designed to support internal planning, external discussions, and roadmap decisions — giving teams a concrete snapshot of where they stand and where to go next.</p>
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
          <h3>MDII Ecosystem</h3>
          <p>
            MDII is more than this desktop app. It's a <strong>modular ecosystem </strong> of tools tailored to different needs and connectivity environments.
          </p>
          <p>Besides this offline-friendly desktop app, there are 3 additional tools:</p>
           <div className="component-tabs">
            <div className="tab-header">
              <button
                className={`tab-button ${
                  !nestedExpanded.componentTab ||
                  nestedExpanded.componentTab === "fullassessment"
                    ? "active"
                    : ""
                }`}
                onClick={() => toggleNested("componentTab")}
              >
                <GoGlobe/> Full Assessment
              </button>
              <button
                className={`tab-button ${
                  nestedExpanded.componentTab === "rapidassessment" ? "active" : ""
                }`}
                onClick={() =>
                  setNestedExpanded((prev) => ({
                    ...prev,
                    componentTab: "rapidassessment",
                  }))
                }
              >
                <GiLightBulb/> AI-Rapid Assessment
              </button>
              <button
                className={`tab-button ${
                  nestedExpanded.componentTab === "mdiidashboard" ? "active" : ""
                }`}
                onClick={() =>
                  setNestedExpanded((prev) => ({
                    ...prev,
                    componentTab: "mdiidashboard",
                  }))
                }
              >
                <GrDashboard/> MDII Dashboard
              </button>
            </div>

            <div className="tab-content">
              {(!nestedExpanded.componentTab ||
                nestedExpanded.componentTab === "fullassessment") && (
                <div>
                  <h4>Full Assessment</h4>
                  <p className="tag">Fully Online</p>
                  <div >
                    <ul>
                      <li>A detailed, survey-based version of MDII, designed for use entirely through the MDII web application.</li>
                      <li>Includes automated flows to collect responses, calculate scores, and generate reports and recommendations.</li>
                      <li>Suitable for projects with reliable internet access, where users can stay connected throughout the process.</li>
                      <li>May not be ideal in low-connectivity environments, as it depends on online infrastructure to function.</li>
                    </ul>
                  </div>
                </div>
              )}
              {(nestedExpanded.componentTab === "rapidassessment") && (
                <div>
                  <h4>AI-Rapid Assessment</h4>
                  <p className="tag">Fully Online</p>
                  <div >
                    <ul>
                      <li>A fast, AI-powered assessment tool.</li>
                      <li>Offers immediate feedback based on limited inputs</li>
                      <li>Perfect for early-stage prototypes or fast reviews</li>
                    </ul>
                  </div>
                </div>
                )}
                {(nestedExpanded.componentTab === "mdiidashboard") && (
                <div>
                  <h4>MDII Dashboard</h4>
                  <p className="tag">Fully Online</p>
                  <div >
                    <ul>
                      <li>A centralized space to explore your results once reports are generated.</li>
                      <li>Enables tool comparison, performance tracking, and access to aggregated insights.</li>
                      <li>Useful for coordinators, decision-makers, and funders looking at multiple tools or countries.</li>
                    </ul>
                  </div>
                </div>
                )}
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
          <h3>Internet Needs</h3>
          <div>
            <strong>Connection Required For:</strong>
            <ul>
              <li>Data fetching during compilation and score generation</li>
              <li>Opening KoboToolbox form URL for the first time (caching for offline use)</li>
            </ul>
          </div>
          <p>
            The MDII Desktop App is designed to work effectively in environments
            with limited or intermittent internet access.
          </p>

          <div className="grey-box">
            <p>For more information on how to use KoboToolbox in offline settings, please consult: </p>
            <p><a href="https://support.kobotoolbox.org/data_through_webforms.html?highlight=offline">KoboToolbox Offline Documentation</a></p>
          </div>
        </div>
      ),
    },

    "user-types": {
      title: "User Types",
      icon: <GoPeople />,
      content: (
        <div className="content-body">
          <h3>User Types</h3>
          <p>Different types of users contribute to an MDII evaluation:</p>
          
          <div className="component-tabs">
            <div className="tab-header">
              <button
                className={`tab-button ${
                  !nestedExpanded.componentTab ||
                  nestedExpanded.componentTab === "innovators1 "
                    ? "active"
                    : ""
                }`}
                onClick={() => toggleNested("componentTab")}
              >
                Innovators
              </button>
              <button
                className={`tab-button ${
                  nestedExpanded.componentTab === "domain-experts" ? "active" : ""
                }`}
                onClick={() =>
                  setNestedExpanded((prev) => ({
                    ...prev,
                    componentTab: "domain-experts",
                  }))
                }
              >
                Domain Experts
              </button>
              <button
                className={`tab-button ${
                  nestedExpanded.componentTab === "end-users" ? "active" : ""
                }`}
                onClick={() =>
                  setNestedExpanded((prev) => ({
                    ...prev,
                    componentTab: "end-users",
                  }))
                }
              >
                End Users
              </button>
              <button
                className={`tab-button ${
                  nestedExpanded.componentTab === "downstream-beneficiaries" ? "active" : ""
                }`}
                onClick={() =>
                  setNestedExpanded((prev) => ({
                    ...prev,
                    componentTab: "downstream-beneficiaries",
                  }))
                }
              >
                Downstream Beneficiaries
              </button>
            <div/>
            </div>
            <div className="tab-content">
              {(!nestedExpanded.componentTab ||
                nestedExpanded.componentTab === "innovators1") && (
                <div>
                  <p className="tag" style={{ backgroundColor: '#ff0000'}}>Mandatory</p>
                  <h4>Innovators (Type 1)</h4>
                  <p>The people or teams who developed the digital tool</p>
                  <p className="tag-text">Provide essential context about the tool's design, goals, and implementation approach.</p>
                  <div className="grey-box">
                    <p><strong>Sample Size:</strong> No minimum required — more responses provide better results</p>
                  </div>
                </div>
              )}

              {(nestedExpanded.componentTab === "domain-experts") && (
                <div>
                  <p className="tag" style={{ backgroundColor: '#ff0000'}}>Mandatory</p>
                  <h4>Domain Experts (Type 2)</h4>
                  <p>Technical or thematic specialists who review the tool based on specific dimensions</p>
                  <p className="tag-text">Offer independent professional assessment across GESI, ICT, Data, Economics, and other critical areas.</p>
                  <div className="grey-box">
                    <p><strong>Sample Size:</strong> No minimum required — more responses provide better results.</p>
                  </div>
                </div>
              )}

              {(nestedExpanded.componentTab === "end-users") && (
                <div>
                  <p className="tag" style={{ backgroundColor: '#ff0000'}}>Mandatory</p>
                  <h4>End Users (Type 3)</h4>
                  <p>Individuals who interact directly with the tool. Can be farmers, extension agents, or governmental individuals.</p>
                  <p className="tag-text">Provide real-world usage feedback on usability, trust, and accessibility from direct experience.</p>
                  <div className="grey-box">
                    <p><strong>Sample Size:</strong> No minimum required — more responses provide better results.</p>
                  </div>
                </div>
              )}

              {(nestedExpanded.componentTab === "downstream-beneficiaries") && (
                <div>
                  <p className="tag" >Optional</p>
                  <h4>Downstream Beneficiaries (Type 4)</h4>
                  <p>People impacted by the tool's use or decisions, even if they don't interact with it directly.</p>
                  <p className="tag-text">Share perspectives on indirect impacts and broader consequences of the tool's deployment.</p>
                  <div className="grey-box">
                    <p><strong>Sample Size:</strong> No minimum required — more responses provide better results.</p>
                  </div>
                </div>
              )}
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
          <h3>Expert Management</h3>
          <p>
            Managing domain experts and their contributions to the MDII evaluation.
          </p>

          <div className="component-tabs">
            <div className="tab-header">
              <button
                className={`tab-button ${
                  !nestedExpanded.componentTab ||
                  nestedExpanded.componentTab === "expert-roles"
                    ? "active"
                    : ""
                }`}
                onClick={() => toggleNested("componentTab")}
              >
                Expert Roles
              </button>
              <button
                className={`tab-button ${
                  nestedExpanded.componentTab === "selection-criteria" ? "active" : ""
                }`}
                onClick={() =>
                  setNestedExpanded((prev) => ({
                    ...prev,
                    componentTab: "selection-criteria",
                  }))
                }
              >
                Selection Criteria
              </button>
              <button
                className={`tab-button ${
                  nestedExpanded.componentTab === "selection-process" ? "active" : ""
                }`}
                onClick={() =>
                  setNestedExpanded((prev) => ({
                    ...prev,
                    componentTab: "selection-process",
                  }))
                }
              >
                Selection Process
              </button>
              
            <div/>
            </div>
            <div className="tab-content">
              {(!nestedExpanded.componentTab ||
                nestedExpanded.componentTab === "expert-roles") && (
                <div>
                  <h4>Role of Domain Experts</h4>
                  <p>Domain experts provide an independent perspective on how inclusive a digital tool is across critical dimensions like GESI, ICT, Data, Economics, and more. They <strong> do not represent tool developers or project teams.</strong> Their role is to apply their subject-matter knowledge to interpret and assess the information provided by innovators.</p>
                  <p>Each MDII evaluation should include at least one expert per relevant domain, depending on the version being used (Regular or Ex-Ante). These experts help validate the inclusiveness of the tool from different disciplinary angles.</p>
                </div>
              )}

              {(nestedExpanded.componentTab === "selection-criteria") && (
                <div>
                  <h4>Selection Criteria</h4>
                  <p>Domain experts can be internal or external to the organization conducting the evaluation, but they must meet two key criteria:</p>
                  <div>
                    <p><strong>1. Subject-matter Relevance</strong></p>
                    <p>The individual should have recognized expertise in one of the required domains:</p>
                    <ul>
                      <li>Gender Equality and Social Inclusion</li>
                      <li>Data</li>
                      <li>Human-Centered Design (Regular Version only)</li>
                      <li>Information and Communication Technologies</li>
                      <li>Economics</li>
                      <li>Country Expert</li>
                    </ul>
                </div>
                <div>
                  <p><strong>2. Independence from the Tools</strong></p>
                  <p>Experts must not have been involved in the development, design, implementation, or promotion of the tool under evaluation. Their perspective should be impartial and based on professional knowledge of the domain.</p>
                  </div>
                </div>
              )}

              {(nestedExpanded.componentTab === "selection-process") && (
                <div>
                  <h4>How to Identify and Select Experts</h4>
                  <p>The person coordinating the evaluation should take the following steps:</p>
                  <p> 1. Start with your institution or program team - look for subject-matter expertise without direct tool involvement.<br/>
                    2. Expand to trusted networks - partner institutions, universities, domain-specific networks.<br/>
                    3. Verify eligibility - ensure both domain relevance and independence criteria are met.<br/>
                    4. Send clear invitation - explain purpose, contribution, time commitment (30-60 minutes), and importance of independence.
                  </p>
                  <div className="blue-box">
                    <h4>Coordination Tips</h4>
                    <ul>
                      <li>Aim for diversity across the expert pool—gender, geography, and institutional backgrounds.</li>
                      <li>Experts can be identified at any stage, but surveys should only be shared after innovator inputs are complete.</li>
                      <li>Keep track of which domains have been assigned and who is responsible for each.</li>
                    </ul>
                  </div>

                </div>
              )}

              {(nestedExpanded.componentTab === "downstream-beneficiaries") && (
                <div>
                  <p className="tag" >Optional</p>
                  <h4>Downstream Beneficiaries (Type 4)</h4>
                  <p>People impacted by the tool's use or decisions, even if they don't interact with it directly.</p>
                  <p className="tag-text">Share perspectives on indirect impacts and broader consequences of the tool's deployment.</p>
                  <div className="grey-box">
                    <p><strong>Sample Size:</strong> No minimum required — more responses provide better results.</p>
                  </div>
                </div>
              )}
            </div>
            </div>
        </div>
      ),
    },

    "evaluation-process": {
      title: "Evaluation Workflow",
      icon: <HiOutlineChartBar />,
      content: (
        <div className="content-body">
          <h3>Evaluation Workflow</h3>
          <p>
            This section outlines the full journey of evaluating a digital tool's inclusiveness using the MDII desktop toolkit. Whether you're a field coordinator, evaluator, or project lead, these are the steps you'll follow from requesting your evaluation code to generating your final report.
          </p>

          <div className="timeline-note">
            <p>
              <strong>Timeline Information:</strong> The duration of an MDII evaluation depends on how fast you can make your respondents fill out their surveys. As an evaluation coordinator, your work is easy and almost instantaneous.
            </p>
          </div>

        <div className="workflow-steps">
              {steps.map((step, index) => (
                <div className="workflow-step" key={index}>
                  <div className="step-header" onClick={() => toggle(index)}>
                    <div className="step-number">{step.number}</div>
                    <div className="step-title">
                      <h4>{step.title}</h4>
                      <p className="step-duration">Duration: {step.duration}</p>
                    </div>
                    <div className="dropdown-icon">{openIndex === index ? "▲" : "▼"}</div>
                  </div>
                  {openIndex === index && <div className="step-content">{step.content}</div>}
                </div>
              ))}
        </div>
        </div>
      ),
    },

    outputs: {
      title: "Outputs",
      icon: <HiOutlineDocumentText />,
      content: (
        <div className="content-body">
          <div className="outputs-intro">
            <p>
              Once you complete your evaluation, the MDII Desktop App provides both a final score and a set of actionable recommendations. But how do you make sense of these outputs? This section guides you through interpreting results, identifying patterns, and planning next steps for improvement.
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
