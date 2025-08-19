import React, { useState, useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { BsCheckCircle, BsExclamationTriangle } from "react-icons/bs";
import { HiOutlineUserGroup, HiOutlineClipboardDocumentList } from "react-icons/hi2";

const UserTestingPage = ({ setCurrentPage, toolId: propToolId, setToolId: propSetToolId, setStatus: propSetStatus }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingMaturity, setIsCheckingMaturity] = useState(false);
  const [progress, setProgress] = useState(0);
  const [localStatus, setLocalStatus] = useState("");
  const [localToolId, setLocalToolId] = useState(propToolId || "");
  const [toolMaturity, setToolMaturity] = useState(null);
  const [showForms, setShowForms] = useState(false);

  // Use local state if props are not available
  const toolId = propToolId !== undefined ? propToolId : localToolId;
  const setToolId = propSetToolId || setLocalToolId;

  // API Configuration
  const API_TOKEN = "fc37a9329918014ef595b183adcef745a4beb217";
  const BASE_URL = "https://kf.kobotoolbox.org/api/v2";
  const MAIN_FORM_ID = "aJn2DsjpAeJjrB6VazHjtz";
  const MATURITY_FIELD = "tool_maturity";

  // Form URLs based on maturity
  const FORM_URLS = {
    advanced: {
      ut3: "https://ee.kobotoolbox.org/x/oiuVK6X5",
      ut4: "https://ee.kobotoolbox.org/x/hYoPcdik"
    },
    early: {
      ut3: "https://ee.kobotoolbox.org/x/cZrkpqm6",
      ut4: "https://ee.kobotoolbox.org/x/A2LxHiOT"
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Helper function to safely set status
  const updateStatus = (message) => {
    if (propSetStatus && typeof propSetStatus === 'function') {
      propSetStatus(message);
    } else {
      setLocalStatus(message);
    }
  };

  // Check tool maturity via API
  const checkToolMaturity = async (toolIdToCheck) => {
    setIsCheckingMaturity(true);
    updateStatus("Checking tool maturity...");

    try {
      // Get submissions from the specific main form
      const submissionsResponse = await fetch(`${BASE_URL}/assets/${MAIN_FORM_ID}/data/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
      });

      // Check if we got HTML instead of JSON (common CORS/auth issue)
      const contentType = submissionsResponse.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('API returned HTML instead of JSON. This may be a CORS issue or authentication problem.');
      }

      if (!submissionsResponse.ok) {
        const errorText = await submissionsResponse.text();
        throw new Error(`API request failed: ${submissionsResponse.status} - ${errorText}`);
      }

      const submissionsData = await submissionsResponse.json();
      
      if (!submissionsData.results || !Array.isArray(submissionsData.results)) {
        throw new Error('No submissions found in the main form.');
      }

      updateStatus(`Searching through ${submissionsData.results.length} submissions...`);

      // Look for our tool ID in submissions
      let foundMaturity = null;
      let matchingSubmission = null;

      for (let i = 0; i < submissionsData.results.length; i++) {
        const submission = submissionsData.results[i];
        
        // Check various possible field names for tool ID
        const possibleToolIdFields = ['ID', 'tool_id', 'toolId', 'Tool_ID', 'TOOL_ID', 'toolid'];
        const toolIdMatch = possibleToolIdFields.some(field => {
          const fieldValue = submission[field];
          if (!fieldValue) return false;
          return fieldValue === toolIdToCheck || 
                 (typeof fieldValue === 'string' && fieldValue.toLowerCase() === toolIdToCheck.toLowerCase());
        });

        if (toolIdMatch) {
          matchingSubmission = submission;
          console.log('Found matching submission:', matchingSubmission);
          
          // Try different possible field names for maturity
          const possibleMaturityFields = [MATURITY_FIELD, 'tool_maturity', 'toolMaturity', 'Tool_Maturity', 'TOOL_MATURITY'];
          for (const field of possibleMaturityFields) {
            if (submission[field]) {
              foundMaturity = submission[field];
              console.log(`Found maturity in field '${field}':`, foundMaturity);
              break;
            }
          }
          break;
        }
      }

      if (matchingSubmission && foundMaturity) {
        // Normalize maturity value
        const maturityString = String(foundMaturity).toLowerCase();
        const normalizedMaturity = maturityString.includes('advance') || 
                                  maturityString.includes('advanced') ? 'advanced' : 'early';
        
        setToolMaturity(normalizedMaturity);
        setShowForms(true);
        updateStatus(`Tool maturity found: ${foundMaturity}. Forms are now available.`);
      } else if (matchingSubmission && !foundMaturity) {
        console.log('Available fields in matching submission:', Object.keys(matchingSubmission));
        updateStatus("Tool ID found but maturity information is missing. Please contact support.");
        setShowForms(false);
      } else {
        updateStatus("Tool ID not found. Please verify your Tool ID is correct.");
        setShowForms(false);
      }

    } catch (error) {
      console.error('Error checking tool maturity:', error);
      
      // Provide more specific error messages
      if (error.message.includes('CORS')) {
        updateStatus("API access blocked by browser security. Please contact support for assistance.");
      } else if (error.message.includes('authentication') || error.message.includes('401')) {
        updateStatus("Authentication failed. Please contact support to verify API access.");
      } else if (error.message.includes('HTML instead of JSON')) {
        updateStatus("API configuration issue detected. Please contact support for assistance.");
      } else if (error.message.includes('404')) {
        updateStatus("Main form not found. Please contact support to verify the form ID.");
      } else {
        updateStatus(`Error checking tool maturity: ${error.message}`);
      }
      setShowForms(false);
    } finally {
      setIsCheckingMaturity(false);
    }
  };

  // Handle form opening
  const handleOpenForm = (formType) => {
    if (!toolMaturity || !toolId) return;

    const baseUrl = FORM_URLS[toolMaturity][formType];
    const formUrl = `${baseUrl}?&d[group_individualinfo/Q_13110000]=${encodeURIComponent(toolId)}`;
    
    console.log(`Opening ${formType.toUpperCase()} form:`, formUrl);
    
    const newWindow = window.open(formUrl, "_blank", "noopener,noreferrer");
    
    setTimeout(() => {
      if (newWindow && !newWindow.closed) {
        updateStatus(`${formType.toUpperCase()} form opened successfully!`);
      } else {
        updateStatus(`${formType.toUpperCase()} form opened (popup may have been blocked)`);
      }
    }, 1000);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setToolId(value);
    
    // Reset form visibility and maturity when tool ID changes
    setShowForms(false);
    setToolMaturity(null);
    
    // Clear status when user starts typing
    if (localStatus || (propSetStatus && typeof propSetStatus === 'function')) {
      updateStatus("");
    }
  };

  // Handle check maturity button click
  const handleCheckMaturity = () => {
    if (!toolId || toolId.trim() === "") {
      updateStatus("Please enter a Tool ID");
      return;
    }

    if (isCheckingMaturity) {
      return; // Prevent multiple clicks
    }

    checkToolMaturity(toolId.trim());
  };

  // Get current status
  const currentStatus = propSetStatus && typeof propSetStatus === 'function' ? 
    (propSetStatus.status || "") : localStatus;

  useEffect(() => {
    let interval;
    if (isCheckingMaturity) {
      setProgress(5);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 300);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isCheckingMaturity]);

  // Update local tool ID when prop changes
  useEffect(() => {
    if (propToolId !== undefined && propToolId !== localToolId) {
      setLocalToolId(propToolId);
    }
  }, [propToolId, localToolId]);

  return (
    <div className="innovator-container">
      <button 
        onClick={() => setCurrentPage && setCurrentPage("home")} 
        className="back-btn"
        type="button"
      >
        <GoArrowLeft />
      </button>

      <div className="innovator-content">
        <h1>User Testing Assignment</h1>
        <p className="innovator-subtitle">
          Access UT3 and UT4 forms based on your tool's maturity stage
        </p>

        <section className="innovator-section">
          <div className="innovator-section-header">
            <HiOutlineUserGroup />
            <div>
              <h2>Tool Maturity Check</h2>
              <p>Enter your Tool ID to check maturity and access appropriate forms</p>
            </div>
          </div>

          <div className="innovator-form-content">
            <div className="innovator-input-group">
              <label htmlFor="tool-input" className="innovator-input-label">
                Tool ID
              </label>
              <input
                id="tool-input"
                type="text"
                value={toolId}
                onChange={handleInputChange}
                placeholder="Enter tool ID (e.g., MDII-ILCYM-110825)"
                className="innovator-tool-input"
              />
              <div className="innovator-tip">
                <BsCheckCircle />
                <span>
                  Tool ID must match the one used for your evaluation.
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckMaturity}
              disabled={isCheckingMaturity}
              className={`innovator-generate-button ${isCheckingMaturity ? "disabled" : ""}`}
              type="button"
            >
              {isCheckingMaturity ? "Checking Maturity..." : "Check Tool Maturity"}
            </button>

            {isCheckingMaturity && (
              <div className="innovator-loading-bar-container">
                <div
                  className="innovator-loading-bar"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            {(currentStatus || localStatus) && (
              <div className={`innovator-status-message ${
                (currentStatus || localStatus).includes("Error") || 
                (currentStatus || localStatus).includes("Please enter") ||
                (currentStatus || localStatus).includes("not found") ? "error" : "success"
              }`}>
                {(currentStatus || localStatus).includes("Error") || 
                 (currentStatus || localStatus).includes("Please enter") ||
                 (currentStatus || localStatus).includes("not found") ? (
                  <BsExclamationTriangle className="innovator-status-icon innovator-error-icon" />
                ) : (
                  <BsCheckCircle className="innovator-status-icon innovator-success-icon" />
                )}
                <span>{currentStatus || localStatus}</span>
              </div>
            )}
          </div>
        </section>

        {showForms && toolMaturity && (
          <section className="innovator-section">
            <div className="innovator-section-header">
              <HiOutlineClipboardDocumentList />
              <div>
                <h2>User Testing Forms</h2>
                <p>
                  Available forms for <strong>{toolMaturity === 'advanced' ? 'Advanced' : 'Early'} Stage</strong> tools
                </p>
              </div>
            </div>

            <div className="innovator-form-content">
              <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                <div style={{ 
                  padding: '20px', 
                  border: '1px solid var(--border-colour)', 
                  borderRadius: 'var(--border-radius)',
                  background: 'var(--bg-grey)'
                }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>UT3 Form</h3>
                  <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: 'var(--font-grey)' }}>
                    User Testing Phase 3 - {toolMaturity === 'advanced' ? 'Advanced' : 'Early'} Stage
                  </p>
                  <button
                    onClick={() => handleOpenForm('ut3')}
                    className="innovator-generate-button"
                    style={{ width: '100%', padding: '10px' }}
                    type="button"
                  >
                    Open UT3 Form
                  </button>
                </div>

                <div style={{ 
                  padding: '20px', 
                  border: '1px solid var(--border-colour)', 
                  borderRadius: 'var(--border-radius)',
                  background: 'var(--bg-grey)'
                }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>UT4 Form</h3>
                  <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: 'var(--font-grey)' }}>
                    User Testing Phase 4 - {toolMaturity === 'advanced' ? 'Advanced' : 'Early'} Stage
                  </p>
                  <button
                    onClick={() => handleOpenForm('ut4')}
                    className="innovator-generate-button"
                    style={{ width: '100%', padding: '10px' }}
                    type="button"
                  >
                    Open UT4 Form
                  </button>
                </div>
              </div>

              <div className="innovator-tip" style={{ marginTop: '20px' }}>
                <BsCheckCircle />
                <span>
                  Both forms are pre-filled with your Tool ID: <strong>{toolId}</strong>
                </span>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default UserTestingPage;