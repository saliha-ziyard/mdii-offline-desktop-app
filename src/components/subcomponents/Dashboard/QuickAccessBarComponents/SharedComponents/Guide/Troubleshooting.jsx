import React, { useState } from "react";
import { BsExclamationTriangle } from "react-icons/bs";

const Troubleshooting = ({ setCurrentPage, setActiveSection, activeSection }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const faqs = [
    {
      question: "What should I do if my Tool ID does not arrive?",
      answer: (
        <div>
          <p>
            If you haven't received your Tool ID after submitting an evaluation request, please check the following:
          </p>
          <ul>
            <li>
              <strong>Check Spam/Junk Folder:</strong> The email may have been filtered.
            </li>
            <li>
              <strong>Verify Email Address:</strong> Ensure you entered the correct email during the request.
            </li>
            <li>
              <strong>Wait a Few Minutes:</strong> Email delivery can sometimes take a few minutes due to server delays.
            </li>
            <li>
              <strong>Contact Support:</strong> If the issue persists, reach out to{" "}
              <a href="mailto:mdii-support@cgiar.org">mdii-support@cgiar.org</a> with your request details.
            </li>
          </ul>
        </div>
      ),
    },
    {
      question: "Why is my Excel workbook not updating with new data?",
      answer: (
        <div>
          <p>
            If the Excel workbook isn’t reflecting new survey responses or evaluation data:
          </p>
          <ul>
            <li>
              <strong>Check Internet Connection:</strong> Data syncing requires a brief internet connection to fetch updates.
            </li>
            <li>
              <strong>Verify Tool ID:</strong> Ensure the correct Tool ID is entered in the app when syncing.
            </li>
            <li>
              <strong>Check File Path:</strong> Confirm the workbook is saved in the correct directory where the app expects it (usually the default folder created during Step 4).
            </li>
            <li>
              <strong>Manual Refresh:</strong> Try selecting <strong>Get MDII Report</strong> again to force a data refresh.
            </li>
            <li>
              <strong>Contact Support:</strong> If unresolved, email{" "}
              <a href="mailto:mdii-support@cgiar.org">mdii-support@cgiar.org</a> with a description of the issue.
            </li>
          </ul>
        </div>
      ),
    },
    {
      question: "What if I can’t find experts for a specific domain?",
      answer: (
        <div>
          <p>
            If you’re struggling to identify domain experts for a particular area (e.g., GESI, ICT, or Economics):
          </p>
          <ul>
            <li>
              <strong>Expand Your Network:</strong> Reach out to partner institutions, universities, or professional networks for recommendations.
            </li>
            <li>
              <strong>Use Internal Resources:</strong> Check if colleagues within your organization have relevant expertise and meet the independence criteria.
            </li>
            <li>
              <strong>Contact MDII Support:</strong> Email{" "}
              <a href="mailto:mdii-support@cgiar.org">mdii-support@cgiar.org</a> for guidance on finding experts or adjusting the evaluation scope.
            </li>
            <li>
              <strong>Proceed with Available Experts:</strong> If a domain is missing, you can still complete the evaluation, but note that the results may be less comprehensive for that dimension.
            </li>
          </ul>
        </div>
      ),
    },
    {
      question: "How do I collect data offline using KoboToolbox?",
      answer: (
        <div>
          <p>
            To collect survey responses offline using KoboToolbox:
          </p>
          <ul>
            <li>
              <strong>Download KoboCollect App:</strong> Install the KoboCollect app on your mobile device (available for Android and iOS).
            </li>
            <li>
              <strong>Cache Survey Form:</strong> Open the survey link in KoboToolbox while online to cache it for offline use.
            </li>
            <li>
              <strong>Collect Responses Offline:</strong> Use the app to collect responses in the field without an internet connection.
            </li>
            <li>
              <strong>Sync When Online:</strong> Once back online, sync the collected data to the KoboToolbox server.
            </li>
            <li>
              <strong>Consult Documentation:</strong> For detailed steps, refer to the{" "}
              <a href="https://support.kobotoolbox.org/data_through_webforms.html?highlight=offline">
                KoboToolbox Offline Documentation
              </a>.
            </li>
          </ul>
        </div>
      ),
    },
    {
      question: "Why are my PDF outputs not generating correctly?",
      answer: (
        <div>
          <p>
            If the Score Report or Recommendation Brief PDFs are not generating properly:
          </p>
          <ul>
            <li>
              <strong>Check Workbook Tabs:</strong> Ensure the “MDII Score” and “MDII Recommendations” tabs in the Excel workbook are populated with data.
            </li>
            <li>
              <strong>Verify Export Settings:</strong> When exporting, select “PDF” as the file format and ensure no cells are corrupted.
            </li>
            <li>
              <strong>Update Workbook:</strong> Try re-running <strong>Get MDII Report</strong> to refresh the workbook data.
            </li>
            <li>
              <strong>Check Software Compatibility:</strong> Ensure your Excel version supports the workbook’s formatting (use Excel 2016 or later for best results).
            </li>
            <li>
              <strong>Contact Support:</strong> If issues persist, email{" "}
              <a href="mailto:mdii-support@cgiar.org">mdii-support@cgiar.org</a> with details of the error.
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="content-body">
      <h3>Troubleshooting</h3>
      <p>
        Below are common issues you might encounter while using the MDII Desktop App, along with steps to resolve them.
      </p>

      <div className="faq-section">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-question" onClick={() => toggle(index)}>
              <span>{faq.question}</span>
              <span className="dropdown-icon">{openIndex === index ? "▲" : "▼"}</span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Troubleshooting;
