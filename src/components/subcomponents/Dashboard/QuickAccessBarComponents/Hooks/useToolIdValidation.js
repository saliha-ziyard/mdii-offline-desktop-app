import { useCallback } from 'react';

export const useToolIdValidation = (updateStatus) => {
  const API_TOKEN = "fc37a9329918014ef595b183adcef745a4beb217";
  const BASE_URL = "https://kf.kobotoolbox.org/api/v2";
  const MAIN_FORM_ID = "aJn2DsjpAeJjrB6VazHjtz";

  const validateToolId = useCallback(async (toolId) => {
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

      if (!submissionsResponse.ok) {
        throw new Error('Failed to verify Tool ID');
      }

      const submissionsData = await submissionsResponse.json();
      
      if (!submissionsData.results || !Array.isArray(submissionsData.results)) {
        throw new Error('No submissions found');
      }

      // Look for the tool ID in submissions
      const matchingSubmission = submissionsData.results.find(submission => {
        return submission['ID'] === toolId || 
               (typeof submission['ID'] === 'string' && submission['ID'].toLowerCase() === toolId.toLowerCase());
      });

      if (!matchingSubmission) {
        updateStatus("Error: Tool ID not found. Please verify your Tool ID is correct and has been submitted.");
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error validating tool ID:', error);
      updateStatus("Error: Unable to verify Tool ID. Please try again or contact support.");
      return false;
    }
  }, [updateStatus, API_TOKEN, BASE_URL, MAIN_FORM_ID]);

  return { validateToolId };
};