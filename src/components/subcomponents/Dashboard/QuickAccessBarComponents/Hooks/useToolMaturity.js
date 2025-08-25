import { useState, useCallback } from 'react';

export const useToolMaturity = (updateStatus) => {
  const [isCheckingMaturity, setIsCheckingMaturity] = useState(false);
  const [toolMaturity, setToolMaturity] = useState(null);
  const [showForms, setShowForms] = useState(false);

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

  const checkToolMaturity = useCallback(async (toolIdToCheck) => {
    setIsCheckingMaturity(true);
    updateStatus("Checking tool maturity...");

    try {
      const submissionsResponse = await fetch(`${BASE_URL}/assets/${MAIN_FORM_ID}/data/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
      });

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

      let foundMaturity = null;
      let matchingSubmission = null;

      for (let i = 0; i < submissionsData.results.length; i++) {
        const submission = submissionsData.results[i];
        
        const possibleToolIdFields = ['ID', 'tool_id', 'toolId', 'Tool_ID', 'TOOL_ID', 'toolid'];
        const toolIdMatch = possibleToolIdFields.some(field => {
          const fieldValue = submission[field];
          if (!fieldValue) return false;
          return fieldValue === toolIdToCheck || 
                 (typeof fieldValue === 'string' && fieldValue.toLowerCase() === toolIdToCheck.toLowerCase());
        });

        if (toolIdMatch) {
          matchingSubmission = submission;
          
          const possibleMaturityFields = [MATURITY_FIELD, 'tool_maturity', 'toolMaturity', 'Tool_Maturity', 'TOOL_MATURITY'];
          for (const field of possibleMaturityFields) {
            if (submission[field]) {
              foundMaturity = submission[field];
              break;
            }
          }
          break;
        }
      }

      if (matchingSubmission && foundMaturity) {
        const maturityString = String(foundMaturity).toLowerCase();
        const normalizedMaturity = maturityString.includes('advance') || 
                                  maturityString.includes('advanced') ? 'advanced' : 'early';
        
        setToolMaturity(normalizedMaturity);
        setShowForms(true);
        updateStatus(`Tool maturity found: ${foundMaturity}. Forms are now available.`);
      } else if (matchingSubmission && !foundMaturity) {
        updateStatus("Tool ID found but maturity information is missing. Please contact support.");
        setShowForms(false);
      } else {
        updateStatus("Tool ID not found. Please verify your Tool ID is correct.");
        setShowForms(false);
      }

    } catch (error) {
      console.error('Error checking tool maturity:', error);
      
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
  }, [updateStatus, API_TOKEN, BASE_URL, MAIN_FORM_ID, MATURITY_FIELD]);

  const openForm = useCallback((formType, toolId, maturity) => {
    if (!maturity || !toolId) return;

    const baseUrl = FORM_URLS[maturity][formType];
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
  }, [FORM_URLS, updateStatus]);

  return {
    isCheckingMaturity,
    toolMaturity,
    showForms,
    checkToolMaturity,
    openForm
  };
};