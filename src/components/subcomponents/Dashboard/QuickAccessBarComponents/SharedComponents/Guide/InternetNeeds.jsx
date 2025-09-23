import React from "react";
import { GoGlobe } from "react-icons/go";

const InternetNeeds = ({ setCurrentPage, setActiveSection, activeSection }) => {
  return (
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
        <p>
          <a href="https://support.kobotoolbox.org/data_through_webforms.html?highlight=offline">
            KoboToolbox Offline Documentation
          </a>
        </p>
      </div>
    </div>
  );
};

export default InternetNeeds;
